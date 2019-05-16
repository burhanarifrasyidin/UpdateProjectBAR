import React from 'react'
import Axios from 'axios';
import {connect} from 'react-redux'
import {urlApi} from './../support/urlApi'
import {Link} from 'react-router-dom'

function formatMoney(number) {
    return number.toLocaleString('in-RP', { style: 'currency', currency: 'IDR' });
}

class HistoryDetail extends React.Component{
    state = {rows : []}

    componentDidMount(){
        this.getDataApi()
    }
    getDataApi = () => {
        // console.log(this.props.id)
        var idUrl = this.props.match.params.id
        Axios.get(urlApi + '/transaksi/transdetail/'+idUrl)
            .then((res) => {
                this.setState({rows : res.data})
            })
            .catch((err) => console.log(err))
    }

    renderJsx = () => {
        var detail = this.state.rows.map((val, index) => {
            return (
                <tr>
                    <th scope="row">{index+1}</th>
                    <td>{val.nama_product}</td>
                    <td>{val.quantity}</td>
                    <td>{formatMoney(val.harga_product)}</td>
                </tr>
            )
        })
        return detail
    }

    
    render() {
        return (
            <div className="container" style={{paddingTop:'90px'}}>
            <div className = 'row justify-content-center mb-4'>
                <div className= 'col-md-5'>
                    <table className=" table table-responsive table-dark">
                        <thead>
                        <tr>
                            <td>No</td>
                            <td>Nama Produk</td>
                            <td>Quantity</td>
                            <td>Harga</td>
                        </tr>
                        </thead>
                        <tbody>
                            {this.renderJsx()}
                        </tbody>
                    </table>
                        <Link to={'/history'}><input type='button' className='btn btn-success' value='Back'/></Link>
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
        cart : state.cart.cart
    }
}

export default connect(mapStateToProps)(HistoryDetail)