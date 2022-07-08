const redux = require('redux');
const reduxLogger = require('redux-logger');

const createStore = redux.createStore;
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM'

function buyCake() {
  return {
    type: BUY_CAKE,
    info: 'First redux action'
  }
}
function buyIcecream() {
  return {
    type: BUY_ICECREAM,
  }
}

const initialCakeState = {
  numOfCakes: 10
}
const initialIcecreamState = {
  numOfIcereams: 20
}
/*
**  Simple way for reducer best one for small state
      const initialState = {
        numOfCakes: 10,
        numOfIcereams: 20
      }
        function reducer(state = initialState, action) {
          switch (action.type) {
          case BUY_CAKE: {
            return {
              ...state,
              numOfCakes: state.numOfCakes - 1
            }
          }
          case BUY_ICECREAM: {
            return {
              ...state,
              numOfIcereams: state.numOfIcereams - 1
            }
          }
          default: {
            return state
          }
        }
      }
*/

function cakeReducer(state = initialCakeState, action) {
  switch (action.type) {
    case BUY_CAKE: {
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1
      }
    }
    default: {
      return state
    }
  }
}
function icecreamReducer(state = initialIcecreamState, action) {
  switch (action.type) {
    case BUY_ICECREAM: {
      return {
        ...state,
        numOfIcereams: state.numOfIcereams - 1
      }
    }
    default: {
      return state
    }
  }
}
const rootReducer = combineReducers({
  cake: cakeReducer,
  icecream: icecreamReducer
})

const store = createStore(rootReducer, applyMiddleware(logger))
console.log('Initial state', store.getState());
const unsubscribe = store.subscribe(() => { })
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())




unsubscribe()