import React, { useState } from 'react'
import Star from './Star.js'

const AddStarRating = (props)=>  {
  const [rating, setRating] = useState(
    typeof props.starRating == "number" ? props.starRating : 0
  );
  const [selection, setSelection] = useState(0);
  const hoverOver = event => {
    let val = 0;
    if (event && event.target && event.target.getAttribute("star-id"))
      val = event.target.getAttribute("star-id");
    setSelection(val);
  };

  props.setStarRatingValue(rating) 

  return (
    <div
      onMouseOut={() => hoverOver(null)}
      onClick={() =>
        setRating(event.target.getAttribute("star-id") || this.state.rating)
      }
      onMouseOver={hoverOver}
    >
      {Array.from({ length: 5 }, (v, i) => (
        <Star
          starId={i + 1}
          key={`star_${i + 1} `}
          marked={selection ? selection >= i + 1 : rating >= i + 1}
        />
      ))}
    </div>
  );
}

export default AddStarRating