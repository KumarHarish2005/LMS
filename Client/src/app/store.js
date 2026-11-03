import {configureStore} from "@reduxjs/toolkit"

import rootReducer from "./rootReducer.js"
import { authApi } from "@/features/api/authapi.js"
import { courseApi } from "@/features/api/courseapi.js";
export const appStore = configureStore({
    reducer: rootReducer,
    middleware:(defaultMiddleware) => 
    defaultMiddleware().concat(authApi.middleware,courseApi.middleware)
});
//for reetention of user and isAuthenticaeted after refresh
const initializeApp =async ()=>{
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}

initializeApp();