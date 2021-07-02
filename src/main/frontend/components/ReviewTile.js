import React, { useState } from 'react';
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
    userReview = `User ${Math.floor(Math.random() * (1000000 - 100000) + 100000)}: `
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

  let thumbsUpColor = "grey margin-right"
  let thumbsDownColor = "grey margin-left"
  if (upvoted == true) {
    thumbsUpColor = "green margin-right"
  } else if (downvoted == true) {
    thumbsDownColor = "red margin-left"
  }

  const handleClick = event => {
    event.preventDefault()
    setShowForm(true)
  }

  const handleReviewDeleteClick = (event) => {
    deleteReview()
  }

  const updateReviewFrontEnd = formPayload => {
    setShowForm(false)
    setUpdatedReview({
      ...formPayload,
      ["description"]: formPayload.description,
      ["starRating"]: formPayload.starRating
    })
  }

  const cancelHideForm = () => {
    setShowForm(false)
  }

  const deleteReview = async () => {
    try {
      const response = await fetch(`/api/v1/reviews/${id}`, {
        method: 'DELETE',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      if (!response.ok) {
        if(response.status === 422) {
          const body = await response.json()
          return setErrors(body.errors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw(error)
        }
      }
      props.fetchedFilm();
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  let reviewBody
  if (showForm) {
    reviewBody = <EditReviewForm id={id} starRating={starRating} description={description} editedReviewInfo={updateReviewFrontEnd} cancelHideForm={cancelHideForm} />
  } else {
    reviewBody =
      <>
        <div className="review-meta">
          <h6 className="review-title">{userReview}</h6>
          <StaticStarRating starRating={updatedReview.starRating || starRating} />
        </div>
        <p className="review-text">{updatedReview.description || description}</p>
        <div className="review-icons-container">
          <div>
            <FontAwesomeIcon className={thumbsUpColor} icon={faThumbsUp} onClick={() => voted(1)} />
            {stateCount}
            <FontAwesomeIcon className={thumbsDownColor} icon={faThumbsDown} onClick={() => voted(-1)} />
          </div>
          <div>
            <svg onClick={handleClick} className="edit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.001 512.001"><path xmlns="http://www.w3.org/2000/svg" d="M496.063,62.299l-46.396-46.4c-21.199-21.199-55.689-21.198-76.888,0C352.82,35.86,47.964,340.739,27.591,361.113    c-2.17,2.17-3.624,5.054-4.142,7.875L0.251,494.268c-0.899,4.857,0.649,9.846,4.142,13.339c3.497,3.497,8.487,5.042,13.338,4.143    L143,488.549c2.895-0.54,5.741-2.008,7.875-4.143l345.188-345.214C517.311,117.944,517.314,83.55,496.063,62.299z M33.721,478.276    l14.033-75.784l61.746,61.75L33.721,478.276z M140.269,452.585L59.41,371.721L354.62,76.488l80.859,80.865L140.269,452.585z     M474.85,117.979l-18.159,18.161l-80.859-80.865l18.159-18.161c9.501-9.502,24.96-9.503,34.463,0l46.396,46.4    C484.375,93.039,484.375,108.453,474.85,117.979z"/></svg>

            <svg onClick={handleReviewDeleteClick} className="trashcan" xmlns="http://www.w3.org/2000/svg" viewBox="-40 0 427 427.00131" width="427pt"><path d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/><path d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/><path d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0"/><path d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/></svg>
          </div>
        </div>
        {/* <button className="button" type="button" onClick={handleClick}>Edit Review</button> */}
        {/* <button className="button" type="button" onClick={handleReviewDeleteClick}>Delete Review</button> */}
      </>
  }

  return (
    <div className="review-container">
      {reviewBody}
    </div>
  )
}

export default ReviewTile
