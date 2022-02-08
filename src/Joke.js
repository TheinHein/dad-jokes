import React, { Component } from "react";
import "./Joke.css";
class Joke extends Component {
  render() {
    return <div className="Joke">{this.props.joke}</div>;
  }
}
export default Joke;
