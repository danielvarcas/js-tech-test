import React from "react";
import PropTypes from "prop-types";
import { ListGroup } from "react-bootstrap";

const EventDisplay = props => {
  const {
    eventId,
    name,
    marketIds,
    marketsData,
    outcomeIds,
    outcomesData
  } = props;

  const eventMarkets = marketsData.filter(marketData =>
    marketIds.find(marketId => marketId === marketData.marketId)
  );

  return (
    <ListGroup.Item key={eventId}>
      <h5>{name}</h5>
      {marketIds.length > 0 && (
        <>
          <h6>Primary markets:</h6>
          <ul>
            {eventMarkets.map(eventMarket => (
              <li key={eventMarket.marketId}>{eventMarket.name}</li>
            ))}
          </ul>
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
  outcomeIds: PropTypes.arrayOf(PropTypes.number),
  outcomesData: PropTypes.arrayOf(PropTypes.object)
};
EventDisplay.defaultProps = {
  marketIds: [],
  marketsData: [],
  outcomeIds: [],
  outcomesData: []
};
export default EventDisplay;
