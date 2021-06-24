import React from 'react'

const ReviewTile = (props) => {
  const { starRating, description } = props.review
  let stars = ""
  for (let i = 0; i < starRating; i++) {
    stars += "*"
  }

  let userReview
  if (description) {
    userReview = "User Review: "
  }

  return (
    <div>
      <h2>Rating: {stars}</h2>
      <p>{userReview}</p>
      <p>{description}</p>
    </div>
  )
}

export default ReviewTile
