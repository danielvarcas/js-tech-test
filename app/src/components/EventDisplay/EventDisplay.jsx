import React from "react";
import PropTypes from "prop-types";
import { ListGroup, Row, Col } from "react-bootstrap";

const EventDisplay = props => {
  const {
    eventId,
    marketIds,
    marketsData,
    outcomesData,
    displayPricesAsFractional,
    competitors,
    scores
  } = props;

  // Refactor: Could filter at higher component level before passing as props
  const eventMarkets = marketsData.filter(marketData =>
    marketIds.find(marketId => marketId === marketData.marketId)
  );

  const eventOutcomes = outcomesData.filter(
    outcomeData => outcomeData.eventId === eventId
  );

  const homeCompetitor = competitors.find(
    competitor => competitor.position === "home"
  );

  const awayCompetitor = competitors.find(
    competitor => competitor.position === "away"
  );

  return (
    <React.Fragment key={eventId}>
      <ListGroup>
        <ListGroup.Item className="bg-light">
          <Row>
            <Col>
              <b>{homeCompetitor.name}</b>
            </Col>
            <Col xs={1} className="text-right">
              <b>{scores.home}</b>
            </Col>
          </Row>
          <Row>
            <Col>
              <b>{awayCompetitor.name}</b>
            </Col>
            <Col xs={1} className="text-right">
              <b>{scores.away}</b>
            </Col>
          </Row>
        </ListGroup.Item>

        {marketIds.length > 0 && (
          <>
            {eventMarkets.map(eventMarket => (
              <React.Fragment key={eventMarket.marketId}>
                <ListGroup.Item className="bg-primary text-light">
                  <h6>{eventMarket.name}</h6>
                </ListGroup.Item>

                {eventOutcomes.map(eventOutcome =>
                  eventOutcome.marketId === eventMarket.marketId ? (
                    <ListGroup.Item key={eventOutcome.outcomeId}>
                      <Row>
                        <Col>{eventOutcome.name}</Col>
                        <Col className="text-right">
                          {displayPricesAsFractional
                            ? `${eventOutcome.price.num}/${eventOutcome.price.den}`
                            : eventOutcome.price.decimal}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ) : null
                )}
              </React.Fragment>
            ))}
          </>
        )}
      </ListGroup>
    </React.Fragment>
  );
};
EventDisplay.propTypes = {
  eventId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  marketIds: PropTypes.arrayOf(PropTypes.number),
  marketsData: PropTypes.arrayOf(PropTypes.object),
  outcomesData: PropTypes.arrayOf(PropTypes.object),
  displayPricesAsFractional: PropTypes.bool,
  competitors: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, position: PropTypes.string })
  ).isRequired,
  scores: PropTypes.shape({ home: PropTypes.number, away: PropTypes.number })
    .isRequired
};
EventDisplay.defaultProps = {
  marketIds: [],
  marketsData: [],
  outcomesData: [],
  displayPricesAsFractional: false
};
export default EventDisplay;
