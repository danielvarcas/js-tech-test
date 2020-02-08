import React from "react";
import PropTypes from "prop-types";
import { ListGroup } from "react-bootstrap";

const EventDisplay = props => {
  const { eventId, name } = props;
  return <ListGroup.Item key={eventId}>{name}</ListGroup.Item>;
};

EventDisplay.propTypes = {
  eventId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

export default EventDisplay;
