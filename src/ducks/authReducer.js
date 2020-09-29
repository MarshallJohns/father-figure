const initialState = {
    firstName: '',
    lastName: '',
    email: ''
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
            return { ...state, firstName: action.payload.first_name, lastName: action.payload.last_name, email: action.payload.email }
        }
        case GET_USER: {
            return { ...state, firstName: action.payload.first_name, lastName: action.payload.last_name, email: action.payload.email }
        }
        case LOGOUT_USER: {
            return initialState
        }
        default: return state


    }
}