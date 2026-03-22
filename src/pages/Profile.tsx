import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { FormInput } from '../components/FormInput';
import { UsersTable } from '../core/orm';
import { User, Calendar, ShieldCheck, Save } from 'lucide-react';

const ProfileSchema = Yup.object().shape({
	username: Yup.string()
		.min(3, 'Mínimo 3 caracteres')
		.required('El nombre de usuario es obligatorio'),
});

export const Profile = () => {
	const { user, login } = useAuth(); // Usamos login para refrescar la sesión local
	const { addToast } = useToast();

	if (!user) return null;

	return (
		<div className='max-w-2xl mx-auto animate-fade-in'>
			{/* 1. Header del Perfil */}
			<div className='bg-slate-900 rounded-[2.5rem] p-10 text-white mb-8 relative overflow-hidden shadow-2xl shadow-indigo-100'>
				<div className='absolute top-0 right-0 p-8 opacity-10'>
					<User size={120} strokeWidth={1} />
				</div>

				<div className='flex items-center gap-6 relative z-10'>
					<div className='h-24 w-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl font-black shadow-inner'>
						{user.username.charAt(0).toUpperCase()}
					</div>
					<div>
						<h2 className='text-3xl font-black tracking-tight'>
							{user.username}
						</h2>
						<p className='text-indigo-300 font-bold text-xs uppercase tracking-widest mt-1'>
							Usuario Verificado
						</p>
					</div>
				</div>
			</div>

			{/* 2. Información y Edición */}
			<div className='bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm space-y-10'>
				<section>
					<h3 className='text-xl font-black text-slate-900 mb-6 flex items-center gap-2'>
						<ShieldCheck className='text-indigo-600' size={24} />
						Datos de la Cuenta
					</h3>

					<Formik
						initialValues={{ username: user.username }}
						validationSchema={ProfileSchema}
						onSubmit={(values, { setSubmitting }) => {
							// Validar si el nombre ya existe (y no es el actual)
							const exists = UsersTable.find(
								(u) => u.username === values.username && u.id !== user.id
							);

							if (exists) {
								addToast('Este nombre de usuario ya está en uso', 'error');
								setSubmitting(false);
								return;
							}

							// Actualizar en el ORM
							UsersTable.update(user.id, { username: values.username });

							// Actualizar la sesión (simulado recreando el token)
							const newTokenData = { id: user.id, username: values.username };
							localStorage.setItem(
								'mike_shop_token',
								btoa(JSON.stringify(newTokenData))
							);

							// Forzamos recarga sutil o actualizamos estado (depende de tu AuthProvider)
							window.location.reload(); // Forma rápida de refrescar todo el Context
							addToast('Perfil actualizado correctamente', 'success');
						}}>
						{({ isSubmitting, dirty }) => (
							<Form className='space-y-6'>
								<FormInput
									label='Nombre de Usuario'
									name='username'
									icon={<User size={18} />}
								/>

								<div className='p-4 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-100'>
									<div className='flex items-center gap-3'>
										<Calendar size={18} className='text-slate-400' />
										<span className='text-xs font-bold text-slate-500 uppercase tracking-wider'>
											Miembro desde
										</span>
									</div>
									<span className='text-sm font-black text-slate-900 italic'>
										Marzo 2026
									</span>
								</div>

								<button
									type='submit'
									disabled={!dirty || isSubmitting}
									className={`w-full py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all
                    ${
											!dirty || isSubmitting
												? 'bg-slate-100 text-slate-400 cursor-not-allowed'
												: 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-95'
										}`}>
									<Save size={18} />
									{isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
								</button>
							</Form>
						)}
					</Formik>
				</section>

				<hr className='border-slate-50' />

				<section className='bg-rose-50 p-6 rounded-3xl border border-rose-100'>
					<h4 className='text-rose-600 font-black text-sm uppercase tracking-widest mb-2'>
						Zona de Peligro
					</h4>
					<p className='text-rose-400 text-xs font-medium mb-4'>
						Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, ten
						seguridad.
					</p>
					<button className='text-rose-600 text-xs font-black hover:underline'>
						Eliminar mi cuenta permanentemente
					</button>
				</section>
			</div>
		</div>
	);
};
