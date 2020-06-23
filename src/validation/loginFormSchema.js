import * as Yup from 'yup'

const loginFormSchema = Yup.object().shape({
  username: Yup
    .string()
    .min(3, 'Your username is at least three characters long.')
    .required('Please enter your username.'),
  password: Yup
    .string()
    .required('Please enter your password.'),
})

export default loginFormSchema