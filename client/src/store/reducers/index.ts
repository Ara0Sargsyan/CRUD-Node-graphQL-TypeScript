import {combineReducers} from "redux";
import {pagesReducer} from "./pagesReducer";


export const rootreducer = combineReducers({
    pages: pagesReducer,
})

export type RootState = ReturnType<typeof rootreducer>