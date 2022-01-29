import React, { Component } from "react";
import CounterItem from "./CounterItem";
import "./styles/App.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";

class App extends Component {
  state = {
    nameOfTheEvent: "End of the world",
    countdownDate: "2024-01-01T21:37:00", // new Date("2050-01-01T16:39:57"),
    imgLink: "https://i.imgur.com/0VvOUXk.png",
    counterItems: {
      seconds: "00",
      minutes: "00",
      hours: "00",
      days: "00",
    },
    areSettingsEnabled: false,
  };

  calculateTimetoEnd = () => {
    const time =
      new Date(this.state.countdownDate).getTime() - new Date().getTime();

    this.setState({
      counterItems: {
        seconds: String(Math.floor((time % (1000 * 60)) / 1000)),
        minutes: String(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))),
        hours: String(
          Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        ),
        days: String(Math.floor(time / (1000 * 60 * 60 * 24))),
      },
    });
  };

  componentDidMount() {
    this.intervalItem = setInterval(this.calculateTimetoEnd, 200);
  }
  componentWillUnmount() {
    clearInterval(this.intervalItem);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClick = () => {
    this.setState((prevState) => {
      return { areSettingsEnabled: !prevState.areSettingsEnabled };
    });
  };

  render() {
    const {
      nameOfTheEvent,
      counterItems,
      countdownDate,
      imgLink,
      areSettingsEnabled,
    } = this.state;

    const numberItemsComponents = Object.entries(counterItems)
      .map(([key, value]) => (
        <CounterItem key={key} unit={key} number={value} />
      ))
      .reverse();

    const headerBackground = { backgroundImage: `url("${imgLink}")` };

    return (
      <main>
        <header style={headerBackground}>
          <button
            className={areSettingsEnabled ? "active" : ""}
            onClick={this.handleClick}
          >
            <FontAwesomeIcon icon={faSlidersH} />
          </button>
        </header>
        <section className={`settings ${areSettingsEnabled ? "active" : ""}`}>
          <h2>Settings</h2>
          <div className="fields">
            <label>
              <span>Name of the event: </span>
              <input
                value={nameOfTheEvent}
                name="nameOfTheEvent"
                type="text"
                onChange={this.handleChange}
              />
            </label>
            <label>
              <span>Date: </span>
              <input
                value={countdownDate}
                name="countdownDate"
                type="datetime-local"
                min={new Date().toISOString().slice(0, 16)}
                max={new Date("9999-12-31").toISOString().slice(0, 16)}
                onChange={this.handleChange}
              />
            </label>
            <label>
              <span>Image link: </span>
              <input
                value={imgLink}
                name="imgLink"
                type="search"
                onChange={this.handleChange}
              />
            </label>
          </div>
        </section>
        <div className="timer">
          <h2 className="nameOfTheEvent">
            Time to: <span>{nameOfTheEvent}</span>
          </h2>
          <div className="items">{numberItemsComponents}</div>
        </div>
      </main>
    );
  }
}

export default App;
