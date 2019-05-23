import React from 'react'
import Axios from 'axios';
import {connect} from 'react-redux'
import {urlApi} from './../support/urlApi'
import {Link} from 'react-router-dom'
import PageNotFound from './pageNotFound'
import QueryString from 'query-string'

function formatMoney(number) {
    return number.toLocaleString('in-RP', { style: 'currency', currency: 'IDR' });
}

class History extends React.Component{
    state = {rows : [],detail:[]}

    componentDidMount(){
        this.getDataApi()
        this.getDataUrl()
    }

    getDataApi = () => {
        Axios.get(urlApi + '/transaksi/history/'+this.props.id)
            .then((res) => {
                console.log(res)
                this.setState({rows : res.data})
            })
            .catch((err) => console.log(err))
    }

    getDataUrl = () => {
        var obj = QueryString.parse(this.props.location.search)
        if(this.props.location.search){
            if(obj.month < 12){
                Axios.get(urlApi + `/transaksi/filterhistory?id_user=${this.props.id}&month=0${obj.month}`)
                .then((res) => {
                    this.setState({rows : res.data})
                })
                .catch((err) => console.log(err))
            } else {
                Axios.get(urlApi + `/transaksi/filterhistory?id_user=${this.props.id}&month=${obj.month}`)
                .then((res) => {
                    this.setState({rows : res.data})
                })
                .catch((err) => console.log(err))
            }
        }
       
    }

    Dropdown = () => {
        return <select ref = 'bulan' className='form-control'>
                    <option value={0}>All Months</option>
                    <option value={1}>January</option>
                    <option value={2}>February</option>
                    <option value={3}>March</option>
                    <option value={4}>April</option>
                    <option value={5}>May</option>
                    <option value={6}>June</option>
                    <option value={7}>July</option>
                    <option value={8}>August</option>
                    <option value={9}>September</option>
                    <option value={10}>October</option>
                    <option value={11}>November</option>
                    <option value={12}>Desember</option>
                </select>
}

filterData = () => {
    var bulan = this.refs.bulan.value
    this.pushUrl()
    // eslint-disable-next-line
    if(bulan == 0){
        this.getDataApi()
    }
    else {
        if(bulan < 12){
            bulan = '0'+this.refs.bulan.value
        }
       
        Axios.get(urlApi + `/transaksi/filterhistory?id_user=${this.props.id}&month=${bulan}`)
            .then((res) => {
                this.setState({rows : res.data})
            })
            .catch((err) => console.log(err))
    }
    
}

pushUrl = () => {
    var newLink = '/history'
    if(this.refs.bulan.value > 0){
        newLink += '?month=' + this.refs.bulan.value
    } 
    this.props.history.push(newLink)
}


    renderJsx = () => {
        var jsx = this.state.rows.map((val, index) => {
            return (
                    <tr>
                        <th scope="row">{index+1}</th>
                        <td>{val.tanggal}</td>
                        <td>{val.waktu}</td>
                        <td>{val.order_number}</td>
                        <td>{val.item}</td>
                        <td>{formatMoney(val.total_harga)}</td>
                        <Link to={'/history-detail/' + val.order_number}><input type='button' className='btn btn-danger' value='Detail'/></Link>
                    </tr>
            )
        })
        return jsx
    }
  
    render() {
        if(this.props.username !== ''){
            return (
                <div className="container" style={{paddingTop:'90px'}}>
                <h2 className='historytext' style={{marginTop:'5px'}}>History Transaksi Untuk Bpk/Ibu {this.props.username}</h2>
                <hr/>
                    <div className='row'>
                        <div className='col-md-3'>
                            {this.Dropdown()}
                        </div>
                        <div className='col-md-3' >
                            <input type='button' className='btn btn-primary' style={{}} onClick={this.filterData} value='Filter History '/>
                        </div>
                    </div>
                    <div>
                        {
                            this.state.rows.length > 0 ?
                            <table className="table table-dark" style={{marginTop:'12px'}}>
                                <thead>
                                <tr>
                                    <th scope="col">N0</th>
                                    <th scope="col">TANGGAL</th>
                                    <th scope="col">WAKTU</th>
                                    <th scope="col">ORDER_NUMBER</th>
                                    <th scope="col">ITEM</th>
                                    <th scope="col">TOTAL HARGA</th>
                                    <th scope="col">DETAIL</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {this.renderJsx()}
                                </tbody>
                            </table>
                            : 
                            <h2 className='protupload' style={{textAlign:'center',marginTop:'120px'}}>BELUM ADA HISTORY TRANSAKSI</h2>
                        }
                        
                    </div>
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