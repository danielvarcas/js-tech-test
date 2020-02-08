import React from "react";
import "./App.css";
import { Navbar, ListGroup } from "react-bootstrap";
import EventDisplay from "../index";
import SkyBetLogo from "../../images/skybet-logo.png";

class App extends React.Component {
  constructor() {
    super();
    this.w = new WebSocket("ws://localhost:8889");
    this.state = {
      liveEventsData: {}
    };
  }

  componentDidMount() {
    this.listenForMessages();
    this.w.onopen = () => this.getLiveEvents();
  }

  getLiveEvents = (primaryMarkets = false) => {
    this.w.send(JSON.stringify({ type: "getLiveEvents", primaryMarkets }));
  };

  listenForMessages() {
    this.w.addEventListener("message", m => {
      const message = JSON.parse(m.data);
      switch (message.type) {
        case "LIVE_EVENTS_DATA":
          this.setState({ liveEventsData: message.data });
          break;
        default:
          break;
      }
    });
  }

  render() {
    const { liveEventsData } = this.state;

    return (
      <div className="App">
        <Navbar bg="primary">
          <Navbar.Brand href="#home">
            <img src={SkyBetLogo} alt="Sky Bet" />
          </Navbar.Brand>
        </Navbar>
        <h2>Live Events</h2>
        <ListGroup as="ul">
          {liveEventsData.length > 0 &&
            liveEventsData.map(event => (
              <EventDisplay key={event.eventId} name={event.name} />
            ))}
        </ListGroup>
      </div>
    );
  }
}

export default App;
