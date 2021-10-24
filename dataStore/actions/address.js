import { RESET_DATA, SET_ADD_ADDRESS, SET_LOAD_ADDRESS, SET_LOAD_ADDRESS_PROCESS, SET_LOAD_ADDRESS_STATUS, UPDATE_ADDRESS } from "../types/types";
import { address } from "../ApiServices/index";

export const getAddress = () => async (dispatch) => {
    dispatch({ type: SET_LOAD_ADDRESS_PROCESS, payload: true });
    try {
        let res = await address.getaddresss();
        if (res.data && res.code == 200) {
            dispatch({ type: SET_LOAD_ADDRESS, payload: res.data.items });
            dispatch({ type: SET_LOAD_ADDRESS_STATUS, payload: 'ok' });
        } else {
            dispatch({ type: SET_LOAD_ADDRESS_STATUS, payload: 'fail' });
        }
        dispatch({ type: SET_LOAD_ADDRESS_PROCESS, payload: false });
    } catch (error) {
        dispatch({ type: SET_LOAD_ADDRESS_STATUS, payload: 'fail' });
        dispatch({ type: SET_LOAD_ADDRESS_PROCESS, payload: false });
    }
}

export const addAddress = (body, done) => async (dispatch) => {
    dispatch({ type: SET_LOAD_ADDRESS_PROCESS, payload: true });
    try {
        let res = await address.addAddress(body);
        if (res.data && res.code == 200) {
            dispatch({ type: SET_ADD_ADDRESS, payload: res.data });
            dispatch({ type: SET_LOAD_ADDRESS_STATUS, payload: 'ok' });
            done(true);
        } else {
            done(false);
            dispatch({ type: SET_LOAD_ADDRESS_STATUS, payload: 'fail' });
        }
        dispatch({ type: SET_LOAD_ADDRESS_PROCESS, payload: false });
    } catch (error) {
        done(false);
        dispatch({ type: SET_LOAD_ADDRESS_STATUS, payload: 'fail' });
        dispatch({ type: SET_LOAD_ADDRESS_PROCESS, payload: false });
    }
}

export const updateAddress = (body, done) => async (dispatch) => {
    dispatch({ type: SET_LOAD_ADDRESS_PROCESS, payload: true });
    try {
        let res = await address.updateAddress(body);
        if (res.data && res.code == 200) {
            dispatch({ type: UPDATE_ADDRESS, payload: res.data });
            dispatch({ type: SET_LOAD_ADDRESS_STATUS, payload: 'ok' });
            done(true);
        } else {
            done(false);
            dispatch({ type: SET_LOAD_ADDRESS_STATUS, payload: 'fail' });
        }
        dispatch({ type: SET_LOAD_ADDRESS_PROCESS, payload: false });
    } catch (error) {
        done(false);
        dispatch({ type: SET_LOAD_ADDRESS_STATUS, payload: 'fail' });
        dispatch({ type: SET_LOAD_ADDRESS_PROCESS, payload: false });
    }
}





