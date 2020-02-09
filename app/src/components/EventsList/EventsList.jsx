import React from "react";
import PropTypes from "prop-types";
import { ListGroup } from "react-bootstrap";
import EventDisplay from "../EventDisplay/EventDisplay";

const EventsList = props => {
  const { name, events, marketsData, outcomesData } = props;

  return (
    <div>
      <h2>{name}</h2>
      <ListGroup>
        {events.map(event => (
          <EventDisplay
            key={event.eventId}
            eventId={event.eventId}
            name={event.name}
            marketIds={event.markets}
            marketsData={marketsData}
            outcomesData={outcomesData}
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
  outcomesData: PropTypes.arrayOf(PropTypes.object)
};
EventsList.defaultProps = {
  events: [],
  marketsData: [],
  outcomesData: []
};
export default EventsList;
