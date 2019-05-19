import React from 'react'
import axios from 'axios'
import {urlApi} from './../support/urlApi'
import './../support/css/product.css'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {cartCount, getSearchData} from './../1.actions'
import QueryString from 'query-string'
import swal from 'sweetalert'

class Search extends React.Component{
    state = {listProduct : [],cart:0}

    componentDidMount(){
        this.getDataApi()
        this.getDataUrl()
    }

    getDataApi = () => {
        axios.get( urlApi + '/product/products')
        .then((res) => this.setState({listProduct : res.data}))
        .catch((err)=> console.log(err))
    }

    getDataUrl = () => {
        var obj = QueryString.parse(this.props.location.search)
        if(this.props.location.search){
            this.props.getSearchData(obj.q.toLowerCase())
        }
    }

    addBtnCart = (param)=> {
        var newData = {
            id_user: this.props.id,
            id_product : this.state.listProduct[param].id,
            quantity : 1
        }
       axios.post(urlApi+'/cart/addtocartfromsearch', newData)
        .then((res) => {
           swal("Terima kasih sudah membeli", res.data, "success")
           this.props.cartCount(this.props.username)
        })
        .catch((err) => console.log(err))
    }

    renderProdukJsx = () => {
        var arrSearchAndFilter = this.state.listProduct.filter((val) => {
            return val.nama_product.toLowerCase().includes(this.props.search)
        })
        if(this.props.search === ''){
            arrSearchAndFilter = []
        }
        var jsx = arrSearchAndFilter.map((val,index) => {
                return <div className="card col-md-4 mr-5 mt-3 ml-5" style={{width: '18px'}}>
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
                         <input type="button" className="d-block btn btn-primary" onClick={()=>this.addBtnCart(index)}value="Add To Cart"></input>
                    </div>
            </div>
        })
        return jsx
    }

    render(){
        var arrSearchAndFilter = this.state.listProduct.filter((val) => {
            return val.nama_product.toLowerCase().includes(this.props.search)
        })
        return (
        <div className="container" style={{paddingTop:'80px'}}>
            <div className="row justify-content-center">
            <h3 style={{margin : "10px"}}>Hasil Pencarian Kata '{this.props.search}' Terdapat {arrSearchAndFilter.length} Item</h3>
            </div>

            <div className="row justify-content-center">
            {this.renderProdukJsx()}
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username : state.user.username,
        id : state.user.id,
        search : state.search.searchData,
    }
}

export default connect(mapStateToProps, {cartCount, getSearchData})(Search)