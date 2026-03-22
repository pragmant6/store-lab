import { Formik, Form } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { LoginSchema } from '../core/validation';
import { FormInput } from '../components/FormInput';
import { User, Lock, ArrowRight } from 'lucide-react';

export const Login = () => {
	const { login } = useAuth();
	const { addToast } = useToast();
	const navigate = useNavigate();

	return (
		<div className='min-h-screen bg-slate-950 flex items-center justify-center p-6 overflow-hidden relative'>
			{/* Círculos decorativos de fondo */}
			<div className='absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]' />
			<div className='absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]' />

			<Formik
				initialValues={{ username: '', password: '' }}
				validationSchema={LoginSchema}
				onSubmit={(values) => {
					try {
						login(values.username, values.password);
						addToast('¡Bienvenido Mike!', 'success');
						navigate('/');
					} catch (err: any) {
						addToast(err.message, 'error');
					}
				}}>
				<Form className='w-full max-w-md bg-white rounded-[3rem] p-12 shadow-2xl relative z-10'>
					<div className='text-center mb-10'>
						<h1 className='text-4xl font-black text-slate-900 tracking-tighter mb-2 italic'>
							MIKE<span className='text-indigo-600'>.SHOP</span>
						</h1>
						<p className='text-slate-400 font-medium'>
							Ingresa tus credenciales locales
						</p>
					</div>

					<div className='space-y-5'>
						<FormInput
							label='Usuario'
							name='username'
							placeholder='Ingresa tu usuario'
							icon={<User size={18} />}
						/>
						<FormInput
							label='Contraseña'
							name='password'
							type='password'
							placeholder='••••••••'
							icon={<Lock size={18} />}
						/>

						<button
							type='submit'
							className='w-full py-4 bg-slate-900 hover:bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 transition-all flex items-center justify-center gap-2 group'>
							Iniciar Sesión
							<ArrowRight
								size={18}
								className='group-hover:translate-x-1 transition-transform'
							/>
						</button>
					</div>

					<div className='mt-8 text-center'>
						<p className='text-sm text-slate-500 font-medium'>
							¿No tienes cuenta?{' '}
							<Link
								to='/register'
								className='text-indigo-600 font-bold hover:underline'>
								Regístrate gratis
							</Link>
						</p>
					</div>
				</Form>
			</Formik>
		</div>
	);
};
