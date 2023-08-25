import * as yup from 'yup';

export const userSignUpSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .required('First name is required')
    .test('is-not-empty', 'First name cannot be empty', (value) => {
      return value.trim().length > 0;
    }),
  lastName: yup
    .string()
    .trim()
    .required('Last name is required')
    .test('is-not-empty', 'Last name cannot be empty', (value) => {
      return value.trim().length > 0;
    }),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(12, 'Password must not exceed 12 characters')
    .required('Password is required')
    .test('is-not-empty', 'Password cannot be empty', (value) => {
      return value.trim().length > 0;
    }),
  confirmPassword: yup
    .string()
    .min(8, 'Confirm password must be at least 8 characters')
    .max(12, 'Confirm password must not exceed 12 characters')
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

export const hostSignUpSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .required('First name is required')
    .test('is-not-empty', 'First name cannot be empty', (value) => {
      return value.trim().length > 0;
    }),
  lastName: yup
    .string()
    .trim()
    .required('Last name is required')
    .test('is-not-empty', 'Last name cannot be empty', (value) => {
      return value.trim().length > 0;
    }),
  email: yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: yup.string().min(10, 'Phone number must be 10 digits').max(10, 'Phone number must be 10 digits'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(12, 'Password must not exceed 12 characters')
    .required('Password is required')
    .test('is-not-empty', 'Password cannot be empty', (value) => {
      return value.trim().length > 0;
    }),
  confirmPassword: yup
    .string()
    .min(8, 'Confirm password must be at least 8 characters')
    .max(12, 'Confirm password must not exceed 12 characters')
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});
