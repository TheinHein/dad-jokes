import React, { Component } from "react";
import axios from "axios";
import Joke from "./Joke";
import Score from "./Score";
import "./Jokes.css";
class Jokes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: [],
      isLoaded: false,
    };
    this.add = this.add.bind(this);
    this.reduce = this.reduce.bind(this);
    this.getJokes = this.getJokes.bind(this);
  }
  async componentDidMount() {
    const url = "https://icanhazdadjoke.com/";
    const headers = {
      headers: { Accept: "application/json" },
    };
    let jokes = [];
    if (localStorage.getItem("jokes") === null) {
      do {
        const response = await axios.get(url, headers);
        this.setState({ isLoaded: false });
        const { id } = response.data;
        const joke = { ...response.data, score: 0 };
        const isJokeExisted = jokes.findIndex((joke) => joke.id === id);
        isJokeExisted === -1 && jokes.push(joke);
      } while (jokes.length <= 9);
      this.setState((st) => ({
        jokes: [...st.jokes, ...jokes],
        isLoaded: true,
      }));
      localStorage.setItem("jokes", JSON.stringify(this.state.jokes));
    } else {
      const storedJokes = JSON.parse(localStorage.getItem("jokes"));

      this.setState((st) => ({
        jokes: [...st.jokes, ...storedJokes],
        isLoaded: true,
      }));
    }
  }

  async getJokes() {
    const url = "https://icanhazdadjoke.com/";
    const headers = {
      headers: { Accept: "application/json" },
    };
    let jokes = [];

    do {
      const response = await axios.get(url, headers);
      this.setState({ isLoaded: false });
      const { id } = response.data;
      const joke = { ...response.data, score: 0 };
      const isJokeExisted =
        jokes.findIndex((joke) => joke.id === id) &&
        this.state.jokes.findIndex((joke) => joke.id === id);
      isJokeExisted === -1 && jokes.push(joke);
    } while (jokes.length <= 9);
    this.setState((st) => ({
      jokes: [...st.jokes, ...jokes],
      isLoaded: true,
    }));
    localStorage.setItem("jokes", JSON.stringify(this.state.jokes));
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state.jokes) {
      localStorage.setItem("jokes", JSON.stringify(this.state.jokes));
    }
  }
  add(id) {
    this.state.jokes.sort(function (a, b) {
      return b.score - a.score;
    });
    this.setState((st) => ({
      jokes: st.jokes
        .map((joke) =>
          joke.id === id ? { ...joke, score: joke.score + 1 } : joke
        )
        .sort(function (a, b) {
          return b.score - a.score;
        }),
    }));
  }
  reduce(id) {
    this.setState((st) => ({
      jokes: st.jokes
        .map((joke) =>
          joke.id === id ? { ...joke, score: joke.score - 1 } : joke
        )
        .sort(function (a, b) {
          return b.score - a.score;
        }),
    }));
  }
  render() {
    let show = this.state.jokes.map((joke) => (
      <div className="show" key={joke.id}>
        <Score
          score={joke.score}
          add={this.add}
          reduce={this.reduce}
          id={joke.id}
        />
        <Joke joke={joke.joke} />
      </div>
    ));

    const isLoaded = this.state.isLoaded;
    return (
      <div>
        {!isLoaded ? (
          <div className="loading">
            <div class="loadingIcon fa-3x">
              <i class="fas fa-grin-squint-tears fa-spin"></i>
            </div>
          </div>
        ) : (
          <div className="Jokes">
            <section className="left">
              <h1>Dad Jokes</h1>
              <div className="logo">
                <i class="fas fa-grin-squint-tears"></i>
              </div>
              <button className="newJokes-btn" onClick={this.getJokes}>
                New Jokes
              </button>
            </section>
            <div className="showContainer">{show}</div>
          </div>
        )}
      </div>
    );
  }
}

export default Jokes;
