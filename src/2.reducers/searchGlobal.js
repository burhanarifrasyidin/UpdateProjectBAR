const INITIAL_STATE = {searchData : ''}

export default (state=INITIAL_STATE,action) => {
    switch(action.type){
        case 'SEARCH_DATA':
            return {searchData : action.payload}
        default:
            return state
    }
}