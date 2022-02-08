import React, { Component } from "react";
import "./Score.css";
class Score extends Component {
  constructor(props) {
    super(props);
    this.add = this.add.bind(this);
    this.reduce = this.reduce.bind(this);
  }
  add(evt) {
    this.props.add(this.props.id);
  }
  reduce(evt) {
    this.props.reduce(this.props.id);
  }
  render() {
    return (
      <div className="Score">
        <div className="Score-btn">
          <i className="up fas fa-thumbs-up" onClick={this.add}></i>
        </div>

        <div className="Score-count">{this.props.score}</div>
        <div className="Score-btn">
          <i className="down fas fa-thumbs-down" onClick={this.reduce}></i>
        </div>
      </div>
    );
  }
}

export default Score;
