import React from 'react'
import Carousel from './carousel'
import { connect } from 'react-redux'
import './../support/css/product.css'
import {Link} from 'react-router-dom'


class Home extends React.Component{
    render(){
        return(
            <div className="bh">
            <div className="container">
                <div className="row justify-content-center">    
                    <div className="col-lg-12">
                        <div className="my-4" style={{paddingTop:'80px'}}>
                        <h1 style={{textAlign:'center',fontFamily:'sanserif',fontSize:'50px',fontWeight:'bold'}}>Selamat Datang Di Website <br/><span style={{color:'blue'}}>OnOSepeda.Com</span></h1>
                            <Carousel />
                        <div><input type='button' style={{fontFamily:'sanserif',fontSize:'50px',fontWeight:'bold',justifyContent:'center',marginTop:'18px',marginLeft:'360px'}} className='btn btn-primary' value='OUR PRODUCT'></input></div>
                        </div>
                    </div>
                <div class="card col-md-6 mr-5 mt-3 ml-5" style={{width: '18rem',borderRadius:'10%'}}>
                    <Link to='/product'><img src="https://id-live-01.slatic.net/original/5c80b00e87218a0acfcea26b83f25671.jpg" class="card-img-top" alt="..."/></Link>
                        <div class="card-body">
                        <h5 class="card-title">SEPEDA</h5>
                        <p class="card-text">Berbagai macam merk sepeda yang kami jual untuk kebutuhan anda</p>
                        <Link to='/product'><a href=".." class="btn btn-primary">View Product</a></Link>
                         </div>
                </div>
                <div class="card col-md-6 mr-5 mt-3 ml-5" style={{width: '18rem',borderRadius:'10%'}}>
                    <Link to='/frame'><img src="https://www.rodalink.com/pub/media/catalog/product/cache/image/880x704/e9c3970ab036de70892d86c6d221abfe/P/A/PA00531.jpg" class="card-img-top" alt="..."/></Link>
                        <div class="card-body">
                        <h5 class="card-title">FRAME</h5>
                        <p class="card-text">Berbagai macam spare part sepeda yang kami jual untuk kebutuhan anda</p>
                        <Link to='/frame'><a href=".." class="btn btn-primary">View Product</a></Link>
                         </div>
                </div>
                <div class="card col-md-6 mr-5 mt-3 ml-5" style={{width: '18rem',borderRadius:'10%'}}>
                    <Link to='/sparepart'><img src="http://penopedal.files.wordpress.com/2009/02/deore-2010-forum-btt.jpg" class="card-img-top" alt="..."/></Link>
                        <div class="card-body">
                        <h5 class="card-title">SPARE PART</h5>
                        <p class="card-text">Berbagai macam spare part sepeda yang kami jual untuk kebutuhan anda</p>
                        <Link to='/sparepart'><a href=".." class="btn btn-primary">View Product</a></Link>
                         </div>
                </div>
                <div class="card col-md-6 mr-5 mt-3 ml-5" style={{width: '18rem',borderRadius:'10%'}}>
                    <Link to='/aksesoris'><img src="https://sepeda.biz/wp-content/uploads/2017/09/sepeda.biz_Dukung-Keamanan-Saat-Bersepeda-dengan-Aksesoris-Sepeda-Ini.jpg" class="card-img-top" alt="..."/></Link>
                        <div class="card-body">
                        <h5 class="card-title">AKSESORIS</h5>
                        <p class="card-text">Berbagai macam spare part sepeda yang kami jual untuk kebutuhan anda</p>
                        <Link to='/aksesoris'><a href=".." class="btn btn-primary">View Product</a></Link>
                         </div>
                </div>
                </div>
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        id : state.user.id

    }
}

export default connect(mapStateToProps)(Home)