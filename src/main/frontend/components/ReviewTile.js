import React from 'react'

const ReviewTile = (props) => {
  const { starRating, description } = props.review
  let stars = ""
  for (let i = 0; i < starRating; i++) {
    stars += "*"
  }

  return (
    <div>
      <h2>Rating: {stars}</h2>
      <p>User review:</p>
      <p>{description}</p>
    </div>
  )
}

export default ReviewTile
