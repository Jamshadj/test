import * as yup from 'yup';

export const logInSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(12, 'Password must not exceed 12 characters')
    .required('Password is required')
    .test('is-not-empty', 'Password cannot be empty', (value) => {
      return value.trim().length > 0;
    })
});
