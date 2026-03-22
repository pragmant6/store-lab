import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Requerido'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Requerido'),
});

export const RegisterSchema = Yup.object().shape({
  username: Yup.string().min(3, 'Muy corto').required('Requerido'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Requerido'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'No coinciden')
    .required('Requerido'),
});

export const ProductSchema = Yup.object().shape({
  name: Yup.string().required('Nombre requerido'),
  price: Yup.number().positive('Debe ser positivo').required('Requerido'),
});