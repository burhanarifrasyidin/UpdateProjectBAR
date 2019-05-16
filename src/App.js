import React, { Component } from 'react';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Manage from './components/admin/manageProduct'
import Footer from './components/footer'
import Register from './components/Register'
import Product from './components/productList'
import PageNotFound from './components/pageNotFound'
import ProductDetail from './components/productDetail'
import ScrollToTop from './components/scrollToTop' 
import Search from './components/search'
import { connect } from 'react-redux'
import { keepLogin,cartCount,cookieChecked } from './1.actions'
import { Route,withRouter,Switch } from 'react-router-dom'    // withrouter =>untuk tersambung ke reducer dengan connect, tapi dalam komponen ada routing
import cookie from 'universal-cookie'
import Wishlist from './components/Wishlist'
import Cart from './components/cart'
import ManageTransaksi from './components/admin/manageTransaction'
import Histori from './components/historyTransaksi'
import HistoryDetail from './components/historyDetailTransaksi'
import Verify from './components/verification'
import ManageCategory from './components/admin/manageCategory'
import EditProfile from './components/EditProfile'
import Payment from './components/payment'
import './App.css';



const objCookie = new cookie()
class App extends Component {
  // Untuk menjalankan keep login ketika di refresh tidak assign ke awal
  componentDidMount(){
    var terserah = objCookie.get('userData')
    if(terserah !== undefined){
      this.props.keepLogin(terserah)
      this.props.cartCount(terserah)
    }else{
      this.props.cookieChecked()
    }
  }

  render() {
    // if(this.props.cookie){
      return (
        <div className='position-relative' style={{minHeight:'100vh'}}>
          <div style={{paddingBottom:'250px'}}>
            <Navbar/>
            <ScrollToTop>
            <Switch>
            <Route path='/' component={Home} exact/>
            <Route path='/login' component={Login} exact/>
            <Route path='/verify' component={Verify} exact/>
            <Route path='/register' component={Register} exact/>
            <Route path='/product' component={Product} exact/>
            <Route path='/search' component={Search} exact/>
            <Route path='/manage' component={Manage} exact/>
            <Route path='/managecategory' component={ManageCategory} exact/>
            <Route path='/managetransaksi' component={ManageTransaksi} exact/>
            {
              this.props.username === '' ?
            <Route path='/payment/:id' component={Payment} exact/>
            : <Route path='/payment/' component={Payment} exact/>
            }
            {
              this.props.username === '' ?
            <Route path='/history/:id' component={Histori} exact/>
            : <Route path='/history/' component={Histori} exact/>
            }
            <Route path='/historydetail/:id' component={HistoryDetail} exact/>
            {
              this.props.username === '' ?
            <Route path='/cart/:id' component={Cart} exact/>
            : <Route path='/cart/' component={Cart} exact/>
            }
            {
              this.props.username === '' ?
            <Route path='/wishlist/:id' component={Wishlist} exact/>
            : <Route path='/wishlist/' component={Wishlist} exact/>
            }
            {
              this.props.username === '' ?
            <Route path='/editprofile/:id' component={EditProfile} exact/>
            : <Route path='/editprofile/' component={EditProfile} exact/>
            }
            <Route path='/product-detail/:id' component={ProductDetail} exact/>
            <Route path='/*' component={PageNotFound} exact/>
            </Switch>
            </ScrollToTop>
            </div>
            <Footer/>
            
        </div>
      );
    }
    // return <div className='center'>
    //           <Loader
    //             type="Bars"
    //             color="#00BFFF"
    //             height="100"	
    //             width="100"
    //             />
    //        </div>
    // 
  }

  const mapStateToProps = (state) => {
    return {
      cookie : state.user.cookie,
      id : state.user.id,
      username : state.user.username,
      cart : state.cart.cart
    }
  }
  
  export default withRouter(connect(mapStateToProps,{keepLogin,cartCount,cookieChecked})(App));