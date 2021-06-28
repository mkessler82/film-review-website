import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

const ReviewTile = (props) => {
  const { id, starRating, description, voteCount } = props.review

  const [upvoted, setUpvoted] = useState(false)
  const [downvoted, setDownvoted] = useState(false)
  const [stateCount, setCount] = useState(voteCount)

  let stars = ""
  for (let i = 0; i < starRating; i++) {
    stars += "*"
  }

  let userReview
  if (description) {
    userReview = "User Review: "
  }

  const voted = count => {
    let localCount = stateCount
    if (downvoted == true && count == 1 && upvoted == false) {
      setDownvoted(false)
      setUpvoted(true)
      localCount += 2
    } else if (upvoted == true && count == -1 && downvoted == false) {
      setUpvoted(false)
      setDownvoted(true)
      localCount -= 2
    } else if (count == 1 && upvoted == true) {
      setUpvoted(false)
      setDownvoted(false)
      localCount -= 1
    } else if (count == 1 && upvoted == false) {
      setUpvoted(true)
      setDownvoted(false)
      localCount += 1
    } else if (count == -1 && downvoted == true) {
      setDownvoted(false)
      setUpvoted(false)
      localCount += 1
    } else if (count == -1 && downvoted == false) {
      setDownvoted(true)
      setUpvoted(false)
      localCount -= 1
    }
    console.log(localCount)
    setCount(localCount)
    updateVoteCount(id, localCount)
  }

  const updateVoteCount = async (id, finalCount) => {
    try {
      const response = await fetch(`/api/v1/reviews/${id}`, {
        method: 'PUT',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({ id: id, finalCount: finalCount })
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw (error)
        }
      }
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  let thumbsUpColor = "grey"
  let thumbsDownColor = "grey"
  if (upvoted == true) {
    thumbsUpColor = "green"
  } else if (downvoted == true) {
    thumbsDownColor = "red"
  }

  return (
    <div>
      <h2>Rating: {stars}</h2>
      <p>{userReview}</p>
      <p>{description}</p>
      <div>
        <FontAwesomeIcon className={thumbsUpColor} icon={faThumbsUp} onClick={() => voted(1)} />
        {stateCount}
        <FontAwesomeIcon className={thumbsDownColor} icon={faThumbsDown} onClick={() => voted(-1)} />
      </div>
    </div>
  )
}

export default ReviewTile