import {combineReducers, configureStore} from "@reduxjs/toolkit"
import { persistReducer,persistStore,
FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER} from "redux-persist"
import storage from "redux-persist/lib/storage"
import userSlice from "./features/userSlice"
import postSlice from "./features/postSlice"
import categorySlice from "./features/categorySlice"
import commentsSlice from "./features/commentsSlice"





const persistConfig ={
    key:"root",
    // version:1,
    storage
}

const rootReducer =combineReducers({
    user:userSlice,
     posts:postSlice,
     categories:categorySlice,
     comments:commentsSlice,

})

const persistedReducer=persistReducer(persistConfig,rootReducer)
const store =configureStore({
    reducer:
        persistedReducer,
    
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {ignoreActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]},
      // serializableCheck: false,
    }),
})


 export let persistor = persistStore(store);

// const store =configureStore({
//     reducer:{
//         user:userSlice,
//     },
//     middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// })


export default store