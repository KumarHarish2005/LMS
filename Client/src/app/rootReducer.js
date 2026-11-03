import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "../features/authSlice.js"
import { authApi } from "@/features/api/authapi.js"
import { courseApi } from "@/features/api/courseapi.js";

const rootReducer  = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [courseApi.reducerPath]:courseApi.reducer,
    auth:authReducer,
    
})

export default rootReducer;