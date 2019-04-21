import React, { Component } from 'react';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Manage from './components/admin/manageProduct'
import ManageFrame from './components/admin/manageProductFrame'
import ManageAksesoris from './components/admin/manageProductAksesoris'
import ManageSparepart from './components/admin/manageProductSparepart'
import Footer from './components/footer'
import Register from './components/Register'
import Product from './components/productList'
import Sparepart from './components/sparepartList'
import Aksesoris from './components/aksesoris'
import Frame from './components/frame'
import PageNotFound from './components/pageNotFound'
import ProductDetail from './components/productDetail'
import SparepartDetail from './components/sparepartDetail'
import AksesorisDetail from './components/aksesorisDetail'
import FrameDetail from'./components/frameDetail'
import ScrollToTop from './components/scrollToTop' 
import { connect } from 'react-redux'
import { keepLogin,cartCount,cookieChecked } from './1.actions'
import { Route,withRouter,Switch } from 'react-router-dom'    // withrouter =>untuk tersambung ke reducer dengan connect, tapi dalam komponen ada routing
import cookie from 'universal-cookie'
import Wishlist from './components/Wishlist'
import Cart from './components/cart'
import Histori from './components/historyTransaksi'
import ManageCategory from './components/admin/manageCategory'
import EditProfile from './components/EditProfile'
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
        <div>
            <Navbar/>
            <ScrollToTop>
            <Switch>
            <Route path='/' component={Home} exact/>
            <Route path='/login' component={Login} exact/>
            <Route path='/register' component={Register} exact/>
            <Route path='/product' component={Product} exact/>
            <Route path='/sparepart' component={Sparepart} exact/>
            <Route path='/aksesoris' component={Aksesoris} exact/>
            <Route path='/frame' component={Frame} exact/>
            <Route path='/manage' component={Manage} exact/>
            <Route path='/manageframe' component={ManageFrame} exact/>
            <Route path='/manageaksesoris' component={ManageAksesoris} exact/>
            <Route path='/managesparepart' component={ManageSparepart} exact/>
            <Route path='/managecategory' component={ManageCategory} exact/>
            {
              this.props.username === '' ?
            <Route path='/history/:id' component={Histori} exact/>
            : <Route path='/history' component={Histori} exact/>
            }
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
            <Route path='/sparepart-detail/:id' component={SparepartDetail} exact/>
            <Route path='/aksesoris-detail/:id' component={AksesorisDetail} exact/>
            <Route path='/frame-detail/:id' component={FrameDetail} exact/>
            <Route path='/*' component={PageNotFound} exact/>
            </Switch>
            </ScrollToTop>
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
      id : state.user.id
    }
  }
  
  export default withRouter(connect(mapStateToProps,{keepLogin,cartCount,cookieChecked})(App));