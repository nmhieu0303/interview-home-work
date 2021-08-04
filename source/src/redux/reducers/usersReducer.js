
import { LOGIN, LOGOUT, SIGNUP } from '../types';
import Swal from 'sweetalert2';
import users from './../../utils/constants/users.json';
import moment from 'moment';
const initialState = {
    usersList: JSON.parse(localStorage.getItem('usersList'))||users,
    currentUser: JSON.parse(localStorage.getItem('currentUser'))|| null,
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            state.currentUser = action.user;
            localStorage.setItem('currentUser', JSON.stringify(action.user));
            return { ...state }
        case LOGOUT:
            state.currentUser = null;
            return { ...state }
        case SIGNUP:
            const usersList = state.usersList;
            const user = usersList.find(user => user.username === action.user.username);
            if (user) {
                Swal.fire({
                    icon: 'error',
                    title: 'Sign up failed',
                    text: 'User had already exists!!',
                })
                return { ...state }
            }
            const userNew = {
                id:usersList.length+1,
                ...action.user,
                created_at: moment().valueOf()
            }
            usersList.push(userNew)
            localStorage.setItem('usersList', JSON.stringify(usersList))

            state.currentUser = userNew;
            localStorage.setItem('currentUser', JSON.stringify(userNew));
            Swal.fire({
                icon: 'success',
                title: 'Completed',
                text: 'Successful sign up!!',
            })
            return { ...state }
        default:
            return state
    }
}

export const getUsersList = state => state.usersList;
export const getCurrentUser = state => state.currentUser;