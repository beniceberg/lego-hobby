import React from "react";
import PropTypes from "prop-types";

const User = ({ userInfo, onUserClick }) => (
  <div className="user" onClick={() => onUserClick(userInfo.login)}>
    <img src={userInfo.avatar_url} alt="avatar" className="userAvatar" />
    <div>
      <h2 className="userName">{userInfo.login}</h2>
    </div>
  </div>
);

User.propTypes = {
  userInfo: PropTypes.object,
  onUserClick: PropTypes.func
};

const UsersList = ({
  users,
  onUserClick,
  onShowMoreClick,
  showShowMoreButton
}) => (
  <div className="usersList">
    {users.map(user => (
      <User key={user.id} userInfo={user} onUserClick={onUserClick} />
    ))}
    {showShowMoreButton && (
      <div className="showMorebtnContainer">
        <button onClick={onShowMoreClick} className="showMoreBtn">
          Show more
        </button>
      </div>
    )}
  </div>
);

UsersList.propTypes = {
  users: PropTypes.array,
  onUserClick: PropTypes.func,
  onShowMoreClick: PropTypes.func
};

export default UsersList;
