import { GET_ANNOUNCMNTS } from "../types/types";

const initialData = {
    announcementfilters: null,
    announcements: [],
    pageLoading: false
};

export default function (state = initialData, action) {
    switch (action.type) {
        case GET_ANNOUNCMNTS:
            return { ...state, ...action.payload };
        default:
            return state
    }
}