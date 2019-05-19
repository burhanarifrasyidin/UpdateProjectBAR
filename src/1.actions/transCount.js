import Axios from "axios";
import { urlApi } from "../support/urlApi";

export const countTransaksi = () => {
    return(dispatch) => {
        Axios.get(urlApi+ '/transaksi/transaction').then((res) => {
            dispatch({
                type : 'JUMLAH_TRANSAKSI',
                payload : res.data.length
            })
        })
        
    }
}