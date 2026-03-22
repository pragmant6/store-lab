import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom'; // Cambiamos BrowserRouter por HashRouter
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import App from './App';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ToastProvider>
				<HashRouter>
					<AuthProvider>
						<App />
					</AuthProvider>
				</HashRouter>
			</ToastProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
