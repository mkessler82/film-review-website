import React, { useEffect, useState } from 'react';
import ReviewForm from './ReviewForm';
import ReviewTile from './ReviewTile';
import { Redirect } from "react-router-dom";
import Star from "./Star";

const FilmShow = props => {
  const [film, setFilm] = useState({
    genre: "",
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

  let addReviewButton = <button type="button" className="button" onClick={handleReviewButtonClick}>Add Review!</button>
  if (successfulReviewPosted || showForm) {
    addReviewButton = null
  }

  let successMessageTag;
  if (successfulReviewPosted) {
    successMessageTag = <p><strong>Thank you for your review.</strong></p>
  }

  let ratingAccumulator = 0
  let totalReviews = 0
  let average 
  let reviewsList = film.reviews.map(review => {
    ratingAccumulator += review.starRating
    totalReviews++
    return (
      <ReviewTile
        key={review.id}
        review={review}
        fetchedFilm={fetchFilm}
      />
    )
  })

  average = ratingAccumulator/ totalReviews

  if (average % 1 !== 0) {
    average = average.toFixed(2);
  }
 
  let displayedAverage
  if (!average == 0){
    displayedAverage = average
  }if (film.reviews.length == 0){
    displayedAverage = "-"
  }

  if (successfulReviewPosted) {
    average = (newReview.starRating + ratingAccumulator)/ (totalReviews + 1)
    displayedAverage = average
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
        if (response.status === 422) {
          const body = await response.json()
          return setErrors(body.errors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw (error)
        }
      }
      setShouldRedirect(true)
    } catch (err) {
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
    <div className="film-page">
      <div className="left-column">
        <img src={film.imgUrl} />
        <a className="left-column-buttons trailer" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">WATCH TRAILER</a>
        <a className="left-column-buttons hulu" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">WATCH ON HULU</a>
        <a className="left-column-buttons prime" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">WATCH ON PRIME VIDEO</a>
      </div>

      <div className="center-column">
        <div className="movie-meta-data">
          <div className="title-section">
            <h1>{film.title}</h1>
            <p>{film.genre.name} <span></span> {film.year}</p>
          </div>
          <div className="score-section">
            <div>
              <Star marked={true}></Star>
              <p className="score"><span>{displayedAverage}</span> / 5</p>
            </div>
            <p>{film.reviews.length} {film.reviews.length == 1? "review" : "reviews"}</p>
          </div>
        </div>

        <div className="summary">
          <h3>Summary</h3>
          <p>{film.description}</p>
        </div>

        <ReviewForm       
          errors={formErrors}
          postNewReview={addReview}>
        </ReviewForm>

        <div className="reviews">
          {reviewsList}
        </div>
      </div>




      {/* <div>
        {addReviewButton}
        {successMessageTag}
        {newReviewForm}
        <button className="button" onClick={handleFilmDeleteClick}>Delete Film</button>
        {redirect}
      </div> */}
    </div>
  )
}

export default FilmShow;