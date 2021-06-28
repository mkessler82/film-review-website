import React from 'react';
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

const FilmTile = (props) => {
  const { id, title, imgUrl, year } = props.film

//
  const thumbsUpIcon = <FontAwesomeIcon icon={faThumbsUp} />

  return (
    <div>        
      <div className="green">
             {thumbsUpIcon}
      </div>
      <Link to={`/films/${id}`}>
        <img src={imgUrl} />
        <h3>{title} - {year}</h3>
      </Link>
    </div>
  )
}

export default FilmTile
