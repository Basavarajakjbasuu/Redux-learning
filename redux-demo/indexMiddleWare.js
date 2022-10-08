/** @format */

const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;

const applayMiddleWare = redux.applyMiddleware

const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()

// Action
const CAKE_ORDER = 'CAKE_ORDER';
const CAKE_RESTACKED = 'CAKE_RESTACKED';
const ICECREAME_ORDER = 'ICREAME_ORDER';
const ICECREAME_RESTACKED = 'ICECREAME_RESTACKED';

// action creater
function orderCake() {
	return {
		type: CAKE_ORDER,
		payload: 1
	};
}

function restackCake(qty = 1) {
	return {
		type: CAKE_RESTACKED,
		payload: qty
	};
}

function orderIcecream() {
	return {
		type: ICECREAME_ORDER,
		payload: 1
	};
}

function restackIcecream(qty) {
	return {
		type: ICECREAME_RESTACKED,
		payload: qty
	};
}

const cakeIntialState = {
	numOfCake: 10
};

const iceCreameIntialState = {
	numOfIceCream: 20
};
// Reducer = (previosState, action)
// Multiple Reducer
const cakeReducer = (state = cakeIntialState, action) => {
	switch (action.type) {
		case CAKE_ORDER:
			return {
				...state,
				numOfCake: state.numOfCake - 1
			};
		case CAKE_RESTACKED:
			return {
				...state,
				numOfCake: state.numOfCake + action.payload
			};
		default:
			return state;
	}
};

const iceCreamReducer = (state = iceCreameIntialState, action) => {
	switch (action.type) {
		case ICECREAME_ORDER:
			return {
				...state,
				numOfIceCream: state.numOfIceCream - 1
			};
		case ICECREAME_RESTACKED:
			return {
				...state,
				numOfIceCream: state.numOfIceCream + action.payload
			};
		default:
			return state;
	}
};

// Redux store
const rootReducer = combineReducers({
	cake: cakeReducer,
	iceCream: iceCreamReducer
});
const store = createStore(rootReducer, applayMiddleWare(logger));
console.log('initial state', store.getState());

const unSubscribe = store.subscribe(() => {
	// console.log('Updated State', store.getState());
});

const actions = bindActionCreators(
	{ orderCake, restackCake, orderIcecream, restackIcecream },
	store.dispatch
);

actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restackCake(3);
actions.restackIcecream(3);
actions.orderIcecream();
actions.orderIcecream();

unSubscribe();
