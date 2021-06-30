import React from 'react'
import Star from './Star.js'

const StaticStarRating = (props) => {

  const stars = Array.from({ length: props.starRating }, (v, i) => (
    <Star
      key={`star_${i + 1} `}
      marked={true}
    />
  ))
  const emptyStars = Array.from({ length: 5 - props.starRating }, (v, i) => (
    <Star
      key={`star_${i + 1} `}
      marked={false}
    />
  ))

  return (
    <div>
      {stars}{emptyStars}
    </div>
  );
}

export default StaticStarRating