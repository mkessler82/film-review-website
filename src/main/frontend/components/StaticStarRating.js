import React from 'react'
import Star from './Star.js'

const StaticStarRating = (props)=>  {
 
  return (
    <div>
      {Array.from({ length: props.starRating }, (i) => (
        <Star
          key={`star_${i + 1} `}
          marked={true}
        />
      ))}
      {Array.from({ length: 5 - props.starRating }, (i) => (
        <Star
          key={`star_${i + 1} `}
          marked={false}
        />
      ))}
    </div>
  );
}

export default StaticStarRating