import { combineReducers } from "redux";
import {commentsReducer} from "./commentsReducer";
import {postsReducer} from "./postsReducer";
import {usersReducer} from "./usersReducer";


export const rootReducer = combineReducers({commentsReducer,postsReducer,usersReducer})