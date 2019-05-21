import React from 'react';
import axios from 'axios';
import { urlApi } from './../support/urlApi';
import './../support/css/product.css';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';
import {cartCount} from './../1.actions';
import { connect } from 'react-redux';
import QueryString from 'query-string';


function formatMoney(number) {
    return number.toLocaleString('in-RP', { style: 'currency', currency: 'IDR' });
}

class ProductList extends React.Component{
    state = {listProduct : [],dataPage:6,cart:0}

    componentDidMount = () => {
        this.getDataProduct() 
        this.getDataUrl()
    }

    getDataProduct = () => {
        axios.get(urlApi + '/product/products')
        .then((res) => this.setState({listProduct : res.data}))

        .catch((err) => console.log(err))
    }

    addBtnCart = (param)=> {
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

    getDataUrl = () => {
        var obj = QueryString.parse(this.props.location.search)
        if(this.props.location.search){
            if(obj.category > 0){
                axios.get(urlApi + `/product/filterprod?category=${obj.category}`)
                .then((res) => {
                    this.setState({listProduct : res.data})
                })
                .catch((err) => console.log(err))
            }
        }
       
    }

    Dropdown = () => {
        return <select ref = 'category' className='form-control'>
                     {/* <option value={0}>All Category</option>
                          {
                            this.state.listProduct.map((val)=>{
                                return(
                                 <option value={val.category}>{val.category_product}</option>
                                )
                              })
                          } */}
                    <option value={0}>All Category</option>
                    <option value={'XC'}>XC</option>
                    <option value={'Frame'}>Frame</option>
                    <option value={'Botol'}>Botol</option>
                    <option value={'Bell'}>Bell</option>
                    <option value={'Crankset'}>Crankset</option>
                    <option value={'Handle Bar'}>Handle Bar</option>
                    <option value={'Handle Grip'}>Handle Grip</option>
                    <option value={'Handle Stem'}>Handle Stem</option>
                    <option value={'Kunci'}>Kunci</option>
                    <option value={'Nut'}>Nut</option>
                    <option value={'RB'}>RB</option>
                    <option value={'Sadle'}>Sadle</option>
                    <option value={'Screw'}>Screw</option>
                    <option value={'Shift Lever'}>Shift Lever</option>
                    <option value={'Stand'}>Stand</option>
                    
      
                </select>
    }

    filterData = () => {
        var category_product = this.refs.category.value
        this.pushUrl()
        if(category_product == 0){
            this.getDataProduct()             
        }
        else {
            axios.get(urlApi + `/product/filterprodlist?category=${category_product}`)
                .then((res) => {
                    this.setState({listProduct : res.data})
                })
                .catch((err) => console.log(err))
        }
        
    }
    
    pushUrl = () => {
        var newLink = '/product'
        if(this.refs.category.value > 0){
            newLink += '?category=' + this.refs.category.value
        } 
        this.props.history.push(newLink)
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
        return (
            <div className='container' style={{paddingTop:'80px'}}>
                {/* ================== Filter Product ==================*/}
                    <div className='row mb-3' style={{marginTop:'6px',marginLeft:'400px'}}>
                        <div className='col-md-3'>
                             {this.Dropdown()}
                        </div>
                         <div className='col-md-1'>
                            <input type='button' className='btn btn-primary' value='Filter' onClick={this.filterData}></input>     
                    </div>
                </div>

          {/* ================== End Filter Product ==================*/}
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