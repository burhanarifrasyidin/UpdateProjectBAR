import React from 'react';
import axios from 'axios';
import { urlApi } from './../support/urlApi';
import './../support/css/product.css';
import {Link} from 'react-router-dom';

class ProductList extends React.Component{
    state = {listProduct : [],dataPage:6}

    // componentdidmount digunakan ketika langsung mau tampil di web sedangkan kalau onclick tidak perlu componennpm didmount
    componentDidMount = () => {
        this.getDataProduct() 
    }

    getDataProduct = () => {
        axios.get(urlApi + '/product/products')
        .then((res) => this.setState({listProduct : res.data}))

        .catch((err) => console.log(err))
    }

    renderProdukJsx = () => {
        var data = this.state.listProduct.slice(0,this.state.dataPage)
        var jsx = data.map((val) => {
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
                                 <Link to={'/product-detail/' + val.id}><input type="button" className="d-block btn btn-primary" value="View"></input></Link>
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

export default ProductList