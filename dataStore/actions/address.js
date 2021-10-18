import { RESET_DATA, SET_ADD_ADDRESS, SET_LOAD_ADDRESS, SET_LOAD_ADDRESS_PROCESS, SET_LOAD_ADDRESS_STATUS } from "../types/types";
import { address } from "../ApiServices/index";

export const getAddress = (body) => async (dispatch) => {
    dispatch({ type: SET_LOAD_ADDRESS_PROCESS, payload: true });
    try {
        let res = await address.getAddress(body);
        if (res.data) {
            dispatch({ type: SET_LOAD_ADDRESS, payload: res.data });
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

export const addAddress = (body,done) => async (dispatch) => {
    dispatch({ type: SET_LOAD_ADDRESS_PROCESS, payload: true });
    try {
        setTimeout(() => {
            // let res = await address.getAddress(body);
            // if (res.data) {
            dispatch({ type: SET_ADD_ADDRESS, payload: body });
            dispatch({ type: SET_LOAD_ADDRESS_STATUS, payload: 'ok' });
            // } else {
            //     dispatch({ type: SET_LOAD_ADDRESS_STATUS, payload: 'fail' });
            // }
            dispatch({ type: SET_LOAD_ADDRESS_PROCESS, payload: false });
            done();
        }, 3000);
    } catch (error) {
        dispatch({ type: SET_LOAD_ADDRESS_STATUS, payload: 'fail' });
        dispatch({ type: SET_LOAD_ADDRESS_PROCESS, payload: false });
        done();
    }
}





