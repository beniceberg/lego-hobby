import React from "react";
import PropTypes from "prop-types";

const Image = ({ rawData }) => (
    <div className="image">
      <img src={rawData} alt="uploaded-content" width="30" height="25" />
    </div>
  );

Image.propTypes = {
  rawData: PropTypes.object,
};

export default Image;
