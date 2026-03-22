import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

export const MainLayout = () => {
	const { isAuthenticated } = useAuth();

	// Guardián de ruta integrado: si no hay sesión, rebota al login
	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	return (
		<div className='flex h-screen bg-slate-50 font-sans antialiased overflow-hidden'>
			{/* 1. Sidebar: Fijo a la izquierda */}
			<Sidebar />

			{/* 2. Contenedor de Contenido: Flex col para Navbar + Main */}
			<div className='flex-1 flex flex-col min-w-0'>
				{/* Navbar: Pegado arriba con efecto Blur */}
				<Navbar />

				{/* 3. Área de scroll principal */}
				<main className='flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-10 custom-scrollbar'>
					<div className='max-w-7xl mx-auto animate-fade-in'>
						{/* Aquí es donde React Router inyectará Store, Purchases, etc. */}
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	);
};
