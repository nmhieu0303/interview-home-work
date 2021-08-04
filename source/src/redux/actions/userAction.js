import { LOGIN, LOGOUT, SIGNUP } from "../types"

export const loginAction = (user)=>{
    return {
        type: LOGIN,
        user
    }
}


export const logoutAction = ()=>{
    return {
        type: LOGOUT,
    }
}

export const signupAction = (user)=>{
    return {
        type: SIGNUP,
        user
    }
}
