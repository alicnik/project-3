import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
// import { yupResolver } from '@hookform/resolvers'
import * as Yup from 'yup'
import axios from 'axios'
import { StarRating } from './StarRating'
import { yupResolver } from '@hookform/resolvers'


const reviewSchema = Yup.object().shape({
  title: Yup.string().required('Please provide a title'),
  dateVisited: Yup.string(),
  text: Yup.string().required('Please provide a review')
})

// Pass down whether it's a recArea or campground along with the ID in props, eg:
// <PostReview siteCollection={magic involving splitting up the current url path} siteId={SOME MAGIC TO FIND THE CURRENT ID} />
// const [, siteCollection, siteId] = useHistory().path.match(/\/api\/(\w+)\/(\w+)\//)

export const PostReview = (props) => {
  const [rating, setRating] = useState(props.location.state?.rating)
  const { siteCollection, siteId } = props.location.state
  const history = useHistory()
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(reviewSchema),
    criteriaMode: 'all'
  })
  const sitePage = `/${siteCollection}/${siteId}`

  const onSubmit = values => {
    values.rating = rating
    const token = localStorage.getItem('token')
    axios.post(`/api${sitePage}/reviews`, values, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        history.push(sitePage)
      })
      .catch(err => console.log(err.response))
  }

  return <>
   <section id="post-review" >
     <form onSubmit={handleSubmit(onSubmit)}>
       <label htmlFor="title">Write a title</label><br></br>
       <input type="text" id="title" name="title" autoComplete="off" ref={register} />
       <p>{errors.title?.message}</p>
       <StarRating rating={rating} setRating={setRating} name='rating' />
       <label htmlFor="dateVisited">When did you visit?</label><br></br>
       <input name="dateVisited" type="date" ref={register}/>
       <label htmlFor="review">Write a review</label><br></br>
       <textarea name="text"ref={register}></textarea>
       <p>{errors.review?.message}</p>
       <button type="submit">Submit</button>
     </form>  </
     section >
  </>

}
