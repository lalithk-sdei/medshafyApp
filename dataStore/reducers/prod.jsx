import { RESET_DATA, SET_LOAD_PROD_DATA, SET_LOAD_PROD_PROCESS, SET_LOAD_PROD_STATUS } from "../types/types";

const initialData = {
    Prodprocess: false,
    ProdStatus: '',
    ProdData: [],
    random: 0
};

export default function (state = initialData, action) {
    switch (action.type) {
        case SET_LOAD_PROD_PROCESS:
            return { ...state, Prodprocess: action.payload };
        case SET_LOAD_PROD_STATUS:
            return { ...state, ProdStatus: action.payload, random: 0 };
        case SET_LOAD_PROD_DATA:
            return { ...state, ProdData: action.payload };
        case RESET_DATA:
            return initialData;
        default:
            return state;
    }
}