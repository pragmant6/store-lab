import type { Product } from '../core/types';
import { Edit3, Trash2, ShoppingCart } from 'lucide-react';

interface Props {
	product: Product;
	onEdit: (p: Product) => void;
	onDelete: (id: string) => void;
	onBuy: (p: Product) => void;
	isBuying?: boolean;
}

export const ProductCard = ({
	product,
	onEdit,
	onDelete,
	onBuy,
	isBuying,
}: Props) => {
	return (
		<div className='bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group'>
			<div className='aspect-square w-full bg-slate-50 rounded-3xl mb-5 flex items-center justify-center text-4xl group-hover:bg-indigo-50 transition-colors'>
				📦
			</div>

			<h3 className='font-bold text-slate-900 text-lg leading-tight mb-1'>
				{product.name}
			</h3>
			<p className='text-[10px] text-slate-400 font-black uppercase tracking-widest mb-4'>
				{product.category}
			</p>

			<div className='mt-auto pt-4 border-t border-slate-50 flex items-center justify-between'>
				<p className='text-2xl font-black text-indigo-600 tracking-tighter'>
					${product.price.toFixed(2)}
				</p>

				<div className='flex gap-2'>
					<button
						onClick={() => onEdit(product)}
						className='p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all'>
						<Edit3 size={18} />
					</button>
					<button
						onClick={() => onDelete(product.id)}
						className='p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all'>
						<Trash2 size={18} />
					</button>
				</div>
			</div>

			<button
				disabled={isBuying}
				onClick={() => onBuy(product)}
				className='w-full mt-4 bg-slate-900 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-600 disabled:bg-slate-200 transition-all active:scale-95 shadow-lg shadow-slate-200'>
				<ShoppingCart size={18} />
				{isBuying ? 'Procesando...' : 'Comprar Ahora'}
			</button>
		</div>
	);
};
