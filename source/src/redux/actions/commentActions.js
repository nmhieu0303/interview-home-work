import { ADD_COMMENT } from "../types"

export const addCommentAction = (comment) => {
    return {
        type: ADD_COMMENT,
        comment
    }
}