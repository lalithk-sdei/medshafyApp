import { REGISTER_USER, SET_CHANGEPASS_PROCESS, SET_CHNAGPASS_STATUS, SET_LOGIN_PROCESS, SET_LOGIN_STATUS, SET_LOGOUT, SET_OTPSEND_PROCESS, SET_OTPSEND_STATUS, SET_OTPVERFY_PROCESS, SET_OTPVERFY_STATUS, SET_SIGNUP_PROCESS, SET_SIGNUP_STATUS, SET_TOKEN, SET_USER_DATA, SET_USER_DATA_MANUAL } from "../types/types";
import { users } from "../ApiServices/index";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const uploadStoredoc = (body, done) => async (dispatch) => {
    dispatch({ type: SET_SIGNUP_PROCESS, payload: true });
    try {
        let res = await users.uploadShopDocs(body);
        if (res) { done(res); } else { done(res); };
    } catch (error) {
        done(error);
    }
}

export const registerUser = (body) => async (dispatch) => {
    dispatch({ type: SET_SIGNUP_PROCESS, payload: true });
    try {
        let res = await users.registerUser(body);
        if (res.data && res.code === 200) {
            dispatch(login({ email: body.email, password: body.password }));
            dispatch({ type: SET_SIGNUP_STATUS, payload: 'ok' });
        } else {
            dispatch({ type: SET_SIGNUP_STATUS, payload: 'fail' });
        }
        dispatch({ type: SET_SIGNUP_PROCESS, payload: false });
    } catch (error) {
        dispatch({ type: SET_SIGNUP_STATUS, payload: 'fail' });
        dispatch({ type: SET_SIGNUP_PROCESS, payload: false });
    }
}


export const getMe = (token, clbak = () => { }) => async (dispatch) => {
    dispatch({ type: SET_LOGIN_PROCESS, payload: true });
    dispatch({ type: SET_TOKEN, payload: token });
    try {
        let res = await users.getme();
        if (res.data && res.code === 200) {
            dispatch({ type: SET_USER_DATA_MANUAL, payload: res.data });
            dispatch({ type: SET_LOGIN_STATUS, payload: 'ok' });
            clbak(true);
            dispatch({ type: SET_LOGIN_PROCESS, payload: false });
        } else {
            dispatch({ type: SET_LOGOUT });
            clbak(false);
            dispatch({ type: SET_LOGIN_PROCESS, payload: false });
        }
    } catch (error) {
        dispatch({ type: SET_LOGOUT });
        clbak(false);
        dispatch({ type: SET_LOGIN_PROCESS, payload: false });
    }
}


export const login = (body) => async (dispatch) => {
    dispatch({ type: SET_LOGIN_PROCESS, payload: true });
    try {
        let res = await users.login(body);
        if (res.data && res.code === 200) {
            dispatch(getMe(res.data.token, async (val) => {
                if (val) {
                    dispatch({ type: SET_USER_DATA, payload: res.data });
                    dispatch({ type: SET_LOGIN_STATUS, payload: 'ok' });
                    await AsyncStorage.setItem('loggedin', `yes`);
                    await AsyncStorage.setItem('token', res.data.token);
                } else {
                    dispatch({ type: SET_LOGIN_STATUS, payload: 'fail' });
                }
            }));
        } else {
            dispatch({ type: SET_LOGIN_STATUS, payload: 'fail' });
        }
        dispatch({ type: SET_SIGNUP_PROCESS, payload: false });
        dispatch({ type: SET_LOGIN_PROCESS, payload: false });
    } catch (error) {
        dispatch({ type: SET_LOGIN_STATUS, payload: 'fail' });
        dispatch({ type: SET_SIGNUP_PROCESS, payload: false });
        dispatch({ type: SET_LOGIN_PROCESS, payload: false });
    }
}

export const setToken = (token) => async (dispatch) => {
    dispatch({ type: SET_TOKEN, payload: token });
}





export const ForgotSendOpt = (body) => async (dispatch) => {
    dispatch({ type: SET_OTPSEND_PROCESS, payload: true });
    try {
        let res = await users.ForgotSendOpt(body);
        if (res.code == 200) {
            dispatch({ type: SET_OTPSEND_STATUS, payload: 'ok' });
        } else {
            dispatch({ type: SET_OTPSEND_STATUS, payload: 'fail' });
        }
        dispatch({ type: SET_OTPSEND_PROCESS, payload: false });
    } catch (error) {
        dispatch({ type: SET_OTPSEND_PROCESS, payload: false });
        dispatch({ type: SET_OTPSEND_STATUS, payload: 'fail' });
    }
}

export const validateOTP = (body) => async (dispatch) => {
    dispatch({ type: SET_OTPVERFY_PROCESS, payload: true });
    try {
        let res = await users.validateOPT(body);
        if (res.code == 200) {
            dispatch({ type: SET_OTPVERFY_STATUS, payload: 'ok' });
        } else {
            dispatch({ type: SET_OTPVERFY_STATUS, payload: 'fail' });
        }
        dispatch({ type: SET_OTPVERFY_PROCESS, payload: false });
    } catch (error) {
        dispatch({ type: SET_OTPVERFY_PROCESS, payload: false });
        dispatch({ type: SET_OTPVERFY_STATUS, payload: 'fail' });
    }
}


export const chnagepassword = (body) => async (dispatch) => {
    dispatch({ type: SET_CHANGEPASS_PROCESS, payload: true });
    try {
        let res = await users.chnagePassword(body);
        if (res.code == 200) {
            dispatch({ type: SET_CHNAGPASS_STATUS, payload: 'ok' });
        } else {
            dispatch({ type: SET_CHNAGPASS_STATUS, payload: 'fail' });
        }
        dispatch({ type: SET_CHANGEPASS_PROCESS, payload: false });
    } catch (error) {
        dispatch({ type: SET_CHANGEPASS_PROCESS, payload: false });
        dispatch({ type: SET_CHNAGPASS_STATUS, payload: 'fail' });
    }
}