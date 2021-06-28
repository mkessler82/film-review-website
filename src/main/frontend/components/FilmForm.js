import React, { useState } from "react";
import { Redirect } from "react-router"
import _ from 'lodash'
import GenreField from "./GenreField"

const FilmForm = (props) => {
  const [formPayload, setFormPayload] = useState({
    title: "",
    imgUrl: "",
    year: "",
    description: "",
    genreId: undefined
  })

  const [filmId, setFilmId] = useState({})
  const [errors, setErrors] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const validForSubmission = () => {
    const errors = {}
    const requiredFields = ["title", "imgUrl", "year", "description", "genreId"]
    requiredFields.forEach(field => {
      if(formPayload[field].trim() === "") {
        errors[field] = "is blank"
      }
    })
    setErrors(errors)
    return _.isEmpty(errors)
  }

  const addFilm = async() => {
    try {
      const response = await fetch(`/api/v1/genres/${formPayload.genreId}/new`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(formPayload)
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

      const body = await response.json()
      setFilmId(body.film.id)
      setShouldRedirect(true)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if(validForSubmission()) {
      addFilm()
    }
  }

  const handleInputChange = event => {
      setFormPayload({
        ...formPayload,
        [event.currentTarget.name]: event.currentTarget.value
      })
  }

  if (shouldRedirect) {
    return <Redirect push to={`/films/${filmId}`} />
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title: </label>
        <input
          name="title"
          id="title"
          type="text"
          value={formPayload.title}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="imgUrl">Image URL: </label>
        <input
          name="imgUrl"
          id="imgUrl"
          type="text"
          value={formPayload.imgUrl}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="year">Year: </label>
        <input
          name="year"
          id="year"
          type="number"
          value={formPayload.year}
          onChange={handleInputChange}
        />
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

      <GenreField
        handleInputChange={handleInputChange}
        genreId={formPayload.genreId}
      />
      <input className="button" type="submit" value="Submit" />
    </form>
  )
}


export default FilmForm;
