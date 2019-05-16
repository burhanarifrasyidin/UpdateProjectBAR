import React from 'react'
import Axios from 'axios';
import {urlApi} from './../support/urlApi'
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap'
import {Redirect} from 'react-router-dom'
import swal from 'sweetalert';
import Moment from 'moment'
import {connect} from 'react-redux'
import PageNotFound from './pageNotFound'

// function formatMoney(number) {
//     return number.toLocaleString('in-RP', { style: 'currency', currency: 'IDR' });
// }

class Payment extends React.Component{
    state = {
        data : {},
        detail : [],
        modal : false,
        selectedFile : null,
        success : false
    }

    componentDidMount(){
        this.getDataTransUser()
    }

    getDataTransUser = (id) => {
        // alert(this.props.id)
        var idUrl = this.props.id
        Axios.get(urlApi+'/transaksi/transUser/'+idUrl)
            .then((res) => {
                this.setState({data : res.data[0]})
                Axios.get(urlApi+'/transaksi/transdetailpay/'+ idUrl)
                    .then((res) => {
                        this.setState({detail : res.data})
                    })
                    .catch((err) => console.log(err))

            })
            .catch((err) => console.log(err))
    }


    onChangeHandler =  (event) => {
        //Untuk mendapatkan file  image
        this.setState({selectedFile : event.target.files[0] })
    }
    
    valueHandler = () => {
        var value = this.state.selectedFile ? this.state.selectedFile.name : 'Upload Receipt'
        return value
    }

    renderJsxDetail = (val) => {
        var jsx = this.state.detail.map((val, index) => {
            return <tr>
                        <td>{index + 1}</td>
                        <td>{val.nama_product}</td>
                        <td>{val.quantity}</td>
                        <td>Rp. {val.harga_product}</td>
                   </tr>
        })
        return jsx
    }

    completePayment = () => {
        if(this.state.selectedFile){
            var newData = {
                tanggal_bayar : Moment().format('DD-MM-YYYY, h:mm:ss'),
                status : 'Paid'
            }
            var fd = new FormData()
            fd.append('data', JSON.stringify(newData))
            fd.append('receipt', this.state.selectedFile, this.state.selectedFile.name)
                Axios.put(urlApi+'/transaksi/completePayment/'+this.state.data.order_number, fd)
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


    
    render(){
        
        if(this.state.success){
            return <Redirect to= '/' />
        }
        if(this.props.id){
            return (
                <div className="container myBody" style={{minHeight:"600px",paddingTop:'90px'}}>
                    <div className="row justify-content-sm-center ml-auto mr-auto mt-3" >
                        <form className="border mb-3" style={{padding:"20px", borderRadius:"5%" , backgroundColor:"white"}}>
                            <fieldset>
                                <h2>Terima Kasih Sudah Berbelanja Di Toko Online Kami</h2>
                                <h3>Detail Transaksi Anda :</h3>
                                <p>Order Number : {this.state.data.order_number}</p>
                                <p>Total Item : {this.state.data.item}</p>
                                <p>Total Harga : Rp. {this.state.data.total_harga}</p>
                                <input type='button' className='btn btn-primary' value='Order Detail' onClick={() => this.setState({modal:true})}/>
                                {this.state.data.status === 'Unpaid' ? 
                                <div className="row mt-4 ml-1">
                                    <input style={{display:"none"}} ref="input" type="file" onChange={this.onChangeHandler}/>
                                    <input type="button" className="btn btn-secondary" onClick={() => this.refs.input.click()} value={this.valueHandler()}/>
                                    <input type='button' className='btn btn-success' value='Complete Transaction' onClick={this.completePayment}/>
                                </div> :
                                    <h3>You have already paid this transaction.</h3>
                                }
                                
                            </fieldset>
                        </form>
                    </div>
                     {/* EDIT PRODUCT */}
      <div>
            <Modal isOpen={this.state.modal} toggle={() => this.setState({modal:false})} className={this.props.className}>
              <ModalHeader toggle={() => this.setState({modal:false})}> Order Detail ~ {this.state.data.order_number}</ModalHeader>
              <ModalBody>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Nama Produk</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Harga</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderJsxDetail()}
                        </tbody>
                    </table>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={() => this.setState({modal:false})}>Back</Button>
              </ModalFooter>
            </Modal>
            </div>                
                  </div>
            )
        }
        else {
            return <PageNotFound/>
        }      
    }
}

const mapStateToProps = (state) => {
    return {
        id : state.user.id
    }
}

export default connect(mapStateToProps)(Payment)