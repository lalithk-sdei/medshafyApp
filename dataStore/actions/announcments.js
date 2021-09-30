import { GET_ANNOUNCMNTS } from "../types/types";
import { announcments } from "../ApiServices/index";

export const GetAnnouncments = () => async (dispatch) => {
    const { data = null } = await announcments.getAnnouncments();
    if (data) {
        dispatch({ type: GET_ANNOUNCMNTS, payload: data });
    } else {

    }
}





