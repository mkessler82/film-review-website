import React, { useState } from 'react';
import ErrorList from './ErrorList';
import AddStarRating from './AddStarRating';

const ReviewForm = props => {
  const [formPayload, setFormPayload] = useState({
    description: props.description,
    starRating: props.starRating
  })
  const [errors, setErrors] = useState({})
  const [reviewUpdated, setReviewUpdated] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  const handleInputChange = event => {
    setFormPayload({
      ...formPayload,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const validForSubmission = () => {
    const errors = {}
    const requiredFields = ["starRating"]
    requiredFields.forEach(field => {
      if (formPayload.starRating === 0) {
        errors[field] = "is not selected."
      }
    })
    setErrors(errors)
    return _.isEmpty(errors)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (validForSubmission()) {
      updateReviewBackend(formPayload)
    }
  }

  const clearForm = (event) => {
    event.preventDefault()
    setFormPayload({
      description: "",
      starRating: 0
    })
    setErrors({})
  }

  const setStarRatingValue = (starRatingValue) => {
    setFormPayload({
      ...formPayload,
      starRating: starRatingValue
    })
  }

  const updateReviewBackend = async (formPayload) => {
    try {
      const response = await fetch(`/api/v1/films/${props.id}/update-review`, {
        method: 'PUT',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(formPayload)
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
      setReviewUpdated(true)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  if(reviewUpdated){
    props.editedReviewInfo(formPayload)
  }

  const handleCancel = event => {
    event.preventDefault()
    props.cancelHideForm()
  }

  return (
    <form onSubmit={handleSubmit}>
      <ErrorList errors={{ ...errors, ...props.errors }} />
      <div>
        <label htmlFor="starRating">New Rating: </label>
        <AddStarRating setStarRatingValue={setStarRatingValue} starRating={formPayload.starRating}/>
      </div>
      <div>
        <label htmlFor="description">New Description: </label>
        <textarea
          className="text-box"
          name="description"
          id="description"
          type="text"
          value={formPayload.description}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div className="edit-buttons-container">
        <input className="edit-button submit small" type="submit" value="Submit" />
        <button className="edit-button clear small" type="button" onClick={clearForm}>Clear</button>
        <button className="edit-button cancel small" type="button" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  )
}

export default ReviewForm