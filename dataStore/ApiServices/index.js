import axios from "axios";
import store from "../store.js";
import routes from "./routes.js";
var httpInstance = axios.create({});


// Intercepter for every request appending headers here
httpInstance.interceptors.request.use(
    (config) => {
        try {
            config.headers["Content-Type"] = 'application/json';
            config.headers["Authorization"] = `Bearer ${store.getState().user.token}`;
            return config;
        } catch (e) {
            config.headers["Content-Type"] = 'application/json';
            return config;
        }
    },
    (error) => {
        return Promise.reject(error)
    }
);
// Add a response interceptor
httpInstance.interceptors.response.use((response) => {
    return response.data;
}, ({ response }) => {
    let { data = null } = response;
    return Promise.resolve(data);
});

const requests = {
    get: (url) => httpInstance.get(url),
    delete: (url, body) => httpInstance.delete(url),
    post: (url, body) => httpInstance.post(url, body),
    put: (url, body) => httpInstance.put(url, body),
    postImages: (url, body) => httpInstance.post(url, body, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        }
    }),
};



export const users = {
    login: (body) => requests.post(`${routes.baseUrl}${routes.login}`, body),
    registerUser: (body) => requests.post(`${routes.baseUrl}${routes.registerUser}`, body),
    uploadShopDocs: (body) => requests.postImages(`${routes.baseUrl}${routes.uploadShopDocs}`, body),
    ForgotSendOpt: (body) => requests.post(`${routes.baseUrl}${routes.ForgotSendOpt}`, body),
    validateOPT: (body) => requests.post(`${routes.baseUrl}${routes.validateOPT}`, body),
    chnagePassword: (body) => requests.post(`${routes.baseUrl}${routes.chnagePassword}`, body),
    getme: () => requests.get(`${routes.baseUrl}${routes.me}`),
    updateuser: (body) => requests.put(`${routes.baseUrl}${routes.updateuser}`, body),
}


export const categories = {
    getCategories: () => requests.get(`${routes.baseUrl}${routes.getCategories}`),
    specialOrder: (body) => requests.post(`${routes.baseUrl}${routes.specialOrder}`, body),
}

export const address = {
    getaddresss: () => requests.get(`${routes.baseUrl}${routes.getaddresss}`),
    addAddress: (body) => requests.post(`${routes.baseUrl}${routes.addAddress}`, body),
    updateAddress: (body) => requests.put(`${routes.baseUrl}${routes.updateaddress}`, body),
}


export const fav = {
    getFavUser: () => requests.get(`${routes.baseUrl}${routes.getFavUser(store.getState().user.loggedinUserData._id)}`),
    addtoFav: (body) => requests.post(`${routes.baseUrl}${routes.addToFav}`, body),
    renoveFav: (ProdId, userId) => requests.delete(`${routes.baseUrl}${routes.renoveFav(ProdId, userId)}`),
}

export const cart = {
    getCartForUsers: () => requests.get(`${routes.baseUrl}${routes.getCartForUsers(store.getState().user.loggedinUserData._id)}`),
    addToCart: (body) => requests.post(`${routes.baseUrl}${routes.addtocartnew}`, body),
    UpdateCart: (body) => requests.put(`${routes.baseUrl}${routes.updateCart}`, body),
    deleteCart: (body) => requests.post(`${routes.baseUrl}${routes.deleteCart}`, body),
    clearCart: () => requests.post(`${routes.baseUrl}${routes.clearCart}`, {}),
}

export const orders = {
    getorders: () => requests.get(`${routes.baseUrl}${routes.getOrders}`),
    createOrder: (body) => requests.post(`${routes.baseUrl}${routes.createOrder}`, body),
}


export const products = {
    getProducts: ({ cat = "", search = "" }) => requests.get(`${routes.baseUrl}${routes.getProducts(cat, search)} `),
}