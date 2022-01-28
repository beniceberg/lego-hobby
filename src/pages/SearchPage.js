import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getProductDetails } from "../_actions";
import { getPartList } from "../_selectors";

import UsersList from "../components/UsersList";
import UploadContent from "../components/UploadContent";
import Camera from "../components/Camera"; 

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadChoice: ""
    };
  }

  doUserClick = username => {
    const { history } = this.props;
    history.push(`/${username}/details`);
  };

  onDropDo = content => {
    this.props.dispatch(getProductDetails(content));
  };
  onUploadClick = () => {
    this.setState({ uploadChoice: "upload" });
  };
  onPictureClick = () => {
    this.setState({ uploadChoice: "camera" });
  };

  render() {
    const { parts } = this.props;
    return (
      <div className="listPage">
        <header className="pageHeader">
          <h1 className="title">Accenture TVH product search </h1>
        </header>
        <section className="uploadSection">
          {this.state.uploadChoice === "camera" 
            ? <Camera />
            : this.state.uploadChoice === "upload" 
              ? <UploadContent />
              : (
                <div>
                  <button onClick={this.onUploadClick}>
                    Upload
                  </button>
                  <p>or</p>
                  <button onClick={this.onPictureClick}>
                    Take a picture
                  </button>
                </div>
              )
          }
        </section>
        <section className="listSection">
          {Boolean(parts.length) && (
            <UsersList
              users={parts}
              onUserClick={this.doUserClick}
            />
          )}
        </section>
      </div>
    );
  }
}

SearchPage.propTypes = {
  dispatch: PropTypes.func,
  parts: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    parts: getPartList(state),
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
)(SearchPage);
