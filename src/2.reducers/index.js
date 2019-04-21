import {combineReducers} from 'redux'
import user from './userGlobal'
import Product from './userGlobal'
import cart from './cartCount'

export default combineReducers({
    user : user,
    Product : Product, // untuk membuat manage(list product) di navbar sebagai admin
    cart : cart
})