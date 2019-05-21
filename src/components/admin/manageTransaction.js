import React from 'react'
import { urlApi } from '../../support/urlApi'
import Axios from 'axios';
import {connect} from 'react-redux'
import PageNotFound from './../pageNotFound'
import {Modal, ModalHeader, ModalBody, ModalFooter,Button} from 'reactstrap'
import swal from 'sweetalert'
import {countTransaksi} from './../../1.actions'

function formatMoney(number) {
    return number.toLocaleString('in-RP', { style: 'currency', currency: 'IDR' });
}

class ManageTransaction extends React.Component{
   
    state = {
        data : [],
        receipt :'',
        modal:false
    }
    
    componentDidMount(){
        this.getDataTransactions()
    }

    getDataTransactions = () => {
        Axios.get(urlApi+ '/transaksi/transaction')
            .then((res) => {
                this.setState({data : res.data})
            })
            .catch((err) => console.log(err))
    }

    approveTransaction = (id) => {
        Axios.put(urlApi+ '/transaksi/approve/' + id, {status : 'Approved'})
            .then((res) => {
                swal('Success', res.data, 'success')
                this.getDataTransactions()
                this.props.countTransaksi()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    rejectTransaction = (param) => {
        var newData = {
            status : 'Rejected',
            no : param.order_number,
            username : param.username,
            email : param.email
        }
        
        Axios.put(urlApi+ '/transaksi/rejecttrans/'+ param.id, newData)
            .then((res) => {
                swal('Success', res.data, 'success')
                this.getDataTransactions()
                this.props.countTransaksi()
            })
            .catch((err) => console.log(err))
    }

    renderJsx = () => {
        var jsx = this.state.data.map((val, index) => {
            return (
                    <tr>
                        <th scope="row">{index+1}</th>
                        <td>{val.tanggal}</td>
                        <td>{val.waktu}</td>
                        <td>{val.username}</td>
                        <td>{val.item}</td>
                        <td>{formatMoney(val.total_harga)}</td>
                        <td>{val.status}</td>
                        <td>
                            <input type='button' className='btn btn-danger' value='Receipt' onClick={() => this.setState({receipt : val.bukti_transaksi, modal : true })} />
                        </td>
                        <td>
                            <input type='button' className='btn btn-success' value='Approve' onClick={() => this.approveTransaction(val.id)} />
                        </td>
                        <td>
                            <input type='button' className='btn btn-primary' value='Reject' onClick={() => this.rejectTransaction(val)}/>  
                        </td>
                    </tr>
            )
        })
        return jsx
    }

    
    render() {
        if(this.props.role === 'admin'){
            return (
                <div className="container" style={{paddingTop:'100px'}}>
                <table className="table table-dark">
                        <thead>
                        <tr>
                            <th scope="col">NO</th>
                            <th scope="col">TANGGAL BAYAR</th>
                            <th scope="col">WAKTU</th>
                            <th scope="col">USERNAME</th>
                            <th scope="col">ITEM</th>
                            <th scope="col">TOTAL HARGA</th>
                            <th scope="col">STATUS</th>
                            <th scope="col">RECEIPT CUST</th>
                            <th scope="col">ACT</th>
                            <th scope="col">ACT</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.renderJsx()}
                        </tbody>
                    </table>
                    <div>
                        <Modal isOpen={this.state.modal} toggle={() => this.setState({modal:false})} className={this.props.className}>
                        <ModalHeader toggle={() => this.setState({modal:false})}> Transaction Receipt </ModalHeader>
                        <ModalBody>
                            {this.state.receipt ? 
                             <img src={'http://localhost:2008/'+this.state.receipt} width='100%' alt='broken' />
                             : 
                             <h2>No Transactions Receipt</h2>
                            
                            }
                           
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={() => this.setState({modal:false})}>Back</Button>
                        </ModalFooter>
                        </Modal>
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
        role : state.user.role,
        email : state.user.email

    }
}

export default connect(mapStateToProps,{countTransaksi})(ManageTransaction) 