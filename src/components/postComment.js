import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import * as Yup from 'yup'
import axios from 'axios'

const commentSchema = Yup.object().shape({
  text: Yup.string()
    .required('*This field is required')
})

export const PostComment = (props) => {
  const history = useHistory()
  const { reviewId, previousPage } = props.location.state
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(commentSchema)
  })
  const onSubmit = values => {
    const token = localStorage.getItem('token')
    axios.post(`/api/reviews/${reviewId}/comments`, values, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        history.push(previousPage)
      })
      .catch(err => console.log(err))
  }

  return <div className="post-comment">
    <h4>Add comment</h4>
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="text"></label><br></br>
      <textarea name='text' ref={register} />
      <p>{errors.comment?.message}</p>

      <button type="submit">Submit</button>
      {/* Change this cancel button link later using previous page*/}
      <Link to={`/${previousPage}`} ><button>Cancel</button></Link>
    </form>
  </div>
}