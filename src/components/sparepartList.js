import React from 'react';
import axios from 'axios';
import { urlApi } from './../support/urlApi';
import './../support/css/product.css';
import {Link} from 'react-router-dom';

class SparepartList extends React.Component{
    state = {listSparepart : [],dataPage:6}

    // componentdidmount digunakan ketika langsung mau tampil di web sedangkan kalau onclick tidak perlu componennpm didmount
    componentDidMount = () => {
        this.getDataProduct() 
    }

    getDataProduct = () => {
        axios.get(urlApi + '/sparepart/spareparts')
        .then((res) => this.setState({listSparepart : res.data}))

        .catch((err) => console.log(err))
    }

    renderSpareJsx = () => {
        var data = this.state.listSparepart.slice(0,this.state.dataPage)
        var jsx = data.map((val) => {
                return (
                    <div className="card col-md-4 mr-5 mt-3 ml-5" style={{width: '18px'}}>
                        <Link to={'/sparepart-detail/' + val.id}><img src={`http://localhost:2008/${val.image_sparepart}`} height="200px" className="card-img-top" alt=".." /></Link>
                        {
                            val.discount_sparepart > 0 ?
                            <div className="discount">{val.discount_sparepart}%</div>
                            : null
                        }                      
                            <div className="category">{val.category_sparepart}</div>
                            <div className="card-body">
                                 <h4 className="card-text">{val.nama_sparepart}</h4>
                                 <h6 className="card-text">{val.deskripsi_sparepart}</h6>
                                 {
                                 val.discount_sparepart > 0 ?
                                 <p className="card-text" style={{textDecoration:'line-through',color:'red',display:'inline'}}>Rp. {val.harga_sparepart}</p>
                                 : null
                                 }
                                 <p style={{display:'inline',marginLeft:'10px',fontWeight:'400'}}>Rp. {val.harga_sparepart - (val.harga_sparepart*(val.discount_sparepart/100))}</p>
                                 <Link to={'/sparepart-detail/' + val.id}><input type="button" className="d-block btn btn-primary" value="View"></input></Link>
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
                {this.renderSpareJsx()}
                </div>
            <div className='row justify-content-center'>
                         <p style={{cursor:'pointer',fontStyle:'italic'}} onClick={()=>this.setState({dataPage:this.state.dataPage+5})}>View More</p>
                    </div>
            </div>
        )
    }
}

export default SparepartList