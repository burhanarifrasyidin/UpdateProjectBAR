import React from 'react'
import Slider from 'react-slick'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {urlApi} from './../support/urlApi'

function formatMoney(number) {
    return number.toLocaleString('in-RP', { style: 'currency', currency: 'IDR' });
}

class SuperSale extends React.Component{

    state = {listProduct : [], cart : 0}

    componentDidMount(){
        this.getDataProduct()
    }

    getDataProduct = () => {
        axios.get( urlApi + '/product/saleProduct')
        .then((res) => this.setState({listProduct : res.data}))
        .catch((err)=> console.log(err))
    }
    
    renderJsx = () => {
       
        var jsx = this.state.listProduct.map((val) => {
             return <div className="card">
            <Link to={'/product-detail/' + val.id} ><img src={ `http://localhost:2008/${val.image}`} style={{width :'350px', height :'250px'}} className="card-img-top img" alt="Card cap" /></Link>
            {   val.discount_product > 0 ? 
                <div className="discount" style={{right:"50px",borderRadius:'14px'}}>{val.discount_product}%</div>
                : null
            }
            <div className="kategori" style={{right:"70px", width: "120px", 
            bottom : "10px", height: "20px", fontSize:"15px",color:'red',marginLeft:'140px'}}>{formatMoney(val.harga_product - (val.harga_product*(val.discount_product/100)))}</div>
        </div>
    })
    return jsx
            
    }

    render(){
        const settings = {
            dots: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            speed: 2000,
            autoplaySpeed: 2000,
            cssEase: "linear"
          };
        return (
            <div style={{width:"100%"}}>
            <Slider {...settings}>
                {this.renderJsx()}
            </Slider>
            </div>
        )
    }
}

export default SuperSale