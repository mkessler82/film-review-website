import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom"
import FilmTile from "./FilmTile";

const GenreShow = props => {
  let location = useLocation();
  const [genre, setGenre] = useState({ films: [] })

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
  }, [location.pathname])

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
      <div className="card-list">
        {filmTiles}
      </div>
    </div>
  )
}

export default GenreShow