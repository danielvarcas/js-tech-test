import React from "react";
import PropTypes from "prop-types";
import { ListGroup } from "react-bootstrap";
import EventDisplay from "../EventDisplay/EventDisplay";

const EventsList = props => {
  const { name, events } = props;
  return (
    <div>
      <h2>{name}</h2>
      <ListGroup>
        {events.map(event => (
          <EventDisplay
            key={event.eventId}
            eventId={event.eventId}
            name={event.name}
          />
        ))}
      </ListGroup>
    </div>
  );
};

EventsList.propTypes = {
  name: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(PropTypes.object)
};

EventsList.defaultProps = {
  events: []
};

export default EventsList;
