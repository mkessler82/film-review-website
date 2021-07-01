import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import StaticStarRating from './StaticStarRating';
import EditReviewForm from './EditReviewForm';

const ReviewTile = (props) => {
  const { id, starRating, description, voteCount } = props.review

  const [upvoted, setUpvoted] = useState(false)
  const [downvoted, setDownvoted] = useState(false)
  const [stateCount, setCount] = useState(voteCount || 0)
  const [showForm, setShowForm] = useState(false)
  const [updatedReview, setUpdatedReview] = useState({
    id: id,
    starRating: "",
    description: "",
    voteCount: voteCount
  })

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

  const handleClick = event => {
    event.preventDefault()
    setShowForm(true)
  }

  const updateReviewFrontEnd = formPayload => {
    setShowForm(false)
    setUpdatedReview({...formPayload,
      ["description"]: formPayload.description,
      ["starRating"]: formPayload.starRating
    })
  }

  const cancelHideForm = () => {
    setShowForm(false)
  }

  let reviewBody
  if (showForm) {
    reviewBody = <EditReviewForm id={id} starRating={starRating} description={description} editedReviewInfo={updateReviewFrontEnd} cancelHideForm={cancelHideForm}/>
  } else {
    reviewBody =
      <>
        <StaticStarRating starRating={updatedReview.starRating || starRating} />
        <p>{userReview}</p>
        <p>{updatedReview.description || description}</p>
        <div>
          <FontAwesomeIcon className={thumbsUpColor} icon={faThumbsUp} onClick={() => voted(1)} />
          {stateCount}
          <FontAwesomeIcon className={thumbsDownColor} icon={faThumbsDown} onClick={() => voted(-1)} />
        </div>
        <button className="button" type="button" onClick={handleClick}>Edit Review</button>
      </>
  }

  return (
    <div>
      {reviewBody}
    </div>
  )
}

export default ReviewTile