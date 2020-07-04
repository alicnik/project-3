import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import * as Yup from 'yup'
import axios from 'axios'

const commentSchema = Yup.object().shape({
  comment: Yup.string()
    .required('*This field is required')
})

export const PostComment = ({ reviewId, previousPage }) => {
  const history = useHistory()
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(commentSchema)
  })
  const onSubmit = values => {
    axios.post(`/api/reviews/${reviewId}/comments`, values)
      .then(() => {
        history.push('/review/id')
      })
      .catch(err => console.log(err))
  }

  return <div className="post-comment">
    <h4>Add comment</h4>
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="comment"></label><br></br>
      <textarea ref={register} />
      <p>{errors.comment?.message}</p>

      <button type="submit">Submit</button>
      {/* Change this cancel button link later using previous page*/}
      <Link to={`/${previousPage}`} ><button>Cancel</button></Link>
    </form>
  </div>
}