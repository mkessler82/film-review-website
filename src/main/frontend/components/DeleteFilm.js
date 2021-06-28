import React from 'react'

const DeleteFilm = (props) => {

  const deleteFilm = async() => {
      try {
        const response = await fetch(`/api/v1/films/${props.match.params.id}/delete`, {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: ""
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

        const body = await response.json()
        setShouldRedirect(true)
      } catch(err) {
        console.error(`Error in fetch: ${err.message}`)
      }
    }

  const handleSubmit = (event) => {
    event.preventDefault()
    deleteFilm()
  }

  return (
    <div>
    <h1>Test2</h1>

    <form onSubmit={handleSubmit}>
      <input className="button" type="submit" value="Delete Film" />
    </form>
    </div>
  )

}

export default DeleteFilm