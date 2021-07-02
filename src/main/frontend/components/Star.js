import React from 'react'

const Star = ({ marked, starId }) => {
  return (
    <span className="star" star-id={starId} style={{ color: "#ff9933" }} role="button">
      {marked ? "\u2605" : "\u2606"}
    </span>
  );
}

export default Star