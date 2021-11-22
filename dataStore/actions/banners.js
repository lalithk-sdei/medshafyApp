import { SET_BANNERS, SET_LOAD_BANNERS_PROCESS, SET_LOAD_BANNERS_STATUS } from "../types/types";
import { banners } from "../ApiServices/index";

export const getBanners = () => async (dispatch) => {
    dispatch({ type: SET_LOAD_BANNERS_PROCESS, payload: true });
    try {
        let { code, data = { items: [] } } = await banners.getbanners();
        if (code == 200) {
            dispatch({ type: SET_BANNERS, payload: data.items });
            dispatch({ type: SET_LOAD_BANNERS_STATUS, payload: 'ok' });
        } else {
            dispatch({ type: SET_LOAD_BANNERS_STATUS, payload: 'fail' });
        }
        dispatch({ type: SET_LOAD_BANNERS_PROCESS, payload: false });
    } catch (error) {
        console.log(error);
        dispatch({ type: SET_LOAD_BANNERS_STATUS, payload: 'fail' });
        dispatch({ type: SET_LOAD_BANNERS_PROCESS, payload: false });
    }
}