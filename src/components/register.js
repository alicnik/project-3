import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import * as Yup from 'yup'
import axios from 'axios'

const registerSchema = Yup.object().shape({
  username: Yup.string()
    .required('No username provided'),
  email: Yup.string()
    .required('No email address provided'),
  password: Yup.string()
    .string()
    .required('Please enter a password')
    .matches(
      /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,})\S$/,
      'Must Contain 8 Characters, one uppercase, one lowercase and one number'
    ),
<<<<<<< HEAD
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
})
=======
  passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
})

const Register = () => {
  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(registerSchema)
  })
  const onSubmit = values => console.log(values)
}

return <form onSubmit={handleSubmit(onSubmit)}>
  <input type="text" name="username" ref={register} />
</form>

export default Register
>>>>>>> development
