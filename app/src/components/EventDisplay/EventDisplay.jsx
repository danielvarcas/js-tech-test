import React from "react";
import PropTypes from "prop-types";
import { ListGroup } from "react-bootstrap";

const EventDisplay = props => {
  const { name } = props;
  return <ListGroup.Item as="li">{name}</ListGroup.Item>;
};

EventDisplay.propTypes = {
  name: PropTypes.string.isRequired
};

export default EventDisplay;
