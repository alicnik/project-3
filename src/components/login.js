import React from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import * as Yup from 'yup'
import axios from 'axios'

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required('No username provided')
  // password: Yup.string()
  //   .required('Please enter a password')
  //   .matches(
  //     /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,})\S$/,
  //     'Must Contain 8 Characters, one uppercase, one lowercase and one number'
  //   )
})

export const Login = () => {
  const history = useHistory()
  const { register, handleSubmit, errors, setError } = useForm({
    resolver: yupResolver(loginSchema),
    criteriaMode: 'all'
  })

  const onSubmit = values => {
    console.log('line 26', values)
    axios.post('/api/login', values)
      .then(() => {
        console.log('line 30')
        history.push('/home')
      })
      .catch(err => {
        const errorMessages = {
          username: 'Username not found. Please register',
          password: 'Incorrect password'
        }
        Object.keys(err.response.data).forEach(errorField => {
          setError(errorField, { message: `${errorMessages[errorField]}` })
        })
      })
  }

  return <div className="login">
    <h2>Enter the Wilderness</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="username">Enter username</label><br></br>
      <input id="username" type="text" name="username" autoComplete="off" ref={register} />
      <p>{errors.username?.message}</p>
      <label htmlFor="password">Enter your password</label><br></br>
      <input id="password" type="password" name="password" autoComplete="off" ref={register} />
      <p>{errors.password?.message}</p>

      <button type="submit">Submit</button>
    </form>

  </div>


}
