const INITIAL_STATE = {transaksi : 0}

export default(state=INITIAL_STATE, action) => {
    switch(action.type){
        case 'JUMLAH_TRANSAKSI':
            return {transaksi : action.payload}
        default:
            return state
    }


}