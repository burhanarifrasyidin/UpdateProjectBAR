import React from 'react'
import Axios from 'axios';
import {connect} from 'react-redux'
import {urlApi} from './../support/urlApi'
import {Link} from 'react-router-dom'
import PageNotFound from './pageNotFound'

function formatMoney(number) {
  return number.toLocaleString('in-RP', { style: 'currency', currency: 'IDR' });
}

class History extends React.Component{
    state = {rows : [],detail:[]}

    componentDidMount(){
        this.getDataApi()
    }

    getDataApi = () => {
        Axios.get(urlApi + '/transaksi/history/'+this.props.id)
            .then((res) => {
                console.log(res)
                this.setState({rows : res.data})
            })
            .catch((err) => console.log(err))
    }


    renderJsx = () => {
        var jsx = this.state.rows.map((val, index) => {
            return (
                    <tr>
                        <th scope="row">{index+1}</th>
                        <td>{val.tanggal}</td>
                        <td>{val.waktu}</td>
                        <td>{val.item}</td>
                        <td>{formatMoney(val.total_harga)}</td>
                        <Link to={'/historydetail/'+ val.order_number}><input type='button' className='btn btn-danger' value='Detail'/></Link>
                    </tr>
            )
        })
        return jsx
    }

    
    render() {
        if(this.props.username !== ''){
            return (
                <div className="container" style={{paddingTop:'90px'}}>
                <h2 style={{marginTop:'5px'}}>History Transaksi Untuk {this.props.username}</h2>
                <table className="table table-dark">
                        <thead>
                        <tr>
                            <th scope="col">N0</th>
                            <th scope="col">TANGGAL</th>
                            <th scope="col">WAKTU</th>
                            <th scope="col">ITEM</th>
                            <th scope="col">TOTAL HARGA</th>
                            <th scope="col">DETAIL</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.renderJsx()}
                        </tbody>
                    </table>
                    
            </div>
            )
        } else {
            return <PageNotFound/>
        }
        
    }
}

const mapStateToProps = (state) => {
    return {
        username : state.user.username,
        id : state.user.id,
        cart : state.cart.cart
    }
}

export default connect(mapStateToProps)(History)