import React, { useState } from 'react';
import ErrorList from './ErrorList';
import AddStarRating from './AddStarRating';

const ReviewForm = props => {
  const [formPayload, setFormPayload] = useState({
    description: "",
    starRating: 0
  })
  const [errors, setErrors] = useState({})

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
      props.postNewReview(formPayload)
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

  return (
    <form onSubmit={handleSubmit}>
      <ErrorList errors={{ ...errors, ...props.errors }} />
      <div>
        <div className="review-form-title">
          <label htmlFor="description">WRITE A REVIEW</label>
          <AddStarRating setStarRatingValue={setStarRatingValue} starRating={formPayload.starRating}/>
        </div>
        <input
          className="text-box"
          name="description"
          id="description"
          type="text"
          value={formPayload.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <button className="button review-button clear-button" type="button" onClick={clearForm}>CLEAR</button>
        <input className="button review-button submit" type="submit" value="SUBMIT" />
      </div>
    </form>
  )
}

export default ReviewForm