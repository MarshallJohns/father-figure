const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    profile_picture: '',
    zipcode: ''
}

const LOGIN_USER = 'LOGIN_USER'
const GET_USER = 'GET_USER'
const LOGOUT_USER = 'LOGOUT_USER'

export function loginUser(data) {
    return {
        type: LOGIN_USER,
        payload: data
    }
}

export function getUser(data) {
    return {
        type: GET_USER,
        payload: data
    }
}

export function logoutUser() {
    return {
        type: LOGOUT_USER,
        payload: null
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER: {
            const { first_name, last_name, email } = action.payload.user
            const { profile_pic, zipcode } = action.payload.userInfo
            return { ...state, firstName: first_name, lastName: last_name, email: email, profile_picture: profile_pic, zipcode: zipcode }
        }
        case GET_USER: {
            const { first_name, last_name, email } = action.payload.user
            const { profile_pic, zipcode } = action.payload.userInfo
            return { ...state, firstName: first_name, lastName: last_name, email: email, profile_picture: profile_pic, zipcode: zipcode }
        }
        case LOGOUT_USER: {
            return initialState
        }
        default: return state


    }
}