import React from 'react'
import Carousel from './carousel'
import { connect } from 'react-redux'
import { urlApi } from './../support/urlApi'
import axios from 'axios'
import './../support/css/product.css'
import {Link} from 'react-router-dom'
import swal from 'sweetalert'
import {cartCount} from './../1.actions'
import SaleProduct from './saleProduct'
import Bounce from 'react-reveal/Bounce'


function formatMoney(number) {
    return number.toLocaleString('in-RP', { style: 'currency', currency: 'IDR' });
}

class Home extends React.Component{
    state = {listProduct : [],dataPage:6,cart:0}

    componentDidMount = () => {
        this.getDataProduct() 
    }

    getDataProduct = () => {
        axios.get(urlApi + '/product/products')
        .then((res) => this.setState({listProduct : res.data}))

        .catch((err) => console.log(err))
    }

    addBtnCart = (param)=> {
        // console.log(this.state.listProduct[param])
        var newData = {
            id_user: this.props.id,
            id_product : this.state.listProduct[param].id,
            quantity : 1
        }
       axios.post(urlApi+'/cart/addtocartfromhome', newData)
        .then((res) => {
           swal("Terima kasih sudah membeli", res.data, "success")
           this.props.cartCount(this.props.username)
        })
        .catch((err) => console.log(err))
    }

    renderProdukJsx = () => {
        var data = this.state.listProduct.slice(0,this.state.dataPage)
        var jsx = data.map((val,index) => {
                return (
                    <div className="card col-md-4 mr-5 mt-3 ml-5" style={{width: '18px'}}>
                        <Link to={'/product-detail/' + val.id}><img src={ `http://localhost:2008/${val.image}`} height="200px" className="card-img-top" alt=".." /></Link>
                        {
                            val.discount_product > 0 ?
                            <div className="discount">{val.discount_product}%</div>
                            : null
                        }                      
                            <div className="category">{val.category_product}</div>
                            <div className="card-body">
                                 <h4 className="card-text">{val.nama_product}</h4>
                                 <h6 className="card-text">{val.deskripsi_product}</h6>
                                 {
                                 val.discount_product > 0 ?
                                 <p className="card-text" style={{textDecoration:'line-through',color:'red',display:'inline'}}>{formatMoney(val.harga_product)}</p>
                                 : null
                                 }
                                 <p style={{display:'inline',marginLeft:'10px',fontWeight:'400'}}>{formatMoney(val.harga_product - (val.harga_product*(val.discount_product/100)))}</p>
                                <input type="button" className="d-block btn btn-primary" onClick={()=>this.addBtnCart(index)} value="Add To Cart"></input>
                            </div>
                    </div>
                )
             
        })
        return jsx
    }

    render(){
        return(
            <div className='home'>
            <div className="container">           
                <div className="row justify-content-center">   
                    <div className="col-lg-12">
                        <div className="my-4" style={{paddingTop:'80px'}}>
                            <h1 className='title' style={{textAlign:'center',fontSize:'50px',fontWeight:'bold'}}>Selamat Datang Di Website <br/><hr/><span className="span" style={{color:'blue'}}>OnOSepeda.Com</span></h1>
                                <Carousel />
                            <Bounce>
                            <Link to='/product'>
                            <hr></hr>
                            <h1 className='diskontext' style={{textAlign:"center", fontWeight:"1000"}}>Super Discount Deals</h1>         
                                <SaleProduct/>       
                            <br/>
                            <div>
                                <input type='button' style={{fontFamily:'sanserif',fontSize:'50px',fontWeight:'bold',justifyContent:'center',marginTop:'18px',marginLeft:'360px',borderRadius:'20px'}} className='btn btn-primary' value='OUR PRODUCT'></input>
                            </div>
                            </Link>
                            </Bounce>
                        </div>
                    </div>
                {this.renderProdukJsx()}
                </div>
                     <div className='row justify-content-center'>
                         <p style={{cursor:'pointer',fontStyle:'italic'}} onClick={()=>this.setState({dataPage:this.state.dataPage+5})}>View More</p>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
    username : state.user.username,
    id : state.user.id,
    cart : state.cart.count
    }
}

export default connect(mapStateToProps,{cartCount})(Home)