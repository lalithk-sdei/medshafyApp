import { SET_LOAD_PROD_DATA, SET_LOAD_PROD_PROCESS, SET_LOAD_PROD_STATUS } from "../types/types";
import { products } from "../ApiServices/index";

export const GetProducts = (body) => async (dispatch) => {
    dispatch({ type: SET_LOAD_PROD_PROCESS, payload: true });
    try {
        let res = await products.getProducts(body);
        if (res.data) {
            dispatch({ type: SET_LOAD_PROD_DATA, payload: res.data });
            dispatch({ type: SET_LOAD_PROD_STATUS, payload: 'ok' });
        } else {
            dispatch({ type: SET_LOAD_PROD_STATUS, payload: 'fail' });
        }
        dispatch({ type: SET_LOAD_PROD_PROCESS, payload: false });
    } catch (error) {
        dispatch({ type: SET_LOAD_PROD_STATUS, payload: 'fail' });
        dispatch({ type: SET_LOAD_PROD_PROCESS, payload: false });
    }
}





