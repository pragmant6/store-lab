import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

type ToastType = 'success' | 'error';

interface Toast {
	id: string;
	message: string;
	type: ToastType;
}

interface ToastContextType {
	addToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const addToast = useCallback(
		(message: string, type: ToastType = 'success') => {
			const id = crypto.randomUUID();
			setToasts((prev) => [...prev, { id, message, type }]);

			// Auto-eliminar después de 3.5 segundos
			setTimeout(() => {
				setToasts((prev) => prev.filter((t) => t.id !== id));
			}, 3500);
		},
		[]
	);

	const removeToast = (id: string) => {
		setToasts((prev) => prev.filter((t) => t.id !== id));
	};

	return (
		<ToastContext.Provider value={{ addToast }}>
			{children}

			{/* Contenedor Flotante */}
			<div className='fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none'>
				{toasts.map((toast) => (
					<div
						key={toast.id}
						className={`
              pointer-events-auto flex items-center gap-3 px-6 py-4 rounded-[1.5rem] shadow-2xl border text-white font-bold
              animate-fade-in-up transition-all min-w-[300px]
              ${
								toast.type === 'success'
									? 'bg-emerald-600 border-emerald-400'
									: 'bg-rose-600 border-rose-400'
							}
            `}>
						{toast.type === 'success' ? (
							<CheckCircle size={20} />
						) : (
							<AlertCircle size={20} />
						)}
						<span className='flex-1 text-sm'>{toast.message}</span>
						<button
							onClick={() => removeToast(toast.id)}
							className='opacity-70 hover:opacity-100'>
							<X size={16} />
						</button>
					</div>
				))}
			</div>
		</ToastContext.Provider>
	);
};

export const useToast = () => {
	const context = useContext(ToastContext);
	if (!context) throw new Error('useToast debe usarse dentro de ToastProvider');
	return context;
};
