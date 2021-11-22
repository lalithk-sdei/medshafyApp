import { RESET_DATA, SET_BANNERS, SET_LOAD_BANNERS_PROCESS, SET_LOAD_BANNERS_STATUS } from "../types/types";
const initialData = {
    bannersprocess: false,
    bannersStatus: '',
    banners: [],
    random: 0
};

export default function (state = initialData, action) {
    switch (action.type) {
        case SET_LOAD_BANNERS_PROCESS:
            return { ...state, bannersprocess: action.payload };
        case SET_LOAD_BANNERS_STATUS:
            return { ...state, bannersStatus: action.payload, random: 0 };
        case SET_BANNERS:
            return { ...state, banners: action.payload };
        case RESET_DATA:
            return initialData;
        default:
            return state;
    }
}