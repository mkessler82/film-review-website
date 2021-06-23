import React from 'react';

const FilmTile = (props) => {
  const { id, title, imgUrl, year } = props.film

  return (
    <div>
      <a href={`/films/${id}`}>
        <img src={imgUrl} />
        <h3>{title} - {year}</h3>
      </a>
    </div>
  )
}

export default FilmTile
