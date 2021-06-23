import React, { useEffect, useState } from 'react';

const ReviewForm = props => {
  const [formPayload, setFormPayload] = useState({
    description: "",
    starRating: ""
  })

  const handleInputChange = event => {
    console.log(event.currentTarget.value)
    setFormPayload({
      ...formPayload,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.postNewReview(formPayload)
    clearForm()
  }

  const clearForm = () => {
    setFormPayload({
      description: "",
      starRating: ""
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="starRating">Rating:</label>
        <select name="starRating" id="starRating" onChange={handleInputChange} value={formPayload.starRating}>
          <option value=""></option>
          <option value={1}>1</option>
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
      <input className="button" type="submit" value="Submit" />
    </form>
  )
}

export default ReviewForm