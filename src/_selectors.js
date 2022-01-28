export const getSearch = state => state.search;

export const getUsersList = state => state.users;

export const getPartList = state => state.parts;

export const getUsersListSize = state => state.usersListSize;

export const getPartDetails = state => {
  const { usersDetails } = state;
  return username => {
    return usersDetails[username];
  };
};
