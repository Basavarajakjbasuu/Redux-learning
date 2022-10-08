/** @format */

// import redux from 'redux' -- in react

const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators

//=======================
// Action
//=======================

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';

const ICECREME_ORDERED = 'ICECREME_ORDERED';
const ICECREME_RESTOCKED = 'ICECREME_RESTOCKED';



// {
//   type: CAKE_ORDERED,
//   quantity: 1,
// }

// const orderCake = () => ({
// 	type: CAKE_ORDERED,
// 	quantity: 1
// });


//=======================
// ACTION Creater
//=======================
function orderCake() {
	return {
		type: CAKE_ORDERED,
		payload: 1
	};
}

function restackCake(qty=1) {
	return {
		type: CAKE_RESTOCKED,
		payload: qty,
	};
}

function orderIceCream() {
	return {
		type: ICECREME_ORDERED,
		payload: 1
	}
}

function restackIceCreame(qty = 1) {
	return {
		type: ICECREME_RESTOCKED,
		payload: qty
	}
}


// IntialState
const initialState = {
	numOfCake: 10,
	numOfIceCream: 20,
};

//=======================
// REDUCER
//=======================
// (previousState, action) => newState

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case CAKE_ORDERED:
			return {
				...state,
        numOfCake: state.numOfCake - 1
			};
		case CAKE_RESTOCKED:
			return {
				...state,
				numOfCake: state.numOfCake + action.payload,
			}
		case ICECREME_ORDERED:
			return {
				...state,
				numOfIceCream: state.numOfIceCream - 1
			}
		case ICECREME_RESTOCKED:
			return {
				...state,
				numOfIceCream: state.numOfIceCream + action.payload
			}
		default:
			return state;
	}
};

//=======================
// Redux Store
//=======================

const store = createStore(reducer);
console.log('initial state', store.getState());

const unSubscribe = store.subscribe(() =>
	console.log('update state ', store.getState())
);

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restackCake(3))

const actions = bindActionCreators(
	{ orderCake, restackCake, orderIceCream, restackIceCreame },
	store.dispatch
)


actions.orderCake()
actions.orderCake()
actions.restackCake(4) // 12
actions.orderIceCream()
actions.orderIceCream()
actions.orderIceCream()
actions.orderIceCream()
actions.restackIceCreame(4) //20
unSubscribe();
