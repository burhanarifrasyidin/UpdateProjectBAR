import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios' 
import { urlApi } from '../support/urlApi'
import { Button} from 'semantic-ui-react'
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import swal from 'sweetalert'


class EditProfile extends React.Component{
    state = {edit :[],modal:false,editItem:{},selectedFileEdit:null,selectedFile:null,error:'',isEdit:false}

    componentDidMount=()=>{
        this.getDataApi()
    }
    
    getDataApi = () => {
        axios.get(urlApi + '/profile/profiles/' + this.props.id)
        .then((res) => this.setState({edit : res.data}))
        .catch((err) => console.log(err))
    }

    onBtnEditClick = (param) => {
        this.setState({isEdit : true, editItem : param})
    }

    onBtnBack = () => {
        this.setState({isEdit : false, editItem : {}})
    }

    onBtnAdd = () => {
        if(
            this.refs.nama.value === '' ||
            this.refs.tanggal.value === '' ||
            this.refs.alamat.value === '' ||
            this.refs.jenis.value === '' ||
            this.state.selectedFile === null){
              alert('Masukkan semua data')
            } else {
              var newData = {nama : this.refs.nama.value , tanggal_lahir : this.refs.tanggal.value ,
                alamat : this.refs.alamat.value , jenis_kelamin: this.refs.jenis.value,id_user : this.props.id }
      
              var fd = new FormData()
              fd.append('data' , JSON.stringify(newData))
              fd.append('image', this.state.selectedFile,this.state.selectedFile.nama)
              axios.post(urlApi + '/profile/addProfile', fd)
              .then((res) => {
              if(res.data.error){
              this.setState({error : res.data.msg})
              } else {
              swal("Profile Added", "New product has been added", "success")
                this.getDataApi()
                this.refs.nama.value=''
                this.refs.tanggal.value=''
                this.refs.alamat.value=''
                this.refs.jenis.value=''
                this.setState({selectedFile: null})
              }
              })
              .catch((err) => console.log(err))
            }
    }

    onBtnSave = () => {
        var data = {
            nama : this.refs.namaEdit.value ? this.refs.namaEdit.value : this.state.editItem.nama,
            tanggal_lahir : this.refs.tanggalEdit.value ? this.refs.tanggalEdit.value : this.state.editItem.tanggal_lahir,
            alamat : this.refs.alamatEdit.value ? this.refs.alamatEdit.value : this.state.editItem.alamat,
            jenis_kelamin : this.refs.jenisEdit.value ? this.refs.jenisEdit.value : this.state.editItem.jenis_kelamin
            // phone : this.refs.phoneEdit.value ? this.refs.phoneEdit.value : this.state.editItem.phone
          }
          if(this.state.selectedFileEdit){
            var fd = new FormData()
            fd.append('edit', this.state.selectedFileEdit)
            fd.append('data' , JSON.stringify(data))
            fd.append('imageBefore' , this.state.editItem.image)
            axios.put('http://localhost:2008/profile/editProfile/'+ this.state.editItem.id,fd)
              .then((res) => {
                swal("Profile Edited", res.data, "success")  
                this.getDataApi()
                this.setState({modal:false})
              })
              .catch((err) => {
                console.log(err)
              })
          }else {
            axios.put('http://localhost:2008/profile/editProfile/'+ this.state.editItem.id, data)
            .then((res) =>{
              swal("Profile Edited", res.data, "success")  
              this.getDataApi()
              this.setState({modal:false})
            })
            .catch((err) =>{
              console.log(err)
            })
        }
    }

    onChangeHandler = (event) => {
        this.setState({selectedFile : event.target.files[0]})
    }
    
    valueHandler = () => {
        var value = this.state.selectedFile ? this.state.selectedFile.name : 'Insert a picture'
        return value
    }
    
    onChangeHandlerEdit = (event) => {
        this.setState({selectedFileEdit : event.target.files[0]})
    }
    
    valueHandlerEdit = () => {
      var value = this.state.selectedFileEdit ? this.state.selectedFileEdit.name : 'Pick a Picture'
      return value
    }

    renderJsx = () => {
        var jsx = this.state.edit.map((val)=>{
            if(this.props.role === 'admin'){
                return(
                    <form>
                    <fieldset>
                    <div style={{marginLeft:'112px'}}>
                    <img src="https://icon2.kisspng.com/20180702/jyf/kisspng-detective-pikachu-pokmon-go-pokkn-tournament-5b3ac4a91d5459.2114102415305780891201.jpg" height="150px" alt="..." class="rounded-circle"/>
                    </div><br/>
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Username</label>
                        <div class="col-sm-2">
                            <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={': ' + val.username}></input>
                        </div>                
                    </div>
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Nama</label>
                        <div class="col-sm-2">
                            <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={': ' + val.nama}></input>
                        </div>                
                    </div>
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Tanggal Lahir</label>
                        <div class="col-sm-4">
                            <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={': ' + val.tanggal_lahir}></input>
                        </div>                
                    </div>
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Alamat</label>
                        <div class="col-sm-5">
                            <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={': ' + val.alamat}></input>
                        </div>                
                    </div>
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Jenis Kelamin</label>
                        <div class="col-sm-2">
                            <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={': ' + val.jenis_kelamin}></input>
                        </div>                
                    </div>
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-4">
                            <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={': ' + val.email}></input>
                        </div>                
                    </div>
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Telephone</label>
                        <div class="col-sm-3">
                            <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={': ' + val.phone}></input>
                        </div>                
                    </div>
                    <input style={{marginLeft:'150px',borderRadius:'20px'}} type="button" className='btn btn-primary' value='Edit Profile' onClick={() => this.setState({modal :true , editItem: val})}></input>
                    </fieldset>
                    </form>
                )
            }else{
                return(
                    <form >
                    <fieldset>
                    <div style={{marginLeft:'112px'}}>
                    <img src={`http://localhost:2008/`+val.image} width='150px' height="150px" alt="pict" class="rounded-circle"/>
                    </div><br/>
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Username</label>
                        <div class="col-sm-2">
                            <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={':  ' + val.username}></input>
                        </div>                
                    </div>
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Nama</label>
                        <div class="col-sm-2">
                            <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={':  ' + val.nama}></input>
                        </div>                
                    </div>
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Tanggal Lahir</label>
                        <div class="col-sm-4">
                            <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={':  ' + val.tanggal_lahir}></input>
                        </div>                
                    </div>
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Alamat</label>
                        <div class="col-sm-5">
                            <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={':  ' + val.alamat}></input>
                        </div>                
                    </div>
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Jenis Kelamin</label>
                        <div class="col-sm-2">
                            <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={':  ' + val.jenis_kelamin}></input>
                        </div>                
                    </div>
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-4">
                            <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={':  ' + val.email}></input>
                        </div>                
                    </div>
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Telephone</label>
                        <div class="col-sm-3">
                            <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={':  ' + val.phone}></input>
                        </div>                
                    </div>
                    <input style={{marginLeft:'150px',borderRadius:'20px'}} type="button" className='btn btn-primary' value='Edit Profile' onClick={() => this.setState({modal :true , editItem: val})}></input>
                    </fieldset>
                    </form>
                )
            }
        })
        return jsx
    }

    render(){
        return(
            <div className="container" style={{marginTop:'80px',marginLeft:'430px'}}>
                <div className = 'row mt-3 mb-2'>
                    <div className= 'col-md-4'>
                        <input style={{marginLeft:'10px',borderRadius:'20px',marginBottom:'4px'}} type="button" className='btn btn-secondary' onClick={this.onBtnEditClick} value=' + '></input>
                        {
                        this.state.isEdit === true ?
                        <div>
                        <input className="form-control mb-1" ref ="nama" type="text" placeholder='Ketik Nama'/>
                        <input className="form-control mb-1" ref="tanggal" type="text" placeholder='Ketik Tanggal Lahir'/>
                        <input className="form-control mb-1" ref="alamat" type="text" placeholder='Ketik Alamat'/>
                        <select className='form-control mt-3' ref='jenis'>
                                <option>Pilih Jenis Kelamin</option>
                                <option>pria</option>
                                <option>wanita</option>
                            </select><br/>
                         {/* <input className="form-control mb-1" ref="jenis" type="text" placeholder='Ketik Jenis Kelamin'/> */}
                        <input style={{display:"none"}} ref="input" type="file" onChange={this.onChangeHandler}/>
                        <input type="button" style={{borderRadius:'40px'}} className="form-control btn-secondary mb-1" onClick={() => this.refs.input.click()} value={this.valueHandler()}/>
                         {
                             this.state.error ? <p style={{color:'red'}}>{this.state.error}</p> : null
                        }
                        <input style={{marginLeft:'10px',borderRadius:'20px',marginBottom:'4px'}} type="button" className='btn btn-primary' onClick={this.onBtnAdd} value='Add Profile'></input>
                        <input style={{marginLeft:'10px',borderRadius:'20px',marginBottom:'4px'}} type="button" className='btn btn-dark' onClick={this.onBtnBack} value='Back'></input></div>
                        : null
                        } 
                    
                        
                    </div>
                    <div class="col-sm-4">
                </div>                
            </div>
            <div>
            {this.renderJsx()}
            </div>
            {/* =================== edit profile =====================*/}
            <div>
                    <Modal isOpen={this.state.modal} toggle={() => this.setState({modal:false})} className={this.props.className}>
                    <ModalHeader toggle={() => this.setState({modal:false})}>Edit Profile~ {this.state.editItem.username}</ModalHeader>
                    <ModalBody>
                        <div className = "row">
                        <div className="col-md-3">
                            <img src={'http://localhost:2008/'+this.state.editItem.image} width='100%' alt='broken' />
                            <input type = "file" onChange={this.onChangeHandlerEdit} style={{display:"none"}} ref='inputEdit'/><br/><br/>
                            <input type="button" value={this.valueHandlerEdit()} className= "btn btn-primary" onClick={() => this.refs.inputEdit.click()}/>
                        </div>
                        <div className="col-md-9">
                            <input type = "text" className='form-control mt-3' ref='namaEdit' placeholder={this.state.editItem.nama}/><br/>
                            <input type = "text" className='form-control' ref='tanggalEdit' placeholder={this.state.editItem.tanggal_lahir}/><br/>
                            <input type = "text" className='form-control' ref='alamatEdit' placeholder={this.state.editItem.alamat}/><br/>
                            {/* <input type = "text" className='form-control' ref='jenisEdit' placeholder={this.state.editItem.jenis_kelamin}/> */}
                            <select className='form-control mt-3' ref='jenisEdit'>
                                <option>{this.state.editItem.jenis_kelamin}</option>
                                <option>wanita</option>
                            </select><br/>
                            {/* <input type = "number" className='form-control' ref='phoneEdit' placeholder={this.state.editItem.phone}/> */}
                            
                        </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.onBtnSave()}>Save</Button>{' '}
                        <Button color="secondary" onClick={() => this.setState({modal:false})}>Cancel</Button>
                    </ModalFooter>
                    </Modal>
                    </div>
            {/* =================== end edit profile =====================*/}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username : state.user.username,
        id : state.user.id,
        role : state.user.role
    }
}

export default connect(mapStateToProps)(EditProfile)