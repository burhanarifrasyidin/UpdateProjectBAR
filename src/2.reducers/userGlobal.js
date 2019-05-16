const INITIAL_STATE = {
    id: 0,
    username: "",
    error: "",
    loading: false,
    role : "",
    cookie:false,email:""
}

export default (state = INITIAL_STATE, action) => {

    switch(action.type){
        case 'LOGIN_SUCCESS' :
        return {
            ...INITIAL_STATE,
            username : action.payload.username, role : action.payload.role, id : action.payload.id,email : action.payload.email,cookie : true
        }
        case 'REGISTER_SUCCESS' :
        return {
            ...INITIAL_STATE,cookie : true
        }
        case 'NOT_VERIFIED' :
        return {
            ...INITIAL_STATE,cookie : true,error : 'Email Not Verified'
        }
        case 'LOADING' :
        return {
            ...INITIAL_STATE,cookie : true,
            loading: true
        }
        case 'USER_NOT_FOUND' :
        return {
            ...INITIAL_STATE,cookie : true,
            error: 'username atau password salah'
        }
        case 'SYSTEM_ERROR' :
        return {
            ...INITIAL_STATE,cookie : true,
            error: 'System error, coba lagi'
        }
        case 'RESET_USER' :
        return {
            ...INITIAL_STATE,cookie : true
        }
        case 'USERNAME_NOT_AVAILABLE' :
        return {
            ...INITIAL_STATE,cookie : true,
            error: 'username not available'
        }
        case 'COOKIE_CHECKED' :
            return {...state, cookie : true
        }
        default :
        return state
    }

}