import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

const Upvote = props => {
  const [upvoted, setUpvoted] = useState(false)

  const thumbsUpIcon = <FontAwesomeIcon icon={faThumbsUp} />

   //let color = "grey"
  // const upvote = () => {
  //   setUpvoted(true)
  //   color = "green"
  // }

  return (
    <div>
      {thumbsUpIcon}
    </div>
  )
}

export default Upvote