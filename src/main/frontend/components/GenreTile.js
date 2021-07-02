import React from 'react'

const GenreTile = (props) => {
  const { id, name, imgUrl } = props.genre

  return (
    <div className="cell small-12 medium-6 large-4">
      <a href={`/genres/${id}`}>
        <img className="thumbnail" src={imgUrl} />
        <h1>{name}</h1>
      </a>
    </div>
  )
}

export default GenreTile