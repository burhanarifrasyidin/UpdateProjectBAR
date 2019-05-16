import React from 'react';
import axios from 'axios';
import { urlApi } from './../support/urlApi';
import './../support/css/product.css';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';
import {cartCount} from './../1.actions';
import { connect } from 'react-redux';



class ProductList extends React.Component{
    state = {listProduct : [],dataPage:6,cart:0}

    // componentdidmount digunakan ketika langsung mau tampil di web sedangkan kalau onclick tidak perlu componennpm didmount
    componentDidMount = () => {
        this.getDataProduct() 
    }

    getDataProduct = () => {
        axios.get(urlApi + '/product/products')
        .then((res) => this.setState({listProduct : res.data}))

        .catch((err) => console.log(err))
    }

    addBtnCart = (param)=> {
        // console.log(this.state.listProduct[param].id)
        var newData = {
            id_user: this.props.id,
            id_product : this.state.listProduct[param].id,
            quantity : 1
        }
       axios.post(urlApi+'/cart/addtocartfromlistproduct', newData)
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
                                 <p className="card-text" style={{textDecoration:'line-through',color:'red',display:'inline'}}>Rp. {val.harga_product}</p>
                                 : null
                                 }
                                 <p style={{display:'inline',marginLeft:'10px',fontWeight:'400'}}>Rp. {val.harga_product - (val.harga_product*(val.discount_product/100))}</p>
                                 <input type="button" className="d-block btn btn-primary" onClick={()=>this.addBtnCart(index)} value="Add To Cart"></input>
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
    return {
    username : state.user.username,
    id : state.user.id,
    cart : state.cart.count
    }
}

export default connect(mapStateToProps,{cartCount})(ProductList)