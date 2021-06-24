import React, { useEffect, useState } from 'react';
import ReviewForm from './ReviewForm';
import ReviewTile from './ReviewTile';


const FilmShow = props => {
  const [film, setFilm] = useState({
    reviews: []
  })
  const [showForm, setShowForm] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [successfulReviewPosted, setSuccessfulReviewPosted] = useState(false)
  const [newReview, setNewReview] = useState()

  const id = props.match.params.id

  const fetchFilm = async () => {
    try {
      const response = await fetch(`/api/v1/films/${id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw (error)
      }
      const filmData = await response.json()
      setFilm(filmData.film)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    fetchFilm()
  }, [])

  const addReview = async (reviewPayload) => {
    try {
      const response = await fetch(`/api/v1/films/${id}/add-review`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(reviewPayload)
      })
      debugger
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          return setFormErrors(body.errors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw (error)
        }
      }
      setSuccessfulReviewPosted(true)
      setNewReview(reviewPayload)
      setShowForm(false)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const handleReviewButtonClick = event => {
    event.preventDefault()
    setShowForm(true)
  }

  let newReviewForm
  if (showForm) {
    newReviewForm = <ReviewForm
      errors={formErrors}
      postNewReview={addReview}
    />
  }

  let successMessageTag;
  if (successfulReviewPosted) {
    successMessageTag = <p><strong>Thank you for your review.</strong></p>

  }

  let reviewsList = film.reviews.map(review => {
    return (
      <ReviewTile
        key={review.id}
        review={review}
      />
    )
  })

  let newReviewTile
  if (newReview) {
    newReviewTile = <ReviewTile review={newReview} />
  }

  return (
    <div>
      <h1>{film.title} - {film.year}</h1>
      <img src={film.imgUrl} />
      <p>{film.description}</p>
      <button type="button" className="button" onClick={handleReviewButtonClick}>Add Review!</button>
      {successMessageTag}
      {newReviewForm}
      {newReviewTile}
      {reviewsList}
    </div>
  )
}

export default FilmShow;