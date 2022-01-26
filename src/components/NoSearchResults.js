import React from "react";
import PropTypes from "prop-types";

const NoSearchResults = ({ searchText }) => (
  <div className="noSearchResults">
    <p>
      <span>Oops! No search results for </span>
      <span className="bold">{`"${searchText}"`}</span>
      <span>. Try something else!</span>
    </p>
  </div>
);

NoSearchResults.propTypes = {
  searchText: PropTypes.string
};

export default NoSearchResults;
