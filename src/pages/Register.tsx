import { Formik, Form } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { UsersTable } from '../core/orm';
import { useToast } from '../context/ToastContext';
import { RegisterSchema } from '../core/validation';
import { FormInput } from '../components/FormInput';
import { User, Lock, UserPlus, ArrowLeft } from 'lucide-react';

export const Register = () => {
	const { addToast } = useToast();
	const navigate = useNavigate();

	return (
		<div className='min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden'>
			{/* Decoración de fondo suave */}
			<div className='absolute top-[-5%] right-[-5%] w-[30%] h-[30%] bg-indigo-100 rounded-full blur-[100px]' />
			<div className='absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-blue-100 rounded-full blur-[100px]' />

			<Formik
				initialValues={{ username: '', password: '', confirmPassword: '' }}
				validationSchema={RegisterSchema}
				onSubmit={(values, { setSubmitting }) => {
					// 1. Verificar si el usuario ya existe en el ORM
					const exists = UsersTable.find((u) => u.username === values.username);

					if (exists) {
						addToast('Ese nombre de usuario ya está ocupado', 'error');
						setSubmitting(false);
						return;
					}

					// 2. Crear el nuevo usuario en LocalStorage
					UsersTable.create({
						id: crypto.randomUUID(),
						username: values.username,
						password: values.password, // En un entorno real, aquí se usaría un hash
						createdAt: new Date().toISOString(),
					});

					addToast('¡Cuenta creada! Ahora puedes iniciar sesión', 'success');

					// 3. Redirigir al login después de 1.5 segundos
					setTimeout(() => {
						navigate('/login');
					}, 1500);
				}}>
				{({ isSubmitting }) => (
					<Form className='w-full max-w-md bg-white rounded-[3rem] p-10 md:p-12 shadow-2xl border border-white/50 relative z-10 animate-fade-in-up'>
						{/* Botón Volver */}
						<Link
							to='/login'
							className='inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 text-xs font-bold mb-8 transition-colors group'>
							<ArrowLeft
								size={14}
								className='group-hover:-translate-x-1 transition-transform'
							/>
							VOLVER AL LOGIN
						</Link>

						<div className='mb-10'>
							<div className='h-16 w-16 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mb-6 shadow-inner'>
								<UserPlus size={32} strokeWidth={2.5} />
							</div>
							<h2 className='text-3xl font-black text-slate-900 tracking-tighter'>
								Crea tu cuenta
							</h2>
							<p className='text-slate-400 text-sm font-medium mt-1'>
								Únete a la comunidad de{' '}
								<span className='text-indigo-600 font-bold italic text-base'>
									Mike.Shop
								</span>
							</p>
						</div>

						<div className='space-y-5'>
							<FormInput
								label='Nombre de Usuario'
								name='username'
								placeholder='Ej. mike_angel'
								icon={<User size={18} />}
							/>

							<FormInput
								label='Contraseña'
								name='password'
								type='password'
								placeholder='Mínimo 6 caracteres'
								icon={<Lock size={18} />}
							/>

							<FormInput
								label='Confirmar Contraseña'
								name='confirmPassword'
								type='password'
								placeholder='Repite tu contraseña'
								icon={<Lock size={18} />}
							/>

							<button
								type='submit'
								disabled={isSubmitting}
								className={`
                  w-full py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 mt-4
                  ${
										isSubmitting
											? 'opacity-70 cursor-not-allowed'
											: 'hover:bg-indigo-600 active:scale-[0.97] hover:shadow-indigo-200'
									}
                `}>
								{isSubmitting ? 'REGISTRANDO...' : 'REGISTRARME AHORA'}
							</button>
						</div>

						<div className='mt-10 pt-8 border-t border-slate-50 text-center'>
							<p className='text-sm text-slate-400 font-medium'>
								¿Ya tienes una cuenta? <br />
								<Link
									to='/login'
									className='text-indigo-600 font-black hover:underline underline-offset-4'>
									Inicia sesión aquí
								</Link>
							</p>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};
