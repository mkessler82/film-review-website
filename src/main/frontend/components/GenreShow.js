import React, { useEffect, useState } from 'react';
import FilmTile from "./FilmTile";

const GenreShow = props => {
  const [genre, setGenre] = useState({films: []})

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
      setGenre(genreData.genre)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    fetchGenre()
  }, [])

  const filmTiles = genre.films.map(film => {
    return (
      <FilmTile
        key={film.id}
        film={film}
      />
    )
  })

  return (
    <div>
      <h1>{genre.name}</h1>
      {filmTiles}
    </div>
  )
}

export default GenreShow
