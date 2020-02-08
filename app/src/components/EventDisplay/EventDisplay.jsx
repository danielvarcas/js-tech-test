import React from "react";
import PropTypes from "prop-types";
import { ListGroup } from "react-bootstrap";

const EventDisplay = props => {
  const { eventId, name, marketIds, webSocket, marketsData } = props;

  function getMarket(marketId) {
    webSocket.send(JSON.stringify({ type: "getMarket", id: marketId }));
  }

  marketIds.forEach(marketId => {
    if (!marketsData.some(marketData => marketData.marketId === marketId)) {
      getMarket(marketId);
    }
  });

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
  // eslint-disable-next-line react/forbid-prop-types
  webSocket: PropTypes.object.isRequired
};

EventDisplay.defaultProps = {
  marketIds: [],
  marketsData: []
};

export default EventDisplay;
