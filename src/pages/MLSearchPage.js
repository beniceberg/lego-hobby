import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getGithubUsersList, getNextListPage, getProductDetails } from "../_actions";
import { getUsersList, getSearch, getUsersListSize } from "../_selectors";

import Search from "../components/Search";
import UsersList from "../components/UsersList";
import NoSearchResults from "../components/NoSearchResults";
import MyDropzone from "../components/UploadImage";
import UploadContent from "../components/UploadContent";

class MLSearchPage extends Component {
  doOnSearch = picture => {
    this.props.dispatch(getGithubUsersList(picture));
  };

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
          <MyDropzone 
            onDropDo={this.onDropDo}
          />
          <UploadContent />
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
