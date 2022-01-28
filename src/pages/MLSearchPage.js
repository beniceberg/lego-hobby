import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getNextListPage, getProductDetails } from "../_actions";
import { getUsersList, getSearch, getUsersListSize } from "../_selectors";

import UsersList from "../components/UsersList";
import NoSearchResults from "../components/NoSearchResults";
import UploadContent from "../components/UploadContent";
import Camera from "../components/Camera";

class MLSearchPage extends Component {
  doUserClick = username => {
    const { history } = this.props;
    history.push(`/${username}/details`);
  };

  onDropDo = content => {
    this.props.dispatch(getProductDetails(content));
  };

  showMore = () => {
    this.props.dispatch(getNextListPage());
  };

  render() {
    const { users, searchText, usersListSize } = this.props;
    const showShowMoreButton = users.length < usersListSize;
    return (
      <div className="listPage">
        <header className="pageHeader">
          <h1 className="title">Accenture TVH product search </h1>
        </header>
        <section className="uploadSection">
          <UploadContent />
          <Camera />
        </section>
        <section className="listSection" onScroll={this.onScroll}>
          {Boolean(users.length) && (
            <UsersList
              users={users}
              onUserClick={this.doUserClick}
              onShowMoreClick={this.showMore}
              showShowMoreButton={showShowMoreButton}
            />
          )}
          {usersListSize === 0 && <NoSearchResults searchText={searchText} />}
        </section>
      </div>
    );
  }
}

MLSearchPage.propTypes = {
  dispatch: PropTypes.func,
  users: PropTypes.array,
  searchText: PropTypes.string,
  usersListSize: PropTypes.number
};

const mapStateToProps = state => {
  return {
    users: getUsersList(state),
    searchText: getSearch(state),
    usersListSize: getUsersListSize(state)
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
)(MLSearchPage);
