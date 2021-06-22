import React, { useEffect, useState } from 'react';


const FilmShow = props => {
  const [film, setFilm] = useState([])

  const id = props.match.params.id

  const fetchFilm = async () => {
    try {
      const response = await fetch(`/api/v1/films/${id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw (error)
      }
      const filmData = await response.json()
      setFilm(filmData.film)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    fetchFilm()
  }, [])

  return (
    <div>
      <h1>hello from film id</h1>
    </div>
  )
}

export default FilmShow