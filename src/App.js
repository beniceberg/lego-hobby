import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import SearchPage from "./pages/SearchPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes>
          <Route exact path="/" element={<SearchPage />} />
        </Routes>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func
};

const mapStateToProps = state => {
  return {
    state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
