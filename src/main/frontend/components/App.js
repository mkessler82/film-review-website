import React, { useEffect } from "react";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom"
import { hot } from "react-hot-loader/root";
import "foundation-sites";
import $ from "jquery";
import GenresIndex from "./GenresIndex";
import GenreShow from "./GenreShow";
import FilmShow from "./FilmShow";

const App = (props) => {
  useEffect(() => {
    $(document).foundation();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/genres" />
        </Route>
        <Route exact path="/genres" component={GenresIndex} />
        <Route exact path="/genres/:id" component={GenreShow} />
        <Route exact path="/films/:id" component={FilmShow} />
      </Switch>
    </BrowserRouter>
  )
};

export default hot(App);
