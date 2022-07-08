const redux = require('redux');
const axios = require('axios');
const reduxThunk = require('redux-thunk').default;
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware


const initialState = {
  loading: false,
  users: [],
  error: ''
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

function fetchUsersRequest() {
  return {
    type: FETCH_USERS_REQUEST
  }
}
function fetchUsersSuccess(users) {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  }
}
function fetchUsersFailure(error) {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }
    case FETCH_USERS_SUCCESS: {
      return {
        loading: false,
        users: action.payload,
        error: ''
      }
    }
    case FETCH_USERS_FAILURE: {
      return {
        loading: false,
        users: [],
        error: action.payload
      }
    }
  }
}

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest())
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        // response.data is the array of users
        const users = res.data.map(user => user.id)
        dispatch(fetchUsersSuccess(users))
      })
      .catch(error => {
        // error.message is the error descripthion
        dispatch(fetchUsersFailure(error.message))
      })
  }
}

const store = createStore(reducer, applyMiddleware(reduxThunk));

store.subscribe(() => { console.log(store.getState()) })
store.dispatch(fetchUsers())