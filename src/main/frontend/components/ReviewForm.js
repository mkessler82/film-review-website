import React, { useState } from 'react';
import ErrorList from './ErrorList';

const ReviewForm = props => {
  const [formPayload, setFormPayload] = useState({
    description: "",
    starRating: ""
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
      if (formPayload[field].trim() === "") {
        errors[field] = "is empty"
      }
    })
    setErrors(errors)
    return _.isEmpty(errors)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (validForSubmission()) {
      props.postNewReview(formPayload)
      clearForm()
    }
  }

  const clearForm = (event) => {
    event.preventDefault()
    setFormPayload({
      description: "",
      starRating: ""
    })
    setErrors({})
  }

  return (
    <form onSubmit={handleSubmit}>
      <ErrorList errors={{ ...errors, ...props.errors }} />
      <div>
        <label htmlFor="starRating">Rating:</label>
        <select name="starRating" id="starRating" onChange={handleInputChange} value={formPayload.starRating}>
          <option value=""></option>
          <option value={1}>*</option>
          <option value={2}>**</option>
          <option value={3}>***</option>
          <option value={4}>****</option>
          <option value={5}>*****</option>
        </select>
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