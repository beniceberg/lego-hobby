import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getGithubUsersList, getNextListPage } from "../_actions";
import { getUsersList, getSearch, getUsersListSize } from "../_selectors";

import Search from "../components/Search";
import UsersList from "../components/UsersList";
import NoSearchResults from "../components/NoSearchResults";

class ListPage extends Component {
  doOnSearch = user => {
    this.props.dispatch(getGithubUsersList(user));
  };

  doUserClick = username => {
    const { history } = this.props;
    history.push(`/${username}/details`);
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
          <h1 className="title">Github user list</h1>
        </header>
        <section className="searchSection">
          <Search doOnSearch={this.doOnSearch} searchText={searchText} />
          {usersListSize && (
            <div className="totalResults">
              <p>
                <span>{`We have found ${usersListSize} users for `}</span>
                <span className="bold">{`"${searchText}"`}</span>
              </p>
            </div>
          )}
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

ListPage.propTypes = {
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
)(ListPage);
