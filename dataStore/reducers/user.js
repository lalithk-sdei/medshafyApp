import { REGISTER_USER, RESET_DATA, SET_CHANGEPASS_PROCESS, SET_CHNAGPASS_STATUS, SET_CHNAGPASS_STATUS_ONCE, SET_LOGIN_PROCESS, SET_LOGIN_STATUS, SET_LOGOUT, SET_OTPSEND_PROCESS, SET_OTPSEND_STATUS, SET_OTPVERFY_PROCESS, SET_OTPVERFY_STATUS, SET_OTPVERFY_STATUS_ONCE, SET_SIGNUP_PROCESS, SET_SIGNUP_STATUS, SET_TOKEN, SET_USER_DATA, SET_USER_DATA_MANUAL } from "../types/types";
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialData = {
    signUpProcess: false,
    otpSendProcess: false,
    signUpStatus: '',
    loginprocess: false,
    loginStatus: '',
    OtpState: '',
    loggedinUserData: {},
    token: '',
    loggedin: false,
    random: 0,
    otpVerifyProcess: false,
    otpVerifyStatus: '',
    ChangepassProcess: false,
    ChangepasStatus: '',
};

const removelocal = async () => {
    await AsyncStorage.removeItem('userLang');
    await AsyncStorage.removeItem('loggedin');
    await AsyncStorage.removeItem('token');
}

export default function (state = initialData, action) {
    switch (action.type) {
        case SET_CHANGEPASS_PROCESS:
            return { ...state, ChangepassProcess: action.payload };
        case SET_TOKEN:
            return { ...state, token: action.payload };
        case SET_CHNAGPASS_STATUS:
            return { ...state, ChangepasStatus: action.payload, random: Math.random() };
        case SET_CHNAGPASS_STATUS_ONCE:
            return { ...state, ChangepasStatus: action.payload };
        case SET_OTPVERFY_PROCESS:
            return { ...state, otpVerifyProcess: action.payload };
        case SET_OTPVERFY_STATUS:
            return { ...state, otpVerifyStatus: action.payload, random: Math.random() };
        case SET_OTPVERFY_STATUS_ONCE:
            return { ...state, otpVerifyStatus: action.payload };
        case SET_SIGNUP_PROCESS:
            return { ...state, signUpProcess: action.payload };
        case SET_OTPSEND_STATUS:
            return { ...state, OtpState: action.payload, random: Math.random() };
        case SET_OTPSEND_PROCESS:
            return { ...state, otpSendProcess: action.payload };
        case SET_LOGIN_PROCESS:
            return { ...state, loginprocess: action.payload };
        case SET_USER_DATA:
            return { ...state, loggedin: true, token: action.payload.token };
        case SET_USER_DATA_MANUAL:
            return { ...state, loggedinUserData: action.payload, loggedin: true };
        case SET_SIGNUP_STATUS:
            return { ...state, signUpStatus: action.payload, random: Math.random() };
        case SET_LOGIN_STATUS:
            return { ...state, loginStatus: action.payload, random: Math.random() };
        case SET_LOGOUT:
            removelocal();
            return { ...state, loginStatus: '', random: Math.random(), loggedin: false, loggedinUserData: {}, token: '', };
        case RESET_DATA:
            return initialData;
        default:
            return state;
    }
} 