import React from 'react'
import Axios from 'axios';
import {connect} from 'react-redux'
import {urlApi} from './../support/urlApi'
import PageNotFound from './pageNotFound'
import QueryString from 'query-string'
import swal from 'sweetalert'
import Moment from 'moment'

function formatMoney(number) {
    return number.toLocaleString('in-RP', { style: 'currency', currency: 'IDR' });
}

class History extends React.Component{
    state = {rows : [],selectedFile : null,success:false,data:{}}

    componentDidMount(){
        this.getDataApi()
        this.getDataUrl()
        this.filterData()
    }

    getDataApi = () => {
        Axios.get(urlApi + '/transaksi/transUser/'+this.props.id)
            .then((res) => {
                console.log(res)
                this.setState({rows : res.data})
            })
            .catch((err) => console.log(err))
    }

    getDataUrl = () => {
        var obj = QueryString.parse(this.props.location.search)
        if(this.props.location.search){
            if(obj.status > 0){
                Axios.get(urlApi + `/transaksi/filterstatus?status=${obj.status}`)
                .then((res)=>{
                    this.setState({rows :res.data})
                })
                .catch((err) => console.log(err))
            }
        }
    }

onChangeHandler = (event) => {
        // alert(event.target.files[0])
    this.setState({selectedFile : event.target.files[0]})
}
    
valueHandler = () => {
        
    var value = this.state.selectedFile ? this.state.selectedFile.name : 'Insert a picture'
    return value
}

completePayment = (order_number) => {
                if(this.state.selectedFile){
                    var newData = {
                        tanggal_bayar : Moment().format('DD-MM-YYYY, h:mm:ss'),
                        status : 'Sudah Dibayar'
                    }
                    var fd = new FormData()
                    fd.append('data', JSON.stringify(newData))
                    fd.append('receipt', this.state.selectedFile, this.state.selectedFile.name)
                        Axios.put(urlApi+'/transaksi/completePayment/'+order_number, fd)
                            .then((res) => {
                                swal('Success', res.data, 'success')
                                this.setState({success : true})
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                }
                else {
                    swal('Error', 'Please Upload Your Receipt' , 'error')
                }
                
            }

Dropdown = () => {
    return <select ref='status' className='form-control' defaultValue={'Belum Terbayar'}>
                <option value={0}>All Status</option>
                <option value={'Sudah Diproses'}>Sudah Diproses</option>
                <option value={'Belum Terbayar'}>Belum Terbayar</option>
                <option value={'Rejected'}>Rejected</option>
            </select>
}

filterData = () => {
    var status = this.refs.status.value
    this.pushUrl()
    // eslint-disable-next-line
    if(status == 0){
        this.getDataApi()             
    }
    else {
        Axios.get(urlApi + `/transaksi/filterstatus?status=${status}`)
            .then((res) => {
                this.setState({rows : res.data})
            })
            .catch((err) => console.log(err))
    }
    
}

pushUrl = () => {
    var newLink = '/payment'
    if(this.refs.status.value){
        newLink += '?status=' + this.refs.status.value
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
                        <td>{val.status}</td>
                        <td>{val.item}</td>
                        <td>{formatMoney(val.total_harga)}</td>
                        <input style={{marginTop:'10px'}} ref="inputt" type="file" onChange={this.onChangeHandler}/>
                        <td><button style={{marginLeft:'12px'}} data-toggle="tooltip" data-placement="bottom" title="Done Payment" className='btn btn-success' value='Done Transaction' onClick={()=>this.completePayment(val.order_number)}><i class="fas fa-check-square"></i></button></td>
                    </tr>
            )
        })
        return jsx
    }
  
    render() {
        if(this.props.username !== ''){
            return (
                <div className="container" style={{paddingTop:'90px'}}>
                <h2 className='historytext' style={{marginTop:'5px'}}>Upload Pembayaran Untuk Bpk/Ibu {this.props.username}</h2>
                <hr/>
                    <div className='row'>
                        <div className='col-md-3'>
                            {this.Dropdown()}
                        </div>
                        <div className='col-md-3' >
                            <input type='button' className='btn btn-primary' style={{}} onClick={this.filterData} value='Filter'/>
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
                                <th scope="col">STATUS</th>
                                <th scope="col">ITEM</th>
                                <th scope="col">TOTAL HARGA</th>
                                <th scope="col">UPLOAD RECEIPT</th>
                                <th scope="col">PAYMENT</th>
                            </tr>
                            </thead>
                                <tbody>
                                    {this.renderJsx()}
                                </tbody>
                        </table>
                            :
                            <h2 className='protupload' style={{textAlign:'center',marginTop:'120px'}}>BELUM ADA TRANSAKSI</h2>
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