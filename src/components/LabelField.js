import React from "react";
import PropTypes from "prop-types";

const LabelField = ({ label, info }) =>
  info && (
    <div className="labelField">
      <span className="label bold">{`${label}:`}</span>
      <span className="info">{info}</span>
    </div>
  );

LabelField.propTypes = {
  label: PropTypes.string,
  info: PropTypes.any
};

export default LabelField;
