import { useMyPurchases } from '../hooks/usePurchases';
import { ShoppingBag, Calendar, PackageCheck } from 'lucide-react';

export const Purchases = () => {
	const { data: purchases, isLoading } = useMyPurchases();

	return (
		<div className='max-w-4xl mx-auto space-y-8'>
			<header className='flex items-center gap-4'>
				<div className='p-4 bg-indigo-600 text-white rounded-3xl shadow-lg'>
					<ShoppingBag size={32} />
				</div>
				<div>
					<h2 className='text-3xl font-black text-slate-900 tracking-tight'>
						Mis Compras
					</h2>
					<p className='text-slate-400 text-sm font-medium'>
						Historial completo de tus transacciones locales.
					</p>
				</div>
			</header>

			<div className='bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm min-h-[400px]'>
				{isLoading ? (
					<div className='space-y-4'>
						{[1, 2, 3].map((i) => (
							<div
								key={i}
								className='h-24 bg-slate-50 rounded-3xl animate-pulse'
							/>
						))}
					</div>
				) : !purchases || purchases.length === 0 ? (
					<div className='flex flex-col items-center justify-center h-full py-20 text-slate-300'>
						<PackageCheck size={64} strokeWidth={1} className='mb-4' />
						<p className='font-bold italic'>
							Aún no has realizado ninguna compra.
						</p>
					</div>
				) : (
					<div className='space-y-4'>
						{purchases.map((purchase) => (
							<div
								key={purchase.id}
								className='flex flex-col md:flex-row items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-indigo-200 transition-all group'>
								<div className='flex items-center gap-5 w-full md:w-auto'>
									<div className='h-14 w-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform'>
										🛍️
									</div>
									<div>
										<h4 className='font-black text-slate-800 text-lg'>
											{purchase.product?.name || 'Producto Eliminado'}
										</h4>
										<div className='flex items-center gap-3 mt-1 text-slate-400'>
											<span className='flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider'>
												<Calendar size={12} />{' '}
												{new Date(purchase.date).toLocaleDateString()}
											</span>
											<span className='text-slate-200'>|</span>
											<span className='text-[10px] font-bold uppercase tracking-wider'>
												ID: {purchase.id.slice(0, 8)}
											</span>
										</div>
									</div>
								</div>

								<div className='flex items-center gap-6 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0'>
									<div className='text-right'>
										<p className='text-2xl font-black text-indigo-600 tracking-tighter'>
											${purchase.price.toFixed(2)}
										</p>
										<span className='text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-lg'>
											Completado
										</span>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};
