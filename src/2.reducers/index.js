import {combineReducers} from 'redux'
import user from './userGlobal'
import Product from './userGlobal'
import cart from './cartCount'
import search from './searchGlobal'
import trans from './TransCount'

export default combineReducers({
    user : user,
    Product : Product, // untuk membuat manage(list product) di navbar sebagai admin
    cart : cart,
    search : search,
    trans : trans
})