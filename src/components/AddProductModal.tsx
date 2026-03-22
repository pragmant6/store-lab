import { Formik, Form } from 'formik';
import { ProductSchema } from '../core/validation';
import { FormInput } from './FormInput';
import { Tag, DollarSign, Layers, X, PlusCircle } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProductsDB } from '../core/orm';
import { useToast } from '../context/ToastContext';

interface Props {
	onClose: () => void;
}

export const AddProductModal = ({ onClose }: Props) => {
	const queryClient = useQueryClient();
	const { addToast } = useToast();

	const mutation = useMutation({
		mutationFn: async (values: any) => {
			// Simulamos latencia de red
			await new Promise((r) => setTimeout(r, 600));
			return ProductsDB.create({
				id: crypto.randomUUID(),
				...values,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products'] });
			addToast('¡Producto añadido al catálogo!', 'success');
			onClose();
		},
	});

	return (
		<div className='fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
			<div className='bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl relative animate-fade-in-up'>
				<button
					onClick={onClose}
					className='absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors'>
					<X size={24} />
				</button>

				<div className='mb-8'>
					<div className='h-12 w-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4'>
						<PlusCircle size={28} />
					</div>
					<h3 className='text-2xl font-black text-slate-900 tracking-tight italic'>
						Nuevo Producto
					</h3>
					<p className='text-slate-400 text-sm font-medium'>
						Llena los datos para el inventario.
					</p>
				</div>

				<Formik
					initialValues={{ name: '', price: '', category: 'Laptops' }}
					validationSchema={ProductSchema}
					onSubmit={(values) => mutation.mutate(values)}>
					{({ isSubmitting }) => (
						<Form className='space-y-5'>
							<FormInput
								label='Nombre del Producto'
								name='name'
								placeholder='Ej. Sony Headphones'
								icon={<Tag size={18} />}
							/>

							<FormInput
								label='Precio ($)'
								name='price'
								type='number'
								placeholder='0.00'
								icon={<DollarSign size={18} />}
							/>

							<div className='flex flex-col gap-1.5'>
								<label className='text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1'>
									Categoría
								</label>
								<div className='relative'>
									<div className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'>
										<Layers size={18} />
									</div>
									<select
										name='category'
										className='w-full py-3.5 pl-12 pr-5 rounded-2xl border-2 border-transparent bg-slate-50 focus:border-indigo-500 outline-none appearance-none text-sm font-medium'>
										<option value='Laptops'>Laptops</option>
										<option value='Phones'>Phones</option>
										<option value='Audio'>Audio</option>
										<option value='Accessories'>Accessories</option>
									</select>
								</div>
							</div>

							<button
								type='submit'
								disabled={isSubmitting}
								className='w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 disabled:bg-slate-300 transition-all mt-4'>
								{isSubmitting ? 'Guardando...' : 'Crear Producto'}
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};
