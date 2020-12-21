import { combineReducers, createStore } from "redux";
import categories from "./categories";
import quiz from "./quiz";

export const store = createStore(combineReducers({ categories,quiz }));

export const dispatchAction = (actionType, payload) => {
    store.dispatch({ type: actionType, payload });
}