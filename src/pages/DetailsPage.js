import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import _isEmpty from "lodash/isEmpty";
import { getPartDetails } from "../_selectors";
import LabelField from "../components/LabelField";

class DetailsPage extends Component {
  componentWillMount() {
    const { match, dispatch, partDetails } = this.props;
    const { username } = match.params;
  }

  doBackClick = () => {
    this.props.history.push(`/`);
  };

  render() {
    const { partDetails = {} } = this.props;
    const {
      avatar_url,
      login,
      html_url,
      name,
      company,
      location,
      followers,
      following,
      created_at
    } = partDetails;
    return (
      !_isEmpty(partDetails) && (
        <div className="detailsPage">
          <header className="pageHeader">
            <h1 className="title">User Details</h1>
          </header>
          <button onClick={this.doBackClick} className="backBtn">
            Back to List
          </button>
          <section className="partDetailsSection">
            <div className="partDetails">
              <img
                src={avatar_url}
                alt="avatar"
                className="partDetailsAvatar"
              />
              <div className="detailsInfo">
                <h2 className="usernameTitle">
                  <a href={html_url} target="_blank" rel="noopener noreferrer">
                    {login}
                  </a>
                </h2>
                <LabelField label="Name" info={name} />
                <LabelField label="Username" info={login} />
                <LabelField label="Company" info={company} />
                <LabelField label="Located" info={location} />
                <LabelField
                  label="Member Since"
                  info={moment(created_at).format("MMMM Do YYYY")}
                />
                <LabelField label="Followers" info={followers} />
                <LabelField label="Following" info={following} />
              </div>
            </div>
          </section>
        </div>
      )
    );
  }
}

DetailsPage.propTypes = {
  dispatch: PropTypes.func
};

const mapStateToProps = (state, props) => {
  const { part } = props.match.params;
  return {
    partDetails: getPartDetails(state)(part)
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
)(DetailsPage);
