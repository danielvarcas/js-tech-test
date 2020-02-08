import React from "react";
import "./App.css";
import {
  Navbar,
  ListGroup,
  Container,
  Row,
  Col,
  Button
} from "react-bootstrap";
import EventsList from "../EventsList/EventsList";
import SkyBetLogo from "../../images/skybet-logo.png";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      webSocket: new WebSocket("ws://localhost:8889"),
      liveEventsData: {},
      marketsData: [],
      showPrimaryMarkets: false
    };
  }

  componentDidMount() {
    const { webSocket, showPrimaryMarkets } = this.state;

    webSocket.onopen = () => {
      // eslint-disable-next-line no-console
      console.log("Connected WebSocket in App component");
      this.listenForMessages();
      this.getLiveEvents(showPrimaryMarkets);
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { showPrimaryMarkets } = this.state;

    if (showPrimaryMarkets !== prevState.showPrimaryMarkets) {
      this.getLiveEvents(showPrimaryMarkets);
    }
  }

  getLiveEvents = (primaryMarkets = false) => {
    const { webSocket } = this.state;
    webSocket.send(JSON.stringify({ type: "getLiveEvents", primaryMarkets }));
  };

  getMarket(marketId = 0) {
    const { webSocket } = this.state;
    webSocket.send(
      JSON.stringify({
        type: "getMarket",
        id: marketId
      })
    );
  }

  updateMarketsData(newMarketData) {
    const { marketsData } = this.state;

    const newMarketDataIsDuplicate = marketsData.some(
      marketData => marketData.marketId === newMarketData.marketId
    );

    if (!newMarketDataIsDuplicate) {
      const combinedMarketData = [...marketsData, newMarketData];
      this.setState({ marketsData: combinedMarketData });
    }
  }

  listenForMessages() {
    const { webSocket } = this.state;

    webSocket.addEventListener("message", m => {
      const message = JSON.parse(m.data);
      switch (message.type) {
        case "LIVE_EVENTS_DATA":
          this.setState({ liveEventsData: message.data });
          break;
        case "MARKET_DATA":
          this.updateMarketsData(message.data);
          break;
        default:
          break;
      }
    });
  }

  render() {
    const {
      liveEventsData,
      marketsData,
      showPrimaryMarkets,
      webSocket
    } = this.state;

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

              <Button
                variant="primary"
                onClick={() =>
                  this.setState({ showPrimaryMarkets: !showPrimaryMarkets })
                }
              >
                {showPrimaryMarkets
                  ? "Hide Primary Markets"
                  : "Show Primary Markets"}
              </Button>

              {distinctLinkedEventTypes.length > 0 &&
                distinctLinkedEventTypes.map(eventType =>
                  eventType.linkedEventTypeId ? (
                    <EventsList
                      key={eventType.linkedEventTypeId}
                      name={eventType.linkedEventTypeName}
                      events={liveEventsData.filter(
                        event =>
                          event.linkedEventTypeId ===
                          eventType.linkedEventTypeId
                      )}
                      marketsData={marketsData}
                      webSocket={webSocket}
                    />
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
