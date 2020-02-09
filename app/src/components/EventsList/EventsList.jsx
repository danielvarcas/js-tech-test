import React from "react";
import PropTypes from "prop-types";
import EventDisplay from "../EventDisplay/EventDisplay";

const EventsList = props => {
  const {
    name,
    events,
    marketsData,
    outcomesData,
    displayPricesAsFractional
  } = props;

  return (
    <div>
      <h2>{name}</h2>
      {events.map(event => (
        <div key={event.eventId} className="my-3">
          <EventDisplay
            eventId={event.eventId}
            name={event.name}
            marketIds={event.markets}
            marketsData={marketsData}
            outcomesData={outcomesData}
            displayPricesAsFractional={displayPricesAsFractional}
            competitors={event.competitors}
            scores={event.scores}
          />
        </div>
      ))}
    </div>
  );
};
EventsList.propTypes = {
  name: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(PropTypes.object),
  marketsData: PropTypes.arrayOf(PropTypes.object),
  outcomesData: PropTypes.arrayOf(PropTypes.object),
  displayPricesAsFractional: PropTypes.bool
};
EventsList.defaultProps = {
  events: [],
  marketsData: [],
  outcomesData: [],
  displayPricesAsFractional: false
};
export default EventsList;
