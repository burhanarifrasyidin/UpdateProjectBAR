import Axios from "axios";
import { urlApi } from "../support/urlApi";

export const cartCount = (id) => {
    return (dispatch) => {
    //     Axios.get(urlApi + '/users?username=' + id).then((res)=>{
    //         Axios.get(urlApi + '/cart?idUser=' + res.data[0].id).then((res) => {
    //             dispatch({
    //                 type : 'CART_COUNT',
    //                 payload : res.data.length
    //             })
    //         })
    //     })
    // }
        Axios.get(urlApi+'/cart/cartcount/'+id).then((res) => {
        dispatch({
                type : 'CART_COUNT',
                payload : res.data.length
            })
    })
    
}
}

export const resetCount = () => {
    return{
        type : 'RESET_COUNT'
    }
}