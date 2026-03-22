import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { shopService } from '../api/shopService';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

export const useMyPurchases = () => {
	const { user } = useAuth();

	return useQuery({
		queryKey: ['purchases', user?.id],
		queryFn: () => shopService.getMyPurchases(user!.id),
		enabled: !!user?.id, // Solo ejecuta si hay un usuario logueado
	});
};

export const useAddPurchase = () => {
	const queryClient = useQueryClient();
	const { addToast } = useToast();
	const { user } = useAuth();

	return useMutation({
		mutationFn: ({ productId, price }: { productId: string; price: number }) =>
			shopService.createPurchase(user!.id, productId, price),
		onSuccess: () => {
			// Invalida compras para actualizar el historial y el contador del Navbar
			queryClient.invalidateQueries({ queryKey: ['purchases', user?.id] });
			addToast('¡Compra exitosa! Añadido a tu historial', 'success');
		},
		onError: () => addToast('Hubo un problema con la transacción', 'error'),
	});
};
