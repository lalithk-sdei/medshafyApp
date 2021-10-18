import { SET_LOAD_CAT_DATA, SET_LOAD_CAT_PROCESS, SET_LOAD_CAT_STATUS } from "../types/types";
import { categories } from "../ApiServices/index";

export const GetCategories = (body) => async (dispatch) => {
    dispatch({ type: SET_LOAD_CAT_PROCESS, payload: true });
    try {
        let res = await categories.getCategories(body);
        if (res.data) {
            dispatch({ type: SET_LOAD_CAT_DATA, payload: res.data });
            dispatch({ type: SET_LOAD_CAT_STATUS, payload: 'ok' });
        } else {
            dispatch({ type: SET_LOAD_CAT_STATUS, payload: 'fail' });
        }
        dispatch({ type: SET_LOAD_CAT_PROCESS, payload: false });
    } catch (error) {
        dispatch({ type: SET_LOAD_CAT_STATUS, payload: 'fail' });
        dispatch({ type: SET_LOAD_CAT_PROCESS, payload: false });
    }
}

export const sendSpecialOrder = (body, done) => async (dispatch) => {
    console.log(body);
    dispatch({ type: SET_LOAD_CAT_PROCESS, payload: true });
    try {
        let res = await categories.specialOrder(body);
        console.log(res);
        if (res.data) {
            done();
            dispatch({ type: SET_LOAD_CAT_STATUS, payload: 'ok' });
        } else {
            done();
            dispatch({ type: SET_LOAD_CAT_STATUS, payload: 'fail' });
        }
        dispatch({ type: SET_LOAD_CAT_PROCESS, payload: false });
    } catch (error) {
        console.log(error);
        dispatch({ type: SET_LOAD_CAT_STATUS, payload: 'fail' });
        dispatch({ type: SET_LOAD_CAT_PROCESS, payload: false });
        done();
    }
}





