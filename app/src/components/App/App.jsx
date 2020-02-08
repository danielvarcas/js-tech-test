import React from "react";
import "./App.css";
import { Navbar, ListGroup, Container, Row, Col } from "react-bootstrap";
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
    const linkedEventTypes =
      liveEventsData.length > 1
        ? liveEventsData.map(event => {
            return {
              linkedEventTypeId: event.linkedEventTypeId,
              linkedEventTypeName: event.linkedEventTypeName || "Other Football"
            };
          })
        : [];

    const distinctLinkedEventTypes = linkedEventTypes.reduce(
      (accumulator, currentValue) => {
        if (accumulator.length < 1) {
          accumulator.push(currentValue);
          return accumulator;
        }

        if (
          !accumulator.some(
            linkedEventType =>
              linkedEventType.linkedEventTypeId ===
              currentValue.linkedEventTypeId
          )
        ) {
          accumulator.push(currentValue);
        }
        return accumulator;
      },
      []
    );

    return (
      <div className="App">
        <Navbar bg="primary">
          <Navbar.Brand href="#home">
            <img src={SkyBetLogo} alt="Sky Bet" />
          </Navbar.Brand>
        </Navbar>
        <Container className="my-3">
          <Row>
            <Col>
              <h1>Live Games</h1>

              {distinctLinkedEventTypes.length > 0 &&
                distinctLinkedEventTypes.map(eventType =>
                  eventType.linkedEventTypeId ? (
                    <div key={eventType.linkedEventTypeId} className="my-3">
                      <h2>{eventType.linkedEventTypeName}</h2>
                      <ListGroup as="ul">
                        {liveEventsData.map(event =>
                          event.linkedEventTypeId ===
                          eventType.linkedEventTypeId ? (
                            <EventDisplay
                              key={event.eventId}
                              eventId={event.eventId}
                              name={event.name}
                            />
                          ) : null
                        )}
                      </ListGroup>
                    </div>
                  ) : null
                )}

              {distinctLinkedEventTypes.length > 0 &&
                distinctLinkedEventTypes.some(
                  event => !event.linkedEventTypeId
                ) && (
                  <div className="my-3">
                    <h2>Other Football</h2>
                    <ListGroup>
                      {liveEventsData.map(event =>
                        !event.linkedEventTypeId ? (
                          <ListGroup.Item key={event.eventId}>
                            {event.name}
                          </ListGroup.Item>
                        ) : null
                      )}
                    </ListGroup>
                  </div>
                )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
