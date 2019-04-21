import axios from 'axios'
import swal from 'sweetalert'
import { urlApi } from './../support/urlApi'
import cookie from'universal-cookie'

const objCookie = new cookie()
export const onLogin = (paramUsername, password) => {
    return (dispatch) => {
        // INI UNTUK MENGUBAH LOADING MENJADI TRUE
        dispatch({
            type: 'LOADING'

        })

        // GET DATA DARI FAKE API JSON SERVER
        axios.get(urlApi + `/user/loginUser?username=${paramUsername}&password=${password}`)

            // KALO BERHASIL NGE GET DIA MASUK THEN
            .then((res) => {
                console.log(res)
                // IF USERNAME DAN PASSWORD SESUAI MAKA RES DATA ADA ISINYA
                swal("Mantab Brow!!", "Kamu Berhasil Masuk", "success");
                if (res.data.length > 0) {
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        payload: // atau res.data[0] => akan kekirim semua yang ada di db json
                        {
                            username : res.data[0].username,
                            role : res.data[0].role,
                            id : res.data[0].id
                        }
                    })
                } else if(res.data[0].verified === 0){
                    dispatch(
                        {
                            type : 'NOT_VERIFIED',
                        }
                    )
                } else {
                    swal("Sorry!!", "Kamu Tidak Berhasil Masuk", "error");
                    dispatch({
                        type: 'USER_NOT_FOUND'
                    })
                }

            })
            // Trigger ketika db json mati akan alert system error
            .catch((err) => {
                dispatch({
                    type: 'SYSTEM_ERROR'
                })
            })
    }

}

// untuk membuat login tetep tidak berubah
export const keepLogin = (cookie) => {
    return (dispatch) => {
        axios.get(urlApi + '/user/keepLogin', {
                params: {
                    username: cookie
                }
            })
            .then((res) => {
                if (res.data.length > 0) {
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        payload: // atau res.data[0] => akan kekirim semua yang ada di db json
                        {
                            username : res.data[0].username,
                            role : res.data[0].role,
                            id : res.data[0].id
                        }
                    })
                }
            })
            .catch((err) => console.log(err))
    }
}

export const cookieChecked = () => {
    return {
        type : 'COOKIE_CHECKED'
    }
}

// untuk membuat log out
export const resetUser = () => {
    return {
        type: 'RESET_USER'
    }
}

// masuk mulai dari sini : form register (axios pasti ada asyncronus)
export const userRegister = (a,b,c,d) => { // userRegister('fikri')
    return(dispatch)=>{
        dispatch({
            type : 'LOADING'
        })
        var newData = {username : a, password : b, email : c, phone : d,role:'user',verified:0}
        // axios berfungsi untuk mengecek username availability
        axios.post(urlApi +'/user/addUser',newData)
        .then((res) => {
            if(res.data === 'Username sudah ada') {
                dispatch({
                    type : 'USERNAME_NOT_AVAILABLE'
                })
            } else {
                dispatch({
                    type : 'REGISTER_SUCCESS'
                },
                    objCookie.set('userData',a,{path : '/'}) // path '/' agar cookienya diakses di semua components
                )
                
            }
        })
        .catch((err) => {
            console.log(err)
            dispatch({
                type : 'SERVER_ERROR'
            })
        })
    }
}


// Membuat login with google , user dan admin harus menggunakan email pada saat register or tambahkan di dbjson
export const loginWithGoogle = (email) => {
    return(dispatch) => {
        axios.get(urlApi + '/users?username=' + email)
        .then((res)=>{
            if(res.data.length > 0){
                dispatch({
                    type : 'LOGIN_SUCCESS',
                    payload : res.data[0]
                },
                objCookie.set('userData',email,{path : '/'})
                )
            }else{
                axios.post(urlApi + '/users',{username : email, role : 'user'})
                .then((res) =>{
                    dispatch({
                        type : 'LOGIN_SUCCESS',
                        payload : res.data
                    },
                    objCookie.set('userData',email,{path : '/'})
                    )
                })
                .catch((err) =>{
                    console.log(err)
                })
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

