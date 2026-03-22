import { NavLink } from 'react-router-dom';
import {
	LayoutDashboard,
	ShoppingBag,
	User,
	//Settings,
	LogOut,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Sidebar = () => {
	const { logout } = useAuth();

	const menuItems = [
		{ name: 'Tienda', path: '/', icon: <LayoutDashboard size={20} /> },
		{
			name: 'Mis Compras',
			path: '/purchases',
			icon: <ShoppingBag size={20} />,
		},
		{ name: 'Perfil', path: '/profile', icon: <User size={20} /> },
		/*{ name: 'Ajustes', path: '/settings', icon: <Settings size={20} /> }*/
	];

	return (
		<aside className='w-72 bg-slate-900 text-slate-400 flex flex-col h-screen sticky top-0 border-r border-slate-800'>
			{/* Logo */}
			<div className='p-8 mb-4'>
				<h1 className='text-white text-2xl font-black tracking-tighter italic'>
					MIKE<span className='text-indigo-500'>.SHOP</span>
				</h1>
			</div>

			{/* Menú de Navegación */}
			<nav className='flex-1 px-4 space-y-2'>
				{menuItems.map((item) => (
					<NavLink
						key={item.path}
						to={item.path}
						className={({ isActive }) => `
              flex items-center gap-4 py-3.5 px-5 rounded-2xl transition-all duration-300 font-bold text-sm
              ${
								isActive
									? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 translate-x-1'
									: 'hover:bg-slate-800 hover:text-white'
							}
            `}>
						<span
							className={({ isActive }: any) =>
								isActive ? 'text-white' : 'text-slate-500'
							}>
							{item.icon}
						</span>
						{item.name}
					</NavLink>
				))}
			</nav>

			{/* Footer del Sidebar / Logout */}
			<div className='p-6 border-t border-slate-800'>
				<button
					onClick={logout}
					className='w-full flex items-center gap-4 py-4 px-5 rounded-2xl text-slate-400 font-bold text-sm hover:bg-rose-500/10 hover:text-rose-500 transition-all group'>
					<LogOut
						size={20}
						className='group-hover:-translate-x-1 transition-transform'
					/>
					Cerrar Sesión
				</button>
			</div>
		</aside>
	);
};
