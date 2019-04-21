import React from 'react'
import Axios from 'axios'
import { urlApi } from '../../support/urlApi';
import swal from 'sweetalert';


class ManageCategory extends React.Component{
    
    state = {
        category : [],
        subcategory : [],
        isEditCat : 0,
        isEditSub : 0,
        editItem : {},
        dataPage : 5
    }

    componentDidMount(){
        this.getCategory()
      }

    getCategory = () => {
        Axios.get(urlApi + '/category/category')
          .then((res) => this.setState({category : res.data}))
          .catch((err) => console.log(err))
      }

    onBtnAddCat = () => {
        var newData = {
            category : this.refs.kategori.value
        }
        Axios.post(urlApi + '/category/addcategory', newData)
            .then((res) => {
                swal('Success', res.data, 'success')
                this.getCategory()
                this.refs.kategori.value=''
            })
            .catch((err) => console.log(err))
    }

    onBtnSaveCat = (id) => {
        Axios.put(urlApi + '/category/editcategory/'+id, {category : this.refs.editcat.value})
            .then((res) =>{
                swal('Success', res.data, 'success')
                this.setState({isEditCat:0})
                this.getCategory()
            })
            .catch((err) => console.log(err))
    }

    onBtnDeleteCat = (id) => {
        Axios.delete(urlApi+'/category/deletecategory/'+id)
            .then((res) =>{
                swal('Success', res.data, 'success')
                this.getCategory()
            })
            .catch((err) =>{
                console.log(err)
            })
    }

    renderCategory = () => {
        var category = this.state.category.slice(0,this.state.dataPage)
            var jsx = category.map((val, index) => {
                if(val.id === this.state.isEditCat){
                    return (
                        <tr>
                            <th scope="row">{index+1}</th>
                            <td>
                                <input type = 'text' ref = 'editcat' className='form-control' defaultValue={val.category}/>
                            </td>
                            <td>
                                <input style={{borderRadius:'8px'}} type ='button' className='btn btn-sm btn-success mr-3' value='Save' onClick={() => this.onBtnSaveCat(val.id)}/></td>
                            <td>
                                <input style={{borderRadius:'8px'}} type ='button' className='btn btn-sm btn-warning' value='cancel' onClick={() => this.setState({isEditCat:0})}/> 
                            </td>
                        </tr>
                    )
                }
                return (
                    <tr>
                        <th scope="row">{index+1}</th>
                        <td>{val.category}</td>
                        <td>
                            <input style={{borderRadius:'8px'}} type ='button' className='btn btn-sm btn-primary mr-3' value='Edit' onClick={() => this.setState({isEditCat : val.id})}/></td>
                        <td>
                            <input style={{borderRadius:'8px'}} type='button' className='btn btn-sm btn-danger' value='Delete' onClick={() => this.onBtnDeleteCat(val.id)}/> 
                        </td>
                    </tr>
                )
                
            })
            return jsx
    }
    
    render(){
        return (
                <div className="container" style={{paddingTop:'100px'}}>
                    <h2 className="text-center">Add For All Category</h2>
                    <div className = 'row justify-content-center mb-4'>
                        <div className= 'col-md-3'>
                            <input className="form-control mb-1" ref ="kategori" type="text" placeholder='New Category'/>
                        </div>
                        <div className= 'col-md-2'>
                            <input type="button" className="btn form-control btn-secondary mb-1" onClick={this.onBtnAddCat} value="Add Category"/>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <table style={{fontSize:'15px'}} className="table table-hover table-dark">
                                <thead>
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Do</th>
                                        <th scope="col">Do</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderCategory()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='row justify-content-center'>
                         <p style={{cursor:'pointer',fontStyle:'italic'}} onClick={()=>this.setState({dataPage:this.state.dataPage+5})}>View More</p>
                    </div>
                </div>
        )
    }
}

export default ManageCategory