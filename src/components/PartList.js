import React from "react";
import PropTypes from "prop-types";

const Part = ({ partInfo, score, onPartClick }) => (
  <div className="part" onClick={() => onPartClick(partInfo.login)}>
    {/* <img src={partInfo.avatar_url} alt="avatar" className="partAvatar" /> */}
    <div>
      <h2 className="partName">{partInfo.displayName}</h2>
      <h3 className="partDescription">{partInfo.description}</h3>
      <div className="labelsContainer">
        {partInfo.productLabels.map(({key,value}) => (
          <div key={`${key}${value}`}><label>{key}</label><p>{value}</p></div>
        ))}
      </div>
      <p>{`score: ${score}`}</p>
    </div>
  </div>
);

Part.propTypes = {
  userInfo: PropTypes.object,
  onPartClick: PropTypes.func
};

const PartList = ({ parts, onPartClick }) => (
  <div className="partList">
    {parts.map(part => (
      <Part
        key={part.image}
        partInfo={part.product}
        score={part.score}
        onPartClick={onPartClick}
      />
    ))}
  </div>
);

PartList.propTypes = {
  parts: PropTypes.array,
  onPartClick: PropTypes.func,
  onShowMoreClick: PropTypes.func
};

export default PartList;
