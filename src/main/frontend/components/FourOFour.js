import React from "react";
import { useHistory } from "react-router-dom";

const FourOFour = (props) => {
  const history = useHistory();

  const goHome = event => {
    event.preventDefault()
    history.push("/");
  }

  return (
    <div>
      <h1>Oops!</h1>
      <h3>The page you are looking for doesn't exist.</h3>
      <h4>Don't panic, just click the big button to return home!</h4>
      <button className="button" type="button" onClick={goHome}>Home</button>
    </div>
  )
}

export default FourOFour