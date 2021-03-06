import { combineReducers } from "redux";
import common from "./common";
import user from "./user";
import category from "./categories";
import prod from "./prod";
import fav from "./fav";
import address from "./address";
import cart from "./cart";
import orders from "./orders";
import banners from "./banners";

export default combineReducers({
    common: common,
    user: user,
    category: category,
    prod: prod,
    fav: fav,
    address: address,
    cart: cart,
    order: orders,
    banners: banners
});