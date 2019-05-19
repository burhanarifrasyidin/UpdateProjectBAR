import React from 'react';
import axios from 'axios';
import { urlApi } from './../support/urlApi';
import './../support/css/product.css';
import { connect } from 'react-redux';
import {cartCount} from './../1.actions';
import swal from 'sweetalert';


class Wishlist extends React.Component{
    state = {listProduct : [],dataPage:6,cart:0,product:{}}

    componentDidMount = () => {
        this.getDataApi() 
    }

    getDataApi = () => {
            axios.get(urlApi + '/wishlist/showWish/' + this.props.id)
            .then((res) => this.setState({listProduct : res.data}))
            .catch((err) => console.log(err))
    }

    addBtnCart = (param)=> {
      var newData = {
          id_user: this.props.id,
          id_product : this.state.listProduct[param].id_product,
          quantity : 1
      }
     axios.post(urlApi+'/cart/addtocartfromwish', newData)
      .then((res) => {
         swal("Terima kasih sudah membeli", res.data, "success")
         this.props.cartCount(this.props.username)
      })
      .catch((err) => console.log(err))
  }

    onBtnDelete = (id) => {
    axios.delete(urlApi + '/wishlist/deleteWish/' + id)
    .then(() => {
        this.getDataApi()
        swal("Delete Wishlist", "Selamat Anda Berhasil Delete", "success");
    })
    .catch((err) => console.log(err))
  }

    renderProdukJsx = () => {
        var data = this.state.listProduct.slice(0,this.state.dataPage)
        var jsx = data.map((val,index) => {
                return (
                    <div className="card col-md-4 mr-5 mt-3 ml-5" style={{width: '18px'}}>
                        <img src={ `http://localhost:2008/${val.image}`} height="200px" className="card-img-top" alt=".." />
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
                                 <p className="card-text" style={{textDecoration:'line-through',color:'red',display:'inline'}}>Rp. {val.harga_product}</p>
                                 : null
                                 }
                                 <p style={{display:'inline',marginLeft:'10px',fontWeight:'400'}}>Rp. {val.harga_product - (val.harga_product*(val.discount_product/100))}</p>
                                 <button style={{borderRadius:'none',display:'inline'}} className="d-block btn btn-primary" onClick={()=>this.addBtnCart(index)} ><i class="fas fa-shopping-cart"></i></button>
                                 <button style={{marginTop:'-33px',borderRadius:'none',marginLeft:'50px'}} className="d-block btn btn-danger" onClick={()=>this.onBtnDelete(val.id)}><i class="fas fa-trash"></i></button>
                            </div>
                    </div>
                )
             
        })
        return jsx
    }
    render(){
        return (
            <div className='container' style={{paddingTop:'80px'}}>
                <div className='row justify-content-center'>
                <h2 style={{margin : "10px"}}>Wishlist Belanja Kamu : </h2>           
                </div>
                <div className='row justify-content-center'>
                {this.renderProdukJsx()}              
                </div>
            <div className='row justify-content-center'>
                         <p style={{cursor:'pointer',fontStyle:'italic'}} onClick={()=>this.setState({dataPage:this.state.dataPage+5})}>View More</p>
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

export default connect(mapStateToProps,{cartCount})(Wishlist)