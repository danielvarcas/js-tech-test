import React from "react";
import PropTypes from "prop-types";
import EventDisplay from "../EventDisplay/EventDisplay";

const EventsList = props => {
  const {
    name,
    events,
    marketsData,
    outcomesData,
    displayPricesAsFractional,
    showPrimaryMarkets
  } = props;

  return (
    <div>
      <h2>{name}</h2>
      {events.map(event => (
        <div key={event.eventId} className="my-3">
          <EventDisplay
            eventId={event.eventId}
            marketIds={event.markets}
            marketsData={marketsData}
            outcomesData={outcomesData}
            displayPricesAsFractional={displayPricesAsFractional}
            competitors={event.competitors}
            showPrimaryMarkets={showPrimaryMarkets}
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
  displayPricesAsFractional: PropTypes.bool,
  showPrimaryMarkets: PropTypes.bool
};
EventsList.defaultProps = {
  events: [],
  marketsData: [],
  outcomesData: [],
  displayPricesAsFractional: false,
  showPrimaryMarkets: false
};
export default EventsList;
