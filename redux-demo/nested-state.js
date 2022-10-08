const redux = require('redux')
// immer - help to manage nested-object
const produce = require('immer').produce

const applayMiddleWare = redux.applyMiddleware

// Middleware - extend Redux with custome functionality
//            - it is a third-party extension
//  Ex-redux-logger ==> add login details

const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()

const intialState = {
  name: 'Basavaraj',
  address: {
    street: '#73 Shanthi nivasa',
    City: 'Mysore',
    State: 'Karanataka'
  }
}
// action
const STREET_UPDATE = 'STREET_UPDATE';

// action creater
const updateStreet = (street) => {
  return {
    type: 'STREET_UPDATE',
    payload: street
	};
}

// reducer(prevState, action)
const reducer = (state = intialState, action) => {
  switch (action.type) {
    case 'STREET_UPDATE':
      // return {
      //   ...state,
      //   address: {
      //     ...state.address,
      //     street: action.payload
      //   }
      // },
      return produce(state, (draft) => {
        draft.address.street = action.payload
      })
    default: {
      return state
    }
  }
}

// create store
const store = redux.createStore(reducer, applayMiddleWare(logger))
console.log('intial state', store.getState());

const unSubscribe = store.subscribe(() => {
  // console.log('Updated state', store.getState());
})

store.dispatch(updateStreet('#79 Sham Sharan negi colony'))
unSubscribe()