import { cart } from "../ApiServices/index";
import { SET_LOAD_CART_PROCESS, SET_LOAD_CART_DATA, SET_LOAD_CART_STATUS, ADD_TO_CART, ADD_NEW_CART, UPDATE_CART, DEL_CART_ITEM, CLEAR_CART, SET_CHARGES } from "../types/types";

export const GetCartForUser = () => async (dispatch) => {
    setTimeout(() => {
        dispatch({ type: SET_LOAD_CART_PROCESS, payload: true });
    }, 0);
    try {
        let res = await cart.getCartForUsers();
        if (res.data && res.code === 200) {
            if (res.data.items.length > 0) {
                dispatch({ type: SET_LOAD_CART_DATA, payload: res.data.items[0].prods });
            }
            dispatch({ type: SET_LOAD_CART_STATUS, payload: 'ok' });
        } else {
            dispatch({ type: SET_LOAD_CART_STATUS, payload: 'fail' });
        }
        dispatch({ type: SET_LOAD_CART_PROCESS, payload: false });
    } catch (error) {
        dispatch({ type: SET_LOAD_CART_STATUS, payload: 'fail' });
        dispatch({ type: SET_LOAD_CART_PROCESS, payload: false });
    }
}


export const AddToCart = (body, cartprod, done) => async (dispatch) => {
    dispatch({ type: SET_LOAD_CART_PROCESS, payload: true });
    try {
        let res = await cart.addToCart(body);
        if (res.data && res.code === 200 && res.data.prods) {
            dispatch({ type: SET_LOAD_CART_STATUS, payload: 'ok' });
            dispatch({ type: ADD_NEW_CART, payload: { ...cartprod, _id: res.data.prods[res.data.prods.length - 1]._id } });
        } else {
            dispatch({ type: SET_LOAD_CART_STATUS, payload: 'fail' });
        }
        dispatch({ type: SET_LOAD_CART_PROCESS, payload: false });
        done(res);
    } catch (error) {
        done(error);
        dispatch({ type: SET_LOAD_CART_STATUS, payload: 'fail' });
        dispatch({ type: SET_LOAD_CART_PROCESS, payload: false });
    }
}

export const clearCart = (done) => async (dispatch) => {
    dispatch({ type: SET_LOAD_CART_PROCESS, payload: true });
    try {
        let res = await cart.clearCart();
        if (res.code === 200) {
            dispatch({ type: SET_LOAD_CART_STATUS, payload: 'ok' });
            dispatch({ type: CLEAR_CART, payload: [] });
            done(true, res);
        } else {
            dispatch({ type: SET_LOAD_CART_STATUS, payload: 'fail' });
            done(false, res);
        }
        dispatch({ type: SET_LOAD_CART_PROCESS, payload: false });
    } catch (error) {
        done(false, error);
        dispatch({ type: SET_LOAD_CART_STATUS, payload: 'fail' });
        dispatch({ type: SET_LOAD_CART_PROCESS, payload: false });
    }
}



export const UpdateCart = (body) => async (dispatch) => {
    dispatch({ type: SET_LOAD_CART_PROCESS, payload: true });
    try {
        let res = await cart.UpdateCart(body);
        if (res.data && res.code === 200) {
            dispatch({ type: SET_LOAD_CART_STATUS, payload: 'ok' });
            dispatch({ type: UPDATE_CART, payload: body });
        } else {
            dispatch({ type: SET_LOAD_CART_STATUS, payload: 'fail' });
        }
        dispatch({ type: SET_LOAD_CART_PROCESS, payload: false });
    } catch (error) {
        dispatch({ type: SET_LOAD_CART_STATUS, payload: 'fail' });
        dispatch({ type: SET_LOAD_CART_PROCESS, payload: false });
    }
}

export const deleteCart = (body) => async (dispatch) => {
    dispatch({ type: SET_LOAD_CART_PROCESS, payload: true });
    try {
        let res = await cart.deleteCart(body);
        if (res.code === 200) {
            dispatch({ type: SET_LOAD_CART_STATUS, payload: 'ok' });
            dispatch({ type: DEL_CART_ITEM, payload: body });
        } else {
            dispatch({ type: SET_LOAD_CART_STATUS, payload: 'fail' });
        }
        dispatch({ type: SET_LOAD_CART_PROCESS, payload: false });
    } catch (error) {
        dispatch({ type: SET_LOAD_CART_STATUS, payload: 'fail' });
        dispatch({ type: SET_LOAD_CART_PROCESS, payload: false });
    }
}

export const getCharges = () => async (dispatch) => {
    dispatch({ type: SET_LOAD_CART_PROCESS, payload: true });
    try {
        let { code, data = [{}] } = await cart.getCharges();
        if (code === 200) {
            dispatch({ type: SET_LOAD_CART_STATUS, payload: 'ok' });
            dispatch({ type: SET_CHARGES, payload: data[0] });
        } else {
            dispatch({ type: SET_LOAD_CART_STATUS, payload: 'fail' });
        }
        dispatch({ type: SET_LOAD_CART_PROCESS, payload: false });
    } catch (error) {
        dispatch({ type: SET_LOAD_CART_STATUS, payload: 'fail' });
        dispatch({ type: SET_LOAD_CART_PROCESS, payload: false });
    }
}








