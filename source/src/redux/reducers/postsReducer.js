
import moment from 'moment';
import { ADD_POST } from '../types'
import posts from './../../utils/constants/posts.json'

const initialState = {
    postList: JSON.parse(localStorage.getItem('postList'))|| posts
}


export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            const postList = state.postList;
            const post = {
                id: postList.length + 1,
                ...action.post,
                created_at: moment().valueOf(),
            }
            postList.push(post)
            localStorage.setItem('postList', JSON.stringify(postList))
            return { ...state,postList:[...postList] }
        default:
            return state
    }
}

export const getPostList = state => state.postList;