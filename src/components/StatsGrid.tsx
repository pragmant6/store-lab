import { CreditCard, Package, TrendingUp } from 'lucide-react';
import { useMyPurchases } from '../hooks/usePurchases';

export const StatsGrid = () => {
	const { data: purchases, isLoading } = useMyPurchases();

	const total = purchases?.reduce((acc, curr) => acc + curr.price, 0) || 0;
	const count = purchases?.length || 0;

	if (isLoading)
		return (
			<div className='grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse'>
				{[1, 2, 3].map((i) => (
					<div key={i} className='h-32 bg-slate-200 rounded-[2rem]' />
				))}
			</div>
		);

	return (
		<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
			<div className='bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-200 flex items-center justify-between'>
				<div>
					<p className='text-indigo-200 text-[10px] font-black uppercase tracking-widest mb-1'>
						Gasto Total
					</p>
					<h3 className='text-4xl font-black tracking-tighter'>
						${total.toFixed(2)}
					</h3>
				</div>
				<CreditCard size={32} className='opacity-40' />
			</div>

			<div className='bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex items-center justify-between'>
				<div>
					<p className='text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1'>
						Pedidos
					</p>
					<h3 className='text-4xl font-black text-slate-900 tracking-tighter'>
						{count}
					</h3>
				</div>
				<Package size={32} className='text-indigo-100' />
			</div>

			<div className='bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex items-center justify-between'>
				<div>
					<p className='text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1'>
						Promedio
					</p>
					<h3 className='text-4xl font-black text-slate-900 tracking-tighter'>
						${count > 0 ? (total / count).toFixed(2) : '0.00'}
					</h3>
				</div>
				<TrendingUp size={32} className='text-emerald-100' />
			</div>
		</div>
	);
};
