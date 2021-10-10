import { fav } from "../ApiServices/index";
import { SET_LOAD_FAV_DATA, SET_LOAD_FAV_PROCESS, SET_LOAD_FAV_STATUS } from "../types/types";

export const GetFavForUser = () => async (dispatch) => {
    setTimeout(() => {
        dispatch({ type: SET_LOAD_FAV_PROCESS, payload: true });
    }, 0);
    try {
        let res = await fav.getFavUser();
        if (res.data && res.code === 200) {
            dispatch({ type: SET_LOAD_FAV_DATA, payload: res.data.items });
            dispatch({ type: SET_LOAD_FAV_STATUS, payload: 'ok' });
        } else {
            dispatch({ type: SET_LOAD_FAV_STATUS, payload: 'fail' });
        }
        dispatch({ type: SET_LOAD_FAV_PROCESS, payload: false });
    } catch (error) {
        dispatch({ type: SET_LOAD_FAV_STATUS, payload: 'fail' });
        dispatch({ type: SET_LOAD_FAV_PROCESS, payload: false });
    }
}


export const addtoFav = (body, done) => async (dispatch) => {
    dispatch({ type: SET_LOAD_FAV_PROCESS, payload: true });
    try {
        let res = await fav.addtoFav(body);
        if (res.data && res.code === 200) {
            done();
            dispatch({ type: SET_LOAD_FAV_STATUS, payload: 'ok' });
        } else {
            dispatch({ type: SET_LOAD_FAV_STATUS, payload: 'fail' });
        }
        dispatch({ type: SET_LOAD_FAV_PROCESS, payload: false });
    } catch (error) {
        dispatch({ type: SET_LOAD_FAV_STATUS, payload: 'fail' });
        dispatch({ type: SET_LOAD_FAV_PROCESS, payload: false });
    }
}

export const renoveFav = (prodId, userId, done) => async (dispatch) => {
    dispatch({ type: SET_LOAD_FAV_PROCESS, payload: true });
    try {
        let res = await fav.renoveFav(prodId, userId);
        if (res.data && res.code === 200) {
            done();
            dispatch({ type: SET_LOAD_FAV_STATUS, payload: 'ok' });
        } else {
            dispatch({ type: SET_LOAD_FAV_STATUS, payload: 'fail' });
        }
        dispatch({ type: SET_LOAD_FAV_PROCESS, payload: false });
    } catch (error) {
        dispatch({ type: SET_LOAD_FAV_STATUS, payload: 'fail' });
        dispatch({ type: SET_LOAD_FAV_PROCESS, payload: false });
    }
}





