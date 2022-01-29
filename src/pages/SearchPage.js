import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TvhLogo from '../tvh-logo.svg';

import { getProductDetails } from "../_actions";
import { getPartList } from "../_selectors";

import PartList from "../components/PartList";
import UploadContent from "../components/UploadContent";
import Camera from "../components/Camera"; 

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadChoice: null,
      fileSelected: null,
      search: false,
    };
  }

  doPartClick = username => {
    const { history } = this.props;
    history.push(`/${username}/details`);
  };
  doOnFileSelected = file => {
    console.log(file)
    this.setState({ fileSelected: file });
  }

  onDropDo = content => {
    this.props.dispatch(getProductDetails(content));
  };
  onUploadClick = () => {
    this.setState({ uploadChoice: "upload" });
  };
  onPictureClick = () => {
    this.setState({ uploadChoice: "camera" });
  };
  onSearchClick = () => {
    this.setState({ search: true, uploadChoice: null });
    const { fileSelected } = this.state;
    const formData = new FormData();
    // Update the formData object
    formData.append( "upload", fileSelected, fileSelected.name);
    this.props.dispatch(getProductDetails(formData));
  };

  render() {
    const { parts } = this.props;
    return (
      <div className="listPage">
        <header className="pageHeader">
          <img src={TvhLogo} alt="TVH Logo" className="tvhLogo"/>
          <h1 className="title">smart search </h1>
        </header>
        <section className="uploadSection">
          {this.state.uploadChoice === "camera" 
            ? <Camera
                onFileSelected={this.doOnFileSelected}
              />
            : this.state.uploadChoice === "upload" 
              ? <UploadContent 
                  onFileSelected={this.doOnFileSelected}
                  fileSelected={this.state.fileSelected}
                />
              : (
                <div className="choiceContainer">
                  <button className="tvhBtn" onClick={this.onUploadClick}>
                    Upload
                  </button>
                  <p>or</p>
                  <button className="tvhBtn" onClick={this.onPictureClick}>
                    Take a picture
                  </button>
                </div>
              )
          }
          {
            <div className="searchContainer">
              <button
                className="tvhBtn white"
                onClick={this.onSearchClick}
                disabled={!this.state.fileSelected}
              >
                Search
              </button>
            </div>
          }
        </section>
        <section className="listSection">
          {Boolean(parts.length) && (
            <PartList
              parts={parts}
              onUserClick={this.doPartClick}
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
