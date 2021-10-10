import { RESET_DATA, SET_LOAD_CAT_DATA, SET_LOAD_CAT_PROCESS, SET_LOAD_CAT_STATUS } from "../types/types";

const initialData = {
    Catprocess: false,
    CatStatus: '',
    CatData: [],
    random: 0
};

export default function (state = initialData, action) {
    switch (action.type) {
        case SET_LOAD_CAT_PROCESS:
            return { ...state, Catprocess: action.payload };
        case SET_LOAD_CAT_STATUS:
            return { ...state, CatStatus: action.payload, random: 0 };
        case SET_LOAD_CAT_DATA:
            return { ...state, CatData: action.payload };
        case RESET_DATA:
            return initialData;
        default:
            return state;
    }
}