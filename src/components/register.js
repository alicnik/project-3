import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import * as yup from 'yup'
import axios from 'axios'

const registerSchema = yup.object().shape({
  username: yup.string()
    .required('No username provided'),
  email: yup.string()
    .required('No email address provided'),
  password: yup.string()
    .string()
    .required('Please enter your password')
    .matches(
      /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,})\S$/,
      'Must Contain 8 Characters, one uppercase, one lowercase and one number'
    ),
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