import React from 'react';
import { Link } from "react-router-dom";

const FilmTile = (props) => {
  const { id, title, imgUrl, year } = props.film

  return (
    <div>
      <Link to={`/films/${id}`}>
        <img src={imgUrl} />
        <h3>{title} - {year}</h3>
      </Link>
    </div>
  )
}

export default FilmTile