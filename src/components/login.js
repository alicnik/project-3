import React from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import * as Yup from 'yup'
import axios from 'axios'

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required('No username provided'),
  password: Yup.string()
    .required('Please enter a password')
    .matches(
      /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,})\S$/,
      'Must Contain 8 Characters, one uppercase, one lowercase and one number'
    )
})

export const Login = () => {
  const history = useHistory()
  console.log(history)
  const { login, handleSubmit, errors, setError } = useForm({
    resolver: yupResolver(loginSchema)
  })
  const onSubmit = values => {
    axios.post('/api/login', values)
      .then(() => {
        console.log(values)
        history.push('/home')
      })
      .catch(err => {
        const errorMessages = {
          username: 'Username not found. Please register',
          password: 'Incorrect password'
        }
        Object.keys(err.response.data.errors).forEach(errorField => {
          setError(errorField, { message: `${errorMessages[errorField]}` })
        })
      })
  }

  return <div className="login">
    <h2>Enter the Wilderness</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="username">Enter username</label><br></br>
      <input id="username" type="text" name="username" autoComplete="off" ref={login} />
      <p>{errors.username?.message}</p>
      <label htmlFor="password">Enter your password</label><br></br>
      <input id="password" type="password" name="password" autoComplete="off" ref={login} />
      <p>{errors.password?.message}</p>

      <button type="submit">Submit</button>
    </form>

  </div>


}
