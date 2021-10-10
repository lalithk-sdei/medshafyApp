import { RESET_DATA, SET_LOAD_CAT_DATA, SET_LOAD_CAT_PROCESS, SET_LOAD_CAT_STATUS, SET_LOAD_FAV_DATA, SET_LOAD_FAV_PROCESS, SET_LOAD_FAV_STATUS } from "../types/types";

const initialData = {
    favprocess: false,
    favStatus: '',
    favData: [],
    random: 0
};

export default function (state = initialData, action) {
    switch (action.type) {
        case SET_LOAD_FAV_PROCESS:
            return { ...state, favprocess: action.payload };
        case SET_LOAD_FAV_STATUS:
            return { ...state, favStatus: action.payload, random: Math.random() };
        case SET_LOAD_FAV_DATA:
            return { ...state, favData: action.payload };
        case  RESET_DATA:
            return initialData;
        default:
            return state;
    }
}