import React, { useEffect, useState } from 'react';
import FilmTile from "./FilmTile"

const GenresShow = props => {
  const [films, setFilms] = useState(
    { films: [] }
  )

  const fetchGenre = async () => {
    try {
      const genreId = props.match.params.id
      const response = await fetch(`/api/v1/genres/${genreId}`)
      if (!response.ok) {

        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw (error)
      }
      const genreData = await response.json()

      setFilms(genreData.genre.films)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {

    fetchGenre()
  }, [])

  return (
    <div>
      <h1>Genre Show Page</h1>
    </div>
  )
}

export default GenresShow
