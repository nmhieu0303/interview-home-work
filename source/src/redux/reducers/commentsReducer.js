import { ADD_COMMENT } from '../types'
import commnents from './../../utils/constants/comments.json'

const initialState = {
    commentsList:  JSON.parse(localStorage.getItem('commentsList'))|| commnents
}

export const commentsReducer =  (state = initialState, action) => {
    switch (action.type) {
    case ADD_COMMENT:
        const commentsList = state.commentsList;
            const comment = {
                id: commentsList.length + 1,
                ...action.comment,
            }
            commentsList.push(comment)
            localStorage.setItem('commentsList', JSON.stringify(commentsList))
            return { ...state,commentsList:[...commentsList] }
    default:
        return state
    }
}

export const getCommentsList = state => state.commentsList;
