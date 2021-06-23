import React, { useEffect, useState } from 'react';

const FilmTile = (props) => {

// const [film, setFilm] = useState()
//   const fetchFilm = async () => {
//     try {
//       const response = await fetch(`/api/v1/films/${id}`)
//       if(!response.ok) {
//         const errorMessage = `${response.status} (${response.statusText})`
//         const error = new Error(errorMessage)
//         throw(error)
//       }
//       const petData = await response.json()
//       setPet(petData.pet)
//     } catch(err) {
//       console.error(`Error in fetch: ${err.message}`)
//       setPet(null)
//     }
//   }

   useEffect(() => {
     fetchPet()
   }, [])

    return (
    <div>
      <p>  Hello </p>
    </div>
  )
}

export default FilmTile
