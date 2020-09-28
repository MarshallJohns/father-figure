const initialState = {
    firstName: '',
    lastName: '',
    email: ''
}

const LOGIN_USER = 'LOGIN_USER'

export function loginUser(data) {
    return {
        type: LOGIN_USER,
        payload: data
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER: {
            return { ...state, firstName: action.payload.first_name, lastName: action.payload.last_name, email: action.payload.email }
        }
        default: return state


    }
}