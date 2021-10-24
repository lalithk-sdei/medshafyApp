import { RESET_DATA, SET_LOAD_ORDERS_STATUS, SET_LOAD_ORDERS, SET_LOAD_ORDERS_PROCESS, SET_ADD_ORDERS, } from "../types/types";
import { orders } from "../ApiServices/index";

export const getAddress = () => async (dispatch) => {
    dispatch({ type: SET_LOAD_ORDERS_PROCESS, payload: true });
    try {
        let res = await orders.getorders();
        if (res.data && res.code == 200) {
            dispatch({ type: SET_LOAD_ORDERS, payload: res.data.items });
            dispatch({ type: SET_LOAD_ORDERS_STATUS, payload: 'ok' });
        } else {
            dispatch({ type: SET_LOAD_ORDERS_STATUS, payload: 'fail' });
        }
        dispatch({ type: SET_LOAD_ORDERS_PROCESS, payload: false });
    } catch (error) {
        dispatch({ type: SET_LOAD_ORDERS_STATUS, payload: 'fail' });
        dispatch({ type: SET_LOAD_ORDERS_PROCESS, payload: false });
    }
}

export const addOrder = (body, done) => async (dispatch) => {
    dispatch({ type: SET_LOAD_ORDERS_PROCESS, payload: true });
    try {
        let res = await orders.createOrder(body);
        if (res.data && res.code == 200) {
            dispatch({ type: SET_ADD_ORDERS, payload: res.data.items });
            dispatch({ type: SET_LOAD_ORDERS_STATUS, payload: 'ok' });
            done(true);
        } else {
            dispatch({ type: SET_LOAD_ORDERS_STATUS, payload: 'fail' });
            done(false);
        }
        dispatch({ type: SET_LOAD_ORDERS_PROCESS, payload: false });
    } catch (error) {
        done(false);
        dispatch({ type: SET_LOAD_ORDERS_STATUS, payload: 'fail' });
        dispatch({ type: SET_LOAD_ORDERS_PROCESS, payload: false });
    }
}







