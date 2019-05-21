import React from 'react'
import Axios from 'axios';
import { urlApi } from '../support/urlApi';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import {cartCount} from './../1.actions'
import {Link} from 'react-router-dom'

function formatMoney(number) {
    return number.toLocaleString('in-RP', { style: 'currency', currency: 'IDR' });
}

class ProductDetail extends React.Component{
    state = {product : {},cart:0,wish:false}
    componentDidMount(){
        this.getDataApi()
    }

    getDataApi = () => {
        var idUrl = this.props.match.params.id
        Axios.get(urlApi + '/product/product-detail/' + idUrl)
        .then((res) => {
            this.setState({product : res.data[0]})
        })
        .catch((err) => console.log(err))
    }

    proteksiQty = () => {
        var qty = this.refs.inputQty.value
        if(qty < 1){
            this.refs.inputQty.value = 1
        }
    }

    addBtnCart = () => {
        var qty = this.refs.inputQty.value
        var newData = {
            id_user: this.props.id,
            id_product : this.state.product.id,
            quantity : qty
        }
       Axios.post(urlApi+'/cart/addtocart', newData)
        .then((res) => {
           swal("Thanks for the Purchase", res.data, "success")
           this.props.cartCount(this.props.username)
        })
        .catch((err) => console.log(err))
    }

    addBtnWish = () => {
        var newData = {
            id_user: this.props.id,
            id_product : this.state.product.id,
            quantity : 1
        }
       Axios.post(urlApi+'/wishlist/addtoWish', newData)
        .then((res) => {
           swal("Add to wishlist", res.data, "success")
           if(this.state.wish === false){
            this.setState({wish : true})
            } else {
            this.setState({wish : false})
            }
           this.props.cartCount(this.props.username)
        })
        .catch((err) => console.log(err))
    }

    render(){
        var{nama_product,harga_product,discount_product,image,deskripsi_product} = this.state.product
        return(
            <div className='container' style={{paddingTop:'150px'}}>
                <div  className='row'>
                    <div className='col-md-4'>
                        <div className="card" style={{width: '100%'}}>
                            <img src={`http://localhost:2008/${image}`} className="card-img-top" alt="Card cap" />
                            <div className="card-body">
                            <p className="card-text"></p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-8'>
                        <h1 style={{color:'#4C4C4C'}}>{nama_product}</h1>
                        <div style={{backgroundColor:'#D50000',width:'50px',height:'20px',color:'white',textAlign:'center',fontWeight:'bold',display:'inline-block'}}>{discount_product}%
                        </div>
                        <span style={{fontWeight:'600',fontSize:'15px',color:'#606060',marginLeft:'10px',textDecoration:'line-through'}}>Rp. {harga_product}</span>
                        <div style={{fontWeight:'700',fontSize:'24px',color:'#FF5722',marginTop:'20px'}}>{formatMoney(harga_product-(harga_product*(discount_product/100)))}</div>

                        <div className='row'>
                            <div className='col-md-2'>
                                <div style={{marginTop:'20px',color:'#606060',fontWeight:'700',fontSize:'14px'}}>Jumlah</div>
                                <input type='number' ref='inputQty' onChange={this.proteksiQty} min={1} className='form-control' style={{width:'60px',marginTop:'10px'}}></input>
                            </div>
                            <div className='col-md-6'>
                                <div style={{marginTop:'20px',color:'#606060',fontWeight:'700',fontSize:'14px'}}>Catatan Untuk Penjual (Optional)</div>
                                <input type='text' placeholder='Ex : Contoh Warna Putih, Ukuran XL, Edisi ke-2'className='form-control' style={{width:'100%',marginTop:'10px'}}></input>   
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-md-8'>
                                <p style={{color:'#606060',fontStyle:'italic'}}>{deskripsi_product}</p>
                            </div>
                        </div>
                        {
                            this.props.username !== '' ?
                        <div className='row mt-4'>
                        {
                            this.state.wish ?
                            <button type='button' className='btn border-secondary col-md-2 ml-3' value='Add To Wishlist' onClick={()=>this.addBtnWish()}><i class="fas fa-heart" style={{color:'red'}}></i>Add To Wish</button>
                            :
                            <button className='btn border-secondary col-md-2 ml-3' value='Add To Wishlist' onClick={()=>this.addBtnWish()}><i class="fas fa-heart">Add To Wish</i></button>
                        }
                            <input type='button' className='btn btn-primary col-md-2 ml-3' value='Beli Sekarang'></input>
                            <input type='button' className='btn btn-success col-md-3 ml-3' value='Add To Cart' onClick={()=>this.addBtnCart()}></input>
                            
                        </div>
                         :
                         <Link to='/login'><div className='row mt-4'>
                             <input type='button' className='btn border-secondary col-md-2 ml-3' value='Add To Wishlist'></input>
                            <input type='button' className='btn btn-primary col-md-2 ml-3' value='Beli Sekarang'></input>
                            <input type='button' className='btn btn-success col-md-3 ml-3' value='Masukkan Ke Keranjang'></input>
                        </div></Link>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
      username : state.user.username,
      id : state.user.id,
      cart : state.cart.count
    }
  }

export default connect (mapStateToProps,{cartCount})(ProductDetail);