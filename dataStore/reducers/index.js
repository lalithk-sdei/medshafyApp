import { combineReducers } from "redux";
import common from "./common";
import user from "./user";
import category from "./categories";
import prod from "./prod";
import fav from "./fav";
import address from "./address";

export default combineReducers({
    common: common,
    user: user,
    category: category,
    prod: prod,
    fav: fav,
    address: address,
});