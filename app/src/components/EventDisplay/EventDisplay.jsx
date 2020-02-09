import React from "react";
import PropTypes from "prop-types";
import { ListGroup } from "react-bootstrap";

const EventDisplay = props => {
  const {
    eventId,
    name,
    marketIds,
    marketsData,
    outcomesData,
    displayPricesAsFractional
  } = props;

  // Refactor: Could filter at higher component level before passing as props
  const eventMarkets = marketsData.filter(marketData =>
    marketIds.find(marketId => marketId === marketData.marketId)
  );

  const eventOutcomes = outcomesData.filter(
    outcomeData => outcomeData.eventId === eventId
  );

  return (
    <ListGroup.Item key={eventId}>
      <h5>{name}</h5>
      {marketIds.length > 0 && (
        <>
          <h5>Primary markets:</h5>
          {eventMarkets.map(eventMarket => (
            <div key={eventMarket.marketId}>
              <h6>{eventMarket.name}</h6>
              <ul>
                {eventOutcomes.map(eventOutcome =>
                  eventOutcome.marketId === eventMarket.marketId ? (
                    <li key={eventOutcome.outcomeId}>
                      {eventOutcome.name} -{" "}
                      {displayPricesAsFractional
                        ? `${eventOutcome.price.num}/${eventOutcome.price.den}`
                        : eventOutcome.price.decimal}
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          ))}
        </>
      )}
    </ListGroup.Item>
  );
};
EventDisplay.propTypes = {
  eventId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  marketIds: PropTypes.arrayOf(PropTypes.number),
  marketsData: PropTypes.arrayOf(PropTypes.object),
  outcomesData: PropTypes.arrayOf(PropTypes.object),
  displayPricesAsFractional: PropTypes.bool
};
EventDisplay.defaultProps = {
  marketIds: [],
  marketsData: [],
  outcomesData: [],
  displayPricesAsFractional: false
};
export default EventDisplay;
