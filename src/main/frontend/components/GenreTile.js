import React from 'react'

const GenreTile = (props) => {
  const { id, name, imgUrl } = props.genre

    return (
    <div>
      <a href={`/genres/${id}`}>
        <img src={imgUrl} />
        <h1>{name}</h1>
      </a>
    </div>
  )
}

export default GenreTile