import { RESET_DATA, SET_LOAD_ORDERS_STATUS, SET_LOAD_ORDERS, SET_LOAD_ORDERS_PROCESS, SET_ADD_ORDERS, SET_LOAD_BUYAGAIN } from "../types/types";

const initialData = {
    ordersprocess: false,
    ordersStatus: '',
    orders: [],
    buyAgain: [],
    random: 0
};

export default function (state = initialData, action) {
    switch (action.type) {
        case SET_LOAD_ORDERS_PROCESS:
            return { ...state, ordersprocess: action.payload };
        case SET_LOAD_ORDERS_STATUS:
            return { ...state, ordersStatus: action.payload, random: 0 };
        case SET_LOAD_ORDERS:
            return { ...state, orders: action.payload };
        case SET_LOAD_BUYAGAIN:
            const d = [];
            try {
                action.payload.map((E) => {
                    E.prods.map((p) => {
                        d.push(p.prodId);
                    })
                })
            } catch (e) { }
            return { ...state, buyAgain: d.filter((e, i, arr) => arr.findIndex((t) => t._id == e._id) === i) };
        case SET_ADD_ORDERS:
            return { ...state, orders: [...state.orders, action.payload] };
        case RESET_DATA:
            return initialData;
        default:
            return state;
    }
}