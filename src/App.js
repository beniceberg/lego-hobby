import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import LandingPage from "./pages/LandingPage";
import MLSearchPage from "./pages/MLSearchPage";
import ListPage from "./pages/ListPage";
import DetailsPage from "./pages/DetailsPage";
import ErrorPage from "./pages/ErrorPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/ml-search" element={<MLSearchPage />} />
          <Route exact path="/list" element={<ListPage />} />
          <Route exact path="/:part/details" element={<DetailsPage />} />
          <Route path="/error" element={<ErrorPage />} />
          {/* <Redirect from="/*" to="/error" /> */}
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
