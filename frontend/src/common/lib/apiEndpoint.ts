export const backendUri  = import.meta.env.VITE_BACKEND_URI

export const getCategoryRequest = "/category/";

export const getHighlightsRequest = "/highlight/";

export const getCategoriesRequest = "/category/";

export const getProductRequest = "/product/";

export const getProductByIdRequest =(id:string) =>(`/product/${id}`);

export const getCategoryProductByIdRequest =(id:string) =>(`/category/${id}`);

export const getBlogRequest = "/blog/";

export const registerUserRequest = "/auth/register";

export const loginUserRequest = "/auth/login";

export const userAuthRequest ="/user/";

export const logoutUserRequest = "/auth/logout";

export const checkoutServiceRequest =  "/checkout";

export const getOrdersRequest =  "/order/";