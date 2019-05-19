import React from 'react'
import Axios from 'axios'
import { urlApi } from '../../support/urlApi';
import swal from 'sweetalert';


class ManageCategory extends React.Component{
    
    state = {
        category : [],
        isEditCat : 0,
        editItem : {},
        dataPage : 5,filterCat:5
    }

    componentDidMount(){
        this.getCategory()
        // this.getDataUrl()
        // this.getDataCat()
    }

    getCategory = () => {
        Axios.get(urlApi + '/category/category')
          .then((res) => this.setState({category : res.data}))
          .catch((err) => console.log(err))
    }

    // getDataUrl = () => {
    //     if(this.props.location.search){
    //       var obj = QueryString.parse(this.props.location.search)
    //       if(obj.category){
    //         this.setState({filterCat:obj.category})
    //       }
    //     }
    // }

    // getDataCat = () => {
    //     Axios.get(urlApi + '/category/filtercat')
    //     .then((res)=>{
    //       this.setState({dataCategory:res.data})
    //     })
    // }

    // pushUrl = () => {
    //     var newLink = '/filtercat'
    //     var params= []
    //     if(this.refs.dropdown.value > 0){
    //       params.push({
    //         params:'category',
    //         value:this.refs.dropdown.value
    //       })
    //     }
    //     for(var i = 0;i<params.length;i++){
    //         if(i == 0){
    //           newLink += '?' + params[i].params + '=' + params[i].value
    //         }
    //       }
    //     this.props.history.push(newLink)

    // }

    onBtnSearch = () => {
        var category = this.refs.dropdown.value
        if(category == 0){
            this.getCategory()
        }else{
            Axios.get(urlApi + '/category/filterCat?category='+this.refs.dropdown.value)
            .then((res)=>{
                this.setState({category:res.data})
            })

        }
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
        var data = this.state.category.slice(0,this.state.dataPage)
            var jsx = data.map((val, index) => {
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
                        <div className='col-md-3'>
                            <select ref='dropdown' className='form-control'>
                                 <option value={0}>All Category</option>
                                    {
                                    this.state.category.map((val)=>{
                                        return(
                                        <option value={val.category}>{val.category}</option>
                                        )
                                    })
                                    }
                            </select>
                        </div>
                <div className='col-md-1'>
                <input type='button' className='btn btn-primary' value='search' onClick={this.onBtnSearch}></input>
                </div>
                    </div>
                    <div className="row justify-content-center">
                            <table style={{fontSize:'15px'}} className="table table-hover table-dark">
                                <thead>
                                    <tr>
                                        <th scope="col">NO</th>
                                        <th scope="col">CATEGORY</th>
                                        <th scope="col">ACT</th>
                                        <th scope="col">ACT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderCategory()}
                                </tbody>
                            </table>
                    </div>
                    <div className='row justify-content-center'>
                         <p style={{cursor:'pointer',fontStyle:'italic'}} onClick={()=>this.setState({dataPage:this.state.dataPage+5})}>View More</p>
                    </div>
                </div>
        )
    }
}

export default ManageCategory