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
    setClear(true)
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
        <AddStarRating setStarRatingValue={setStarRatingValue} starRating={formPayload.starRating} />
      </div>
      <div>
        <label htmlFor="description">Description: </label>
        <input
          name="description"
          id="description"
          type="text"
          value={formPayload.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <button className="button" type="button" onClick={clearForm}>Clear</button>
        <input className="button" type="submit" value="Submit" />
      </div>
    </form>
  )
}

export default ReviewForm