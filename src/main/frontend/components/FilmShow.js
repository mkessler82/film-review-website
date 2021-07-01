import React, { useEffect, useState } from 'react';
import ReviewForm from './ReviewForm';
import ReviewTile from './ReviewTile';
import { Redirect } from "react-router-dom";

const FilmShow = props => {
  const [film, setFilm] = useState({
    reviews: []
  })
  const [showForm, setShowForm] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [successfulReviewPosted, setSuccessfulReviewPosted] = useState(false)
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [newReview, setNewReview] = useState(null)

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
      setSuccessfulReviewPosted(false)
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
      const jsonReview = await response.json()
      setNewReview(jsonReview)
      setSuccessfulReviewPosted(true)
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

  let submitButton
  if (!successfulReviewPosted) {
    submitButton = <button type="button" className="button" onClick={handleReviewButtonClick}>Add Review!</button>
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
        fetchedFilm={fetchFilm}
      />
    )
  })

  if (successfulReviewPosted) {
    reviewsList.push(
      <ReviewTile
        key={newReview.id}
        review={newReview}
        fetchedFilm={fetchFilm}
      />)
  }

  const refreshReviewList = () => {
    setRefresh(true);
  }

  const deleteFilm = async() => {
    try {
      const response = await fetch(`/api/v1/films/${props.match.params.id}`, {
        method: 'DELETE',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      if (!response.ok) {
        if(response.status === 422) {
          const body = await response.json()
          return setErrors(body.errors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw(error)
        }
      }
      setShouldRedirect(true)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const handleFilmDeleteClick = (event) => {
    event.preventDefault()
    deleteFilm()
  }

  let redirect;
  if (shouldRedirect) {
    redirect = <Redirect to={`/genres/${film.genre.id}`} />
  }

  return (
    <div>
      <h1>{film.title} - {film.year}</h1>
      <img src={film.imgUrl} />
      <div>
        <p>{film.description}</p>
        <button onClick={handleFilmDeleteClick}>Delete Film</button>
      </div>
      {submitButton}
      {successMessageTag}
      {newReviewForm}
      {reviewsList}
      {redirect}
    </div>
  )
}

export default FilmShow;
