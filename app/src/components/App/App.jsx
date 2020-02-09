import React from "react";
import "./App.css";
import { Navbar, Container, Row, Col, Button } from "react-bootstrap";
import EventsList from "../EventsList/EventsList";
import SkyBetLogo from "../../images/skybet-logo.png";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      webSocket: new WebSocket("ws://localhost:8889"),
      liveEventsData: {},
      marketsData: [],
      outcomesData: [],
      showPrimaryMarkets: false,
      displayPricesAsFractional: false
    };
  }

  componentDidMount() {
    const { webSocket } = this.state;
    webSocket.onopen = () => {
      // eslint-disable-next-line no-console
      console.log("Connected WebSocket in App component");
      this.listenForMessages();
      this.getLiveEvents();
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { liveEventsData, marketsData } = this.state;

    if (liveEventsData !== prevState.liveEventsData) {
      this.getMarkets();
    }
    if (marketsData !== prevState.marketsData) {
      this.getOutcomes();
    }
  }

  getLiveEvents() {
    const { webSocket } = this.state;
    webSocket.send(
      JSON.stringify({ type: "getLiveEvents", primaryMarkets: true })
    );
  }

  getMarkets() {
    const { liveEventsData } = this.state;

    if (liveEventsData.length < 1) return;

    const marketIds = liveEventsData.reduce((accumulator, currentValue) => {
      accumulator.push(...currentValue.markets);
      return accumulator;
    }, []);

    if (marketIds.length < 1) return;

    marketIds.forEach(marketId => this.getMarket(marketId));
  }

  getMarket(marketId = 0) {
    const { webSocket } = this.state;
    webSocket.send(
      JSON.stringify({
        type: "getMarket",
        id: marketId
      })
    );
  }

  getOutcomes() {
    const { marketsData } = this.state;
    const outcomeIds = marketsData.reduce((accumulator, currentValue) => {
      const ids = currentValue.outcomes;
      accumulator.push(...ids);
      return accumulator;
    }, []);
    const distinctOutcomeIds = new Set([...outcomeIds]);
    // Refactor: Could set distinctOutcomeIds in state and pass as props to EventsList
    distinctOutcomeIds.forEach(outcomeId => this.getOutcome(outcomeId));
  }

  getOutcome(outcomeId) {
    const { webSocket } = this.state;
    webSocket.send(JSON.stringify({ type: "getOutcome", id: outcomeId }));
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

  // Refactor: Make updateMarketsData and updateOutcomesData one reusable function
  updateOutcomesData(newOutcomeData) {
    const { outcomesData } = this.state;
    const newOutcomeDataIsDuplicate = outcomesData.some(
      outcomeData => outcomeData.outcomeId === newOutcomeData.outcomeId
    );
    if (!newOutcomeDataIsDuplicate) {
      const combinedOutcomesData = [...outcomesData, newOutcomeData];
      this.setState({ outcomesData: combinedOutcomesData });
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
        case "OUTCOME_DATA":
          this.updateOutcomesData(message.data);
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
      outcomesData,
      showPrimaryMarkets,
      displayPricesAsFractional,
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
              <h1 className="text-center">Live Games</h1>

              <div className="d-flex flex-column flex-md-row justify-content-md-end">
                <Button
                  className="my-1 my-md-0 mr-md-1"
                  variant="primary"
                  onClick={() =>
                    this.setState({ showPrimaryMarkets: !showPrimaryMarkets })
                  }
                >
                  {showPrimaryMarkets
                    ? "Hide Primary Markets"
                    : "Show Primary Markets"}
                </Button>

                <Button
                  className="my-1 my-md-0 ml-md-1"
                  variant="secondary"
                  onClick={() =>
                    this.setState({
                      displayPricesAsFractional: !displayPricesAsFractional
                    })
                  }
                >
                  {displayPricesAsFractional
                    ? "Display Decimal"
                    : "Display Fractional"}
                </Button>
              </div>

              {distinctLinkedEventTypes.length > 0 &&
                distinctLinkedEventTypes.map(eventType =>
                  eventType.linkedEventTypeId ? (
                    <div className="my-3">
                      <EventsList
                        key={eventType.linkedEventTypeId}
                        name={eventType.linkedEventTypeName}
                        events={liveEventsData.filter(
                          event =>
                            event.linkedEventTypeId ===
                            eventType.linkedEventTypeId
                        )}
                        marketsData={marketsData}
                        outcomesData={outcomesData}
                        displayPricesAsFractional={displayPricesAsFractional}
                        showPrimaryMarkets={showPrimaryMarkets}
                        webSocket={webSocket}
                      />
                    </div>
                  ) : null
                )}

              {distinctLinkedEventTypes.length > 0 && (
                <EventsList
                  name="Other Football"
                  events={liveEventsData.filter(
                    event => !event.linkedEventTypeId
                  )}
                  marketsData={marketsData}
                  outcomesData={outcomesData}
                  displayPricesAsFractional={displayPricesAsFractional}
                  showPrimaryMarkets={showPrimaryMarkets}
                  webSocket={webSocket}
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default App;
