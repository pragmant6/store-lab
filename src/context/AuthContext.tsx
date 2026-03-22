import React, { createContext, useContext, useState, useEffect } from 'react';
import { UsersTable } from '../core/orm';
import type { User } from '../core/types';

interface AuthContextType {
	user: User | null;
	login: (username: string, pass: string) => void;
	logout: () => void;
	isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	// Al cargar la app, revisamos si hay un token en localStorage
	useEffect(() => {
		const token = localStorage.getItem('mike_shop_token');
		if (token) {
			try {
				// Decodificamos el "JWT" simulado
				const userData = JSON.parse(atob(token));
				setTimeout(() => setUser(userData), 0);
			} catch (e) {
				console.error('Token inválido, limpiando sesión', e);
				localStorage.removeItem('mike_shop_token');
			}
		}
		setTimeout(() => setLoading(false), 0);
	}, []);

	const login = (username: string, pass: string) => {
		const foundUser = UsersTable.find(
			(u) => u.username === username && u.password === pass
		);

		if (!foundUser) {
			throw new Error('Credenciales inválidas');
		}

		// Creamos un JWT simulado (Base64)
		const tokenData = { id: foundUser.id, username: foundUser.username };
		const fakeToken = btoa(JSON.stringify(tokenData));

		localStorage.setItem('mike_shop_token', fakeToken);
		setUser(tokenData);
	};

	const logout = () => {
		localStorage.removeItem('mike_shop_token');
		setUser(null);
	};

	if (loading) return null; // O un spinner de carga inicial

	return (
		<AuthContext.Provider
			value={{ user, login, logout, isAuthenticated: !!user }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
	return context;
};
