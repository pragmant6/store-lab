// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Store } from './pages/Store';

import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Purchases } from './pages/Purchases';
import { Profile } from './pages/Profile';

export default function App() {
	return (
		<Routes>
			{/* Rutas Públicas */}
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />

			{/* Rutas Privadas envueltas en el Layout */}
			<Route element={<MainLayout />}>
				<Route path='/' element={<Store />} />
				<Route path='/purchases' element={<Purchases />} />
				<Route path='/profile' element={<Profile />} />

				{/* Agrega aquí Profile o Settings si los creas */}
			</Route>
		</Routes>
	);
}
