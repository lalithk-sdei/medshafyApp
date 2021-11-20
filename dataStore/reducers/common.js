import { RESET_DATA, SET_LANG } from "../types/types";



const initialData = {
    lang: 'en',
};

export default function (state = initialData, action) {
    switch (action.type) {
        case SET_LANG:
            return { ...state, ...action.payload };
        case RESET_DATA:
            return initialData;
        default:
            return state
    }
}