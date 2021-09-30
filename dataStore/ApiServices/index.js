import axios from "axios";
import routes from "./routes.js";
var httpInstance = axios.create({ baseURL: routes.baseUrl });


// Intercepter for every request appending headers here
httpInstance.interceptors.request.use(
    (config) => {
        // config.headers["Content-Type"] = 'application/json';
        // config.headers["acesstoken"] = localStorage.getItem("AObj") || "null";
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
);

// Add a response interceptor
// httpInstance.interceptors.response.use((response) => {
//     if (response.data) {
//         return { ...response.data };
//     } else {
//         return null;
//     }
// }, (error) => {
//     return Promise.reject({ status: false });
// });

const requests = {
    get: (url) => httpInstance.get(url),
    // post: (url, body) => httpInstance.post(url, body),
    post: (url, body) => httpInstance.get(url),
};

export const stories = {
    getStories: () => requests.get(routes.baseUrl + routes.stories + routes.end),
    getAllStories: () => requests.get(routes.baseUrl + routes.getAllStories + routes.end),
}

export const leaderCorner = {
    getLeaderCorner: () => requests.get(routes.baseUrl + routes.getLeaderCorner + routes.end),
}


export const quickWish = {
    getQuickWish: () => requests.get(routes.baseUrl + routes.getQuickWish + routes.end),
}

export const announcments = {
    getAnnouncments: () => requests.get(routes.baseUrl + routes.getAnnouncments + routes.end),
}

export const workSpace = {
    getWorkSpace: () => requests.get(routes.baseUrl + routes.getWorkSpace + routes.end),
}


export const getInTouch = {
    getContact: (id) => requests.get(routes.baseUrl + routes.getHrContact(id) + routes.end),
}