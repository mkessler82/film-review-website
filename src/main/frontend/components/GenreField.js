import React, { useEffect, useState } from 'react'

const GenreField = props => {
  const [genres, setGenres] = useState([])

  const fetchGenres = async () => {
    try {
      const response = await fetch("/api/v1/genres")
      if(!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const responseObj = await response.json()
      setGenres(responseObj.genres.content)

    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    fetchGenres()
  }, [])

  const genresOptions = genres.map(genre => {
    return(
      <option key={genre.id} value={genre.id}>
        {genre.name}
      </option>
    )
  })

  return(
    <div>
      <label htmlFor="genreId">Genre:</label>
      <select name="genreId" id="genreId" onChange={props.handleInputChange} value={props.genreId}>
        <option value="Empty">Please select the genre</option>
        {genresOptions}
      </select>
    </div>
  )
}

export default GenreField;
