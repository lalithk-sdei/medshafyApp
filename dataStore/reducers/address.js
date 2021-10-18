import { RESET_DATA, SET_ADD_ADDRESS, SET_LOAD_ADDRESS, SET_LOAD_ADDRESS_PROCESS, SET_LOAD_ADDRESS_STATUS } from "../types/types";

const initialData = {
    addressprocess: false,
    addressStatus: '',
    address: [],
    random: 0
};

export default function (state = initialData, action) {
    switch (action.type) {
        case SET_LOAD_ADDRESS_PROCESS:
            return { ...state, addressprocess: action.payload };
        case SET_LOAD_ADDRESS_STATUS:
            return { ...state, addressStatus: action.payload, random: 0 };
        case SET_LOAD_ADDRESS:
            return { ...state, address: action.payload };
        case SET_ADD_ADDRESS:
            return { ...state, address: [...state.address, action.payload] };
        case RESET_DATA:
            return initialData;
        default:
            return state;
    }
}