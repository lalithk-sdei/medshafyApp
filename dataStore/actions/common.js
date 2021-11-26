import { SET_LANG } from "../types/types";
// import { announcments } from "../ApiServices/index";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLang = (done = () => { }) => async (dispatch) => {
    const data = await AsyncStorage.getItem('userLang');
    if (data) {
        dispatch({ type: SET_LANG, payload: { lang: data } });
        setTimeout(() => { done(data); }, 0);
    } else {

    }
}


export const updateLang = (lang) => async (dispatch) => {
    const data = await AsyncStorage.setItem('userLang', lang);
    dispatch({ type: SET_LANG, payload: { lang: lang } });
}







