import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
// import { yupResolver } from '@hookform/resolvers'
import * as Yup from 'yup'
import axios from 'axios'
import { StarRating } from './starRating'
import { yupResolver } from '@hookform/resolvers'


const reviewSchema = Yup.object().shape({
  title: Yup.string().required('Please provide a title'),
  dateVisited: Yup.string(),
  text: Yup.string().required('Please provide a review')
})

// Pass down whether it's a recArea or campground along with the ID in props, eg:
// <PostReview siteCollection={magic involving splitting up the current url path} siteId={SOME MAGIC TO FIND THE CURRENT ID} />
// const [, siteCollection, siteId] = useHistory().path.match(/\/api\/(\w+)\/(\w+)\//)

export const PostReview = ({ siteCollection, siteId }) => {
  const [rating, setRating] = useState()
  const history = useHistory()
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(reviewSchema),
    criteriaMode: 'all'
  })
  const sitePage = `/api/${siteCollection}/${siteId}/reviews`

  const onSubmit = values => {
    values.rating = rating
    console.log(values)
    axios.post(sitePage, values)
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
