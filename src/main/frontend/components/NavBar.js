import React, { useState, useEffect } from "react"
import { Switch, Route, Link, Redirect } from "react-router-dom"

import GenresIndex from "./GenresIndex";
import GenreShow from "./GenreShow";
import FilmShow from "./FilmShow";
import FilmForm from "./FilmForm";

const NavBar = props => {
  const [genres, setGenres] = useState([])

  const fetchGenres = async () => {
    try {
      const response = await fetch("/api/v1/genres")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw (error)
      }
      const genresData = await response.json()
      setGenres(genresData.genres.content)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    fetchGenres()
  }, [])

  const genreLinks = genres.map(genre => {
    return (
      <li key={genre.id} className="menu-text">
        <Link to={`/genres/${genre.id}`}>{genre.name}</Link>
      </li>
    )
  })

  genreLinks.unshift(
    <li key={0} className="menu-text">
      <Link to={`/genres`}>All Genres</Link>
    </li>
  )

  return (
    <div>
      <div className="top-bar">
         <img src="/images/popcorn.png"/>
        <div className="top-bar-left">

          <ul className="menu">
            {genreLinks}
          </ul>
        </div>
      </div>
      <Switch>
        <Route exact path="/">
          <Redirect to="/genres" />
        </Route>
        <Route exact path="/genres" component={GenresIndex} />
        <Route exact path="/genres/:id" component={GenreShow} />
        <Route exact path="/films/new" component={FilmForm} />
        <Route exact path="/films/:id" component={FilmShow} />
      </Switch>
    </div>
  )
}

export default NavBar
