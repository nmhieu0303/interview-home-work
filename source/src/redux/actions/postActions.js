import { ADD_POST } from "../types"

export const addPostAction = (post) => {
    return {
        type: ADD_POST,
        post
    }
}