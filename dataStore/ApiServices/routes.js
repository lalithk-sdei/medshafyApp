export default {
    baseUrl: 'http://54.201.160.69:3142/',
    end: '',
    // users
    login: 'v1/auth/login',
    registerUser: 'v1/registerusers',
    uploadShopDocs: 'v1/shops/register/document',
    ForgotSendOpt: 'v1/auth/forgot_via_phone',
    validateOPT: 'v1/auth/otpVerifyph',
    chnagePassword: 'v1/auth/passwordResetapp',
    me: 'v1/users/me',

    // Categories
    getCategories: 'v1/products/categories/tree',
    specialOrder: 'v1/addsplOrder',

    // products
    getProducts: (cat = "", search = "") => `v1/products/search?q=${search}&sort=createdAt&sortType=desc&categoryId=${cat}`,


    // Favorites
    getFavUser: (userID) => `v1/getFavs/${userID}`,
    addToFav: 'v1/addtoFav',
    renoveFav: (prodId, userID) => `v1/favs/${prodId}/${userID}`
}