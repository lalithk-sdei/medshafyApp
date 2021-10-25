import { SET_LOAD_CART_PROCESS, SET_LOAD_CART_DATA, SET_LOAD_CART_STATUS, RESET_DATA, ADD_TO_CART, ADD_NEW_CART, UPDATE_CART, DEL_CART_ITEM, CLEAR_CART } from "../types/types";
const initialData = {
    cartprocess: false,
    cartStatus: '',
    cartData: [],
    random: 0
};

export default function (state = initialData, action) {
    switch (action.type) {
        case SET_LOAD_CART_PROCESS:
            return { ...state, cartprocess: action.payload };
        case SET_LOAD_CART_STATUS:
            return { ...state, cartStatus: action.payload, random: Math.random() };
        case SET_LOAD_CART_DATA:
            return { ...state, cartData: action.payload };
        case ADD_NEW_CART:
            return { ...state, cartData: [...state.cartData, action.payload] };
        case CLEAR_CART:
            return { ...state, cartData: [] };
        case UPDATE_CART:
            try {
                let cart = state.cartData;
                cart[cart.findIndex(e => e._id == action.payload.docId)].qty = action.payload.prods.qty
                return { ...state, cartData: cart };
            } catch (e) {
                return state;
            }
        case DEL_CART_ITEM:
            return { ...state, cartData: state.cartData.filter((e) => e._id != action.payload.docId) };
        case RESET_DATA:
            return initialData;
        default:
            return state;
    }
}