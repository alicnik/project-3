import React from 'react'
import { useHistory, Link } from 'react-router-dom'
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
    .required('Please enter a password')
    .matches(
      /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,})\S$/,
      'Must Contain 8 Characters, one uppercase, one lowercase and one number'
    ),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  firstName: Yup.string()
    .required('Please enter your first name'),
  lastName: Yup.string()
    .required('Please enter your last name')
})

export const Register = () => {
  const history = useHistory()
  const { register, handleSubmit, errors, setError } = useForm({
    resolver: yupResolver(registerSchema),
    criteriaMode: 'all'
  })
  const onSubmit = values => {
    axios.post('/api/register', values)
      .then(() => {
        history.push('/login')
      })
      .catch(err => {
        const errorMessages = {
          username: 'Someone in the wild already has that username, please pick another.',
          email: 'That email is already registered. Please log in.'
        }
        Object.keys(err.response.data.errors).forEach(errorField => {
          setError(errorField, { message: `${errorMessages[errorField]}` })
        })
      })
  }


  return <section id="register">
    <h2>Join the Wilderness</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="username">Choose a username</label><br></br>
      <input id="username" type="text" name="username" autoComplete="off" ref={register} />
      <p>{errors.username?.message}</p>
      <label htmlFor="email">Enter your email address</label><br></br>
      <input id="email" type="email" name="email" autoComplete="off" ref={register} />
      <p>{errors.email?.message}</p>
      <label htmlFor="firstName">Enter your first name</label><br></br>
      <input id="firstName" type="text" name="firstName" autoComplete="off" ref={register} />
      <p>{errors.firstName?.message}</p>
      <label htmlFor="lastName">Enter your last name</label><br></br>
      <input id="lastName" type="text" name="lastName" autoComplete="off" ref={register} />
      <p>{errors.lastName?.message}</p>
      <label htmlFor="password">Choose a password</label><br></br>
      <input id="password" type="password" name="password" autoComplete="off" ref={register} />
      <p>{errors.password?.message}</p>
      <label htmlFor="passswordConfirmation">Confirm your password</label><br></br>
      <input id="passwordConfirmation" type="password" name="passwordConfirmation" autoComplete="off" ref={register} />
      <p>{errors.passwordConfirmation?.message}</p>

      <button type="submit">Submit</button>
    </form>

    <Link to='/login'>Already got an account? Login here.</Link>

  </section>


}
