import {
  SET_SEARCH,
  SET_USERS_LIST,
  SET_USER_DETAILS,
  SET_LIST_SIZE,
  UPDATE_USERS_LIST,
  RESET_USERS_LIST_PAGE,
  INCREMENT_LIST_PAGE
} from "./_actions";

const initialState = {
  search: "",
  users: [],
  usersListSize: null,
  userListPage: 1,
  usersDetails: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH:
      return {
        ...state,
        search: action.search
      };
    case SET_USERS_LIST:
      return {
        ...state,
        users: action.users
      };
    case UPDATE_USERS_LIST:
      return {
        ...state,
        users: state.users.concat(action.users)
      };
    case SET_USER_DETAILS:
      return {
        ...state,
        usersDetails: Object.assign({}, state.usersDetails, {
          [action.id]: action.partDetails
        })
      };
    case SET_LIST_SIZE:
      return {
        ...state,
        usersListSize: action.size
      };
    case RESET_USERS_LIST_PAGE:
      return {
        ...state,
        userListPage: 1
      };
    case INCREMENT_LIST_PAGE:
      return {
        ...state,
        userListPage: state.userListPage + 1
      };
    default:
      return state;
  }
};

export default reducer;
