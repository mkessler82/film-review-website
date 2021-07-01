import React, { useState, useEffect } from 'react'
import Star from './Star.js'

const AddStarRating = (props) => {
  const [rating, setRating] = useState(props.starRating || 0)
  const [selection, setSelection] = useState(0)

  const hoverOver = event => {
    let val = 0
    if (event && event.target && event.target.getAttribute("star-id"))
      val = event.target.getAttribute("star-id")
    setSelection(val)
  }

  const handleClick = event => {
    setRating(event.target.getAttribute("star-id") || this.state.rating)
  }

  let stars = Array.from({ length: 5 }, (v, i) => (
    <Star
      starId={i + 1}
      key={`star_${i + 1} `}
      marked={selection ? selection >= i + 1 : rating >= i + 1}
    />
  ))

  useEffect(() => {
    props.setStarRatingValue(rating)
  }, [rating])

  return (
    <div onMouseOut={() => hoverOver(null)} onClick={handleClick} onMouseOver={hoverOver} >
      {stars}
    </div>
  )
}

export default AddStarRating