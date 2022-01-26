import React, { Component } from "react";
import PropTypes from "prop-types";

class ErrorPage extends Component {
  doBackClick = () => {
    this.props.history.push(`/`);
  };

  render() {
    return (
      <div className="errorPage">
        <div className="header error" />
        <div>
          <button onClick={this.doBackClick} className="backBtn">
            Back to List
          </button>
        </div>
      </div>
    );
  }
}

ErrorPage.propTypes = {
  history: PropTypes.object
};

export default ErrorPage;
