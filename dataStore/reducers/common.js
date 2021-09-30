import { SET_LANG } from "../types/types";



const initialData = {
    lang: null,
};

export default function (state = initialData, action) {
    switch (action.type) {
        case SET_LANG:
            return { ...state, ...action.payload };
        default:
            return state
    }
}