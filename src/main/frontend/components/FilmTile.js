import React from 'react';
import { Link } from "react-router-dom";

const FilmTile = (props) => {
  const { id, title, imgUrl, year } = props.film

  return (
    <div className="film-tile">
      <Link to={`/films/${id}`}>
        <img className="film-tile-img" src={imgUrl} />
        <div className="film-tile-columns">
          <div className="film-tile-column-left">
            <h6>{title}</h6>
            <p>{year}</p>
          </div>
          <div className="film-tile-column-right">
          </div>
        </div>
      </Link>
    </div>
  )
}

export default FilmTile