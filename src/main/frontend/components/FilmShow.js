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
        <div className="delete-trashcan-container">
          <svg onClick={handleFilmDeleteClick} className="trashcan delete-film-trashcan" xmlns="http://www.w3.org/2000/svg" viewBox="-40 0 427 427.00131" width="427pt"><path d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/><path d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/><path d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0"/><path d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/></svg>
        </div>
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
      {redirect}



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