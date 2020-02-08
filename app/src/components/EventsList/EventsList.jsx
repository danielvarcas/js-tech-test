import React from "react";
import PropTypes from "prop-types";
import { ListGroup } from "react-bootstrap";
import EventDisplay from "../EventDisplay/EventDisplay";

const EventsList = props => {
  const { name, events, webSocket, marketsData } = props;
  return (
    <div>
      <h2>{name}</h2>
      <ListGroup>
        {events.map(event => (
          <EventDisplay
            key={event.eventId}
            eventId={event.eventId}
            name={event.name}
            webSocket={webSocket}
            marketIds={event.markets}
            marketsData={marketsData}
          />
        ))}
      </ListGroup>
    </div>
  );
};

EventsList.propTypes = {
  name: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(PropTypes.object),
  marketsData: PropTypes.arrayOf(PropTypes.object),
  // eslint-disable-next-line react/forbid-prop-types
  webSocket: PropTypes.object.isRequired
};

EventsList.defaultProps = {
  events: [],
  marketsData: []
};

export default EventsList;
