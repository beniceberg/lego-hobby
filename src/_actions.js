// import { history } from "./_utils";

export const SET_USERS_LIST = "SET_USERS_LIST";
export const SET_USER_DETAILS = "SET_USER_DETAILS";
export const SET_LIST_SIZE = "SET_LIST_SIZE";
export const UPDATE_USERS_LIST = "UPDATE_USERS_LIST";
export const RESET_USERS_LIST_PAGE = "RESET_USERS_LIST_PAGE";
export const INCREMENT_LIST_PAGE = "INCREMENT_LIST_PAGE";
export const SET_SEARCH = "SET_SEARCH";
export const SET_ERROR = "SET_ERROR";

const setSearch = search => ({
  type: SET_SEARCH,
  search
});
const setUsersList = users => ({
  type: SET_USERS_LIST,
  users
});
const updateUsersList = users => ({
  type: UPDATE_USERS_LIST,
  users
});
const setListSize = size => ({
  type: SET_LIST_SIZE,
  size
});
const resetUsersListPage = () => ({
  type: RESET_USERS_LIST_PAGE
});
const incrementListPage = () => ({
  type: INCREMENT_LIST_PAGE
});
const setPartDetails = partDetails => ({
  type: SET_USER_DETAILS,
  partDetails,
  id: partDetails.login
});

export const getGithubUsersList = search => (dispatch, getState) => {
  const url = `https://api.github.com/search/users?q=${search}&page=1&per_page=20`;
  fetch(url)
    .then(resp => resp.json())
    .then(json => {
      dispatch(setSearch(search));
      dispatch(setUsersList(json.items));
      dispatch(setListSize(json.total_count));
      dispatch(resetUsersListPage());
    })
    .catch(error => {
      console.log(error);
    });
};

export const getGithubPartDetails = username => (dispatch, getState) => {
  const url = `https://api.github.com/users/${username}`;
  fetch(url)
    .then(resp =>
      resp.json().then(data => Object.assign(data, { status: resp.status }))
    )
    .then(body => {
      if (body.status === 404) {
        // history.push("/error");
      } else {
        dispatch(setPartDetails(body));
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const getProductDetails = content => (dispatch, getState) => {
  const url = `https://cloudfunctions/url`;
  const init = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({ message: content }) // body data type must match "Content-Type" header
  }
  fetch(url, init)
    .then(resp => {
      return resp.json().then(data => Object.assign(data, { status: resp.status }))
    }
    )
    .then(body => {
      if (body.status === 404) {
        // history.push("/error");
      } else {
        // dispatch(setPartDetails(body));
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const getNextListPage = () => (dispatch, getState) => {
  const { userListPage, search } = getState();
  const url = `https://api.github.com/search/users?q=${search}&page=${userListPage +
    1}&per_page=20`;
  fetch(url)
    .then(resp => resp.json())
    .then(json => {
      dispatch(updateUsersList(json.items));
      dispatch(incrementListPage());
    })
    .catch(error => {
      console.log(error);
    });
};
