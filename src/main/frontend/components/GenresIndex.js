import React, { useEffect, useState } from 'react';

import GenreTile from './GenreTile'

const GenresIndex = props => {
  const [genres, setGenres] = useState([])

  const fetchGenres = async () => {
    try {
      const response = await fetch("/api/v1/genres")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw (error)
      }
      const genresData = await response.json()
      setGenres(genresData.genres.content)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    fetchGenres()
  }, [])

  const genreTiles = genres.map(genre => {
    return (
      <GenreTile
        key={genre.id}
        genre={genre}
      />
    )
  })

  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x">
        {genreTiles}
      </div>
    </div>
  )
}

export default GenresIndex
