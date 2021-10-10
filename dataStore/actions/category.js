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





