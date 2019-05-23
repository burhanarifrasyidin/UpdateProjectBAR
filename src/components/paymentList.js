import React from 'react'
import Axios from 'axios';
import { urlApi } from '../support/urlApi';
import {connect} from 'react-redux'
import QueryString from 'query-string';


function formatMoney(number) {
    return number.toLocaleString('in-RP', { style: 'currency', currency: 'IDR' });
}

class PaymentList extends React.Component{
    state = {
        data : []
    }

    componentDidMount(){
        this.getData()
        this.getDataUrl()
    }

    getData = () => {
        Axios.get(urlApi+'/transaksi/translist/'+this.props.id)
            .then((res) => {
                this.setState({data : res.data})
            })
            .catch((err) => console.log(err))
    }

    getDataUrl = () => {
        var obj = QueryString.parse(this.props.location.search)
        if(this.props.location.search){
            if(obj.status > 0){
                Axios.get(urlApi + `/transaksi/filterstatus?status=${obj.status}`)
                .then((res)=>{
                    this.setState({data:res.data})
                })
                .catch((err) => console.log(err))
            }
        }
    }

    renderJsx = () => {
        var jsx = this.state.data.map((val, index) => {
            return <tr>
                        <td>{index + 1}</td>
                        <td>{val.tanggal}</td>
                        <td>{val.order_number}</td>
                        <td>{val.item}</td>
                        <td>{formatMoney(val.total_harga)}</td>
                        <td>{val.status}</td>
                    </tr>
        })
        return jsx
    }

    Dropdown = () => {
        return <select ref='status' className='form-control'>
                    <option value={0}>All Status</option>
                    <option value={'Sudah Diproses'}>Sudah Diproses</option>
                    <option value={'Belum Terbayar'}>Belum Terbayar</option>
                    <option value={'Rejected'}>Rejected</option>
                </select>
    }

    pushUrl = () => {
        var newLink = '/paymentlist'
        if(this.refs.status.value){
            newLink += '?status=' + this.refs.status.value
        } 
        this.props.history.push(newLink)
    }

    filterData = () => {
        var status = this.refs.status.value
        this.pushUrl()
        // eslint-disable-next-line
        if(status == 0){
            this.getData()             
        }
        else {
            Axios.get(urlApi + `/transaksi/filterstatus?status=${status}`)
                .then((res) => {
                    this.setState({data : res.data})
                })
                .catch((err) => console.log(err))
        }
        
    }

    render(){
        return (
            <div className='container' style={{paddingTop:'100px'}}>
                <h2 className='wishtext' style={{margin : "10px"}}>Status Transaksi Bpk/Ibu {this.props.username} </h2> <hr/>        
                {/* ================== Filter Product ==================*/}
                <div className='row mb-4' style={{marginTop:'6px',marginLeft:'4px'}}>
                        <div className='col-md-4'>
                             {this.Dropdown()}
                        </div>
                         <div className='col-md-1'>
                            <input type='button' className='btn btn-primary' value='Filter' onClick={this.filterData}></input>     
                    </div>
                </div>

                 {/* ================== End Filter Product ==================*/}   
                 <div>
                     {
                         this.state.data.length > 0 ?
                         <table className="table table-dark">
                         <thead>
                         <tr>
                             <th scope="col">No</th>                            
                             <th scope="col">Tanggal</th>
                             <th scope="col">No Invoice</th>
                             <th scope="col">Jumlah Item</th>
                             <th scope="col">Total Harga</th>
                             <th scope="col">Status</th>
                         </tr>
                         </thead>
                         <tbody>
                             {this.renderJsx()}
                         </tbody>
                     </table>
                         :
                         <h2 className='protupload' style={{textAlign:'center',marginTop:'50px'}}>BELUM ADA STATUS TERBARU</h2>
                     }
                 
                </div>
                        <p style={{marginTop:'50px'}}><i>NB : Jika Status Belum Terbayar Atau Rejected Silahkan Cek Ulang Email Untuk Konfirmasi Pembayaran</i></p>
            </div>
        )
    }

    
}

const mapStateToProps = (state) => {
    return {
        id : state.user.id,
        username : state.user.username
    }
}

export default connect(mapStateToProps) (PaymentList)