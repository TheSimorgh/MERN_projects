import {combineReducers, configureStore} from "@reduxjs/toolkit"
import { persistReducer,persistStore,
FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER} from "redux-persist"
import storage from "redux-persist/lib/storage"
import userSlice from "./features/userSlice"





const persistConfig ={
    key:"root",
    // version:1,
    storage
}

const rootReducer =combineReducers({
    user:userSlice,
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