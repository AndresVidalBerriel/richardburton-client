import storage from "redux-persist/lib/storage";

export const persistConfig = {
    key: "authType",
    storage: storage,
    whitelist: ["authType"]
};
