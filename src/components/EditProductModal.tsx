import { Formik, Form } from 'formik';
import { ProductSchema } from '../core/validation';
import { FormInput } from './FormInput';
import { Tag, DollarSign, X } from 'lucide-react';
import type { Product } from '../core/types';

interface Props {
	product: Product;
	onClose: () => void;
	onSubmit: (values: Partial<Product>) => void;
}

export const EditProductModal = ({ product, onClose, onSubmit }: Props) => {
	return (
		<div className='fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
			<div className='bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl relative'>
				<button
					onClick={onClose}
					className='absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors'>
					<X size={24} />
				</button>

				<h3 className='text-2xl font-black text-slate-900 mb-8 tracking-tight italic'>
					Editar Producto
				</h3>

				<Formik
					initialValues={{ name: product.name, price: product.price }}
					validationSchema={ProductSchema}
					onSubmit={(values) => onSubmit(values)}>
					{({ isSubmitting }) => (
						<Form className='space-y-5'>
							<FormInput label='Nombre' name='name' icon={<Tag size={18} />} />
							<FormInput
								label='Precio'
								name='price'
								type='number'
								icon={<DollarSign size={18} />}
							/>

							<div className='flex gap-3 pt-4'>
								<button
									type='submit'
									disabled={isSubmitting}
									className='flex-1 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 disabled:bg-slate-300 transition-all'>
									{isSubmitting ? 'Guardando...' : 'Actualizar Producto'}
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};
