import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { shopService } from '../api/shopService';
import { useToast } from '../context/ToastContext';
import type { Product } from '../core/types';

export const useProducts = (search: string, category: string) => {
	return useQuery({
		queryKey: ['products', search, category],
		queryFn: () => shopService.getProducts(search, category),
	});
};

export const useUpdateProduct = () => {
	const queryClient = useQueryClient();
	const { addToast } = useToast();

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) =>
			shopService.updateProduct(id, data),
		onSuccess: () => {
			// Refresca la lista de productos automáticamente
			queryClient.invalidateQueries({ queryKey: ['products'] });
			addToast('Producto actualizado correctamente', 'success');
		},
		onError: () => addToast('Error al actualizar el producto', 'error'),
	});
};

export const useDeleteProduct = () => {
	const queryClient = useQueryClient();
	const { addToast } = useToast();

	return useMutation({
		mutationFn: (id: string) => shopService.deleteProduct(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products'] });
			addToast('Producto eliminado del inventario', 'success');
		},
		onError: () => addToast('No se pudo eliminar el producto', 'error'),
	});
};
