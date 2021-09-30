import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from "./reducers";




const initialData = {};

const middleware = [thunk];

const store = createStore(RootReducer, initialData, applyMiddleware(...middleware));

export default store;