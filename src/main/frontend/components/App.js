import React, { useEffect } from "react";
import { Switch, Route, Link, Redirect, BrowserRouter } from "react-router-dom"
import { hot } from "react-hot-loader/root";
import "foundation-sites";
import $ from "jquery";
import GenresIndex from "./GenresIndex";

const App = (props) => {
  useEffect(() => {
    $(document).foundation();
  }, []);

  return(
  <BrowserRouter>
    <Switch>
        <Route exact path="/">
          <Redirect to="/genres" />
        </Route>
        <Route exact path="/genres" component={GenresIndex} />
      </Switch>
  </BrowserRouter>
  )
};

export default hot(App);
