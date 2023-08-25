import * as yup from 'yup';

export const validateAddress = yup.object().shape({
  country: yup.string().required('Country is required'),
  houseNumber: yup.string().required('House number is required'),
  area: yup.string(),
  streetAddress: yup.string().required('Street address is required'),
  landMark: yup.string(),
  city: yup.string().required('City is required'),
  region: yup.string().required('State is required'),
  // postCode: yup.string().numeber().required('Post code is required'),
});
