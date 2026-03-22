import { Search, Bell, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMyPurchases } from '../hooks/usePurchases';

export const Navbar = () => {
	const { user } = useAuth();
	const { data: purchases } = useMyPurchases();
	const cartCount = purchases?.length || 0;

	return (
		<header className='h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-10 flex items-center justify-between sticky top-0 z-40'>
			{/* Buscador Estilizado */}
			<div className='relative w-96 group'>
				<Search
					className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors'
					size={18}
				/>
				<input
					type='text'
					placeholder='Buscar productos, órdenes...'
					className='w-full bg-slate-50 border-none rounded-2xl py-2.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none'
				/>
			</div>

			{/* Acciones de Usuario */}
			<div className='flex items-center gap-6'>
				{/* Carrito / Compras */}
				<div className='relative cursor-pointer hover:scale-110 transition-transform'>
					<div className='p-2.5 bg-slate-50 rounded-xl text-slate-600'>
						<ShoppingCart size={20} />
					</div>
					{cartCount > 0 && (
						<span className='absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center border-2 border-white animate-bounce-in'>
							{cartCount}
						</span>
					)}
				</div>

				{/* Notificaciones */}
				<div className='p-2.5 bg-slate-50 rounded-xl text-slate-600 cursor-pointer hover:bg-indigo-50 hover:text-indigo-600 transition-colors'>
					<Bell size={20} />
				</div>

				{/* Separador */}
				<div className='h-8 w-px bg-slate-200 mx-2'></div>

				{/* Info de Perfil */}
				<div className='flex items-center gap-4 cursor-pointer group'>
					<div className='text-right'>
						<p className='text-sm font-black text-slate-900 leading-none group-hover:text-indigo-600 transition-colors'>
							{user?.username || 'Invitado'}
						</p>
						<p className='text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1'>
							Desarrollador
						</p>
					</div>
					<div className='h-10 w-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-200'>
						{user?.username?.charAt(0).toUpperCase() || 'U'}
					</div>
				</div>
			</div>
		</header>
	);
};
