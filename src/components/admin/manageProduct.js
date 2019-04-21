import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Axios from 'axios';
import { Button,Icon} from 'semantic-ui-react';
import { urlApi } from '../../support/urlApi';
import { connect } from 'react-redux';
import PageNotFound from './../pageNotFound';
import swal from 'sweetalert';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class CustomPaginationActionsTable extends React.Component {
  state = {
    rows: [],
    page: 0,
    rowsPerPage: 5,
    isEdit : false,
    editItem : {},
    selectedFile:null,
    error:'',
    modal:false,
    selectedFileEdit:null,category:[]
  };

  componentDidMount(){
    this.getDataApi()
    this.getCategory()
  }

  getDataApi = () => {
      Axios.get(urlApi + '/product/products')
      .then((res) => this.setState({rows : res.data}))
      .catch((err) => console.log(err))
  }

  getCategory = () => {
    Axios.get(urlApi + '/category/category')
      .then((res) => this.setState({category : res.data}))
      .catch((err) => console.log(err))
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

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


  onBtnAdd = () => {
    if(
      this.refs.nama.value === '' ||
      this.refs.harga.value === '' ||
      this.refs.diskon.value === '' ||
      this.refs.category.value === '' ||
      this.refs.deskripsi.value === '' ||
      this.state.selectedFile === null){
        alert('Masukkan semua data')
      } else {
        var newData = {nama_product : this.refs.nama.value , harga_product : this.refs.harga.value ,
          discount_product : this.refs.diskon.value , category_product: this.refs.category.value ,deskripsi_product : this.refs.deskripsi.value }

        var fd = new FormData()
        fd.append('data' , JSON.stringify(newData))
        fd.append('image', this.state.selectedFile,this.state.selectedFile.nama)
        Axios.post(urlApi+'/product/addproduct', fd)
        .then((res) => {
        if(res.data.error){
        this.setState({error : res.data.msg})
        } else {
        swal("Product Added", "New product has been added", "success")
          this.getDataApi()
          this.refs.nama.value=''
          this.refs.harga.value=''
          this.refs.diskon.value=''
          this.refs.category.value=''
          this.refs.deskripsi.value=''
          this.setState({selectedFile: null})
        }
        })
        .catch((err) => console.log(err))
      }
  }

  onBtnCancel = () => {
    this.setState({isEdit : false, editItem : {}})
  }

  onBtnSave = () => {
    var data = {
      nama_product : this.refs.namaEdit.value ? this.refs.namaEdit.value : this.state.editItem.nama_product ,
      harga_product : this.refs.hargaEdit.value ? this.refs.hargaEdit.value : this.state.editItem.harga_product,
      discount_product : this.refs.diskonEdit.value ? this.refs.diskonEdit.value : this.state.editItem.discount_product,
      category_product : this.refs.kategoriEdit.value ? this.refs.kategoriEdit.value : this.state.editItem.category_product,
      deskripsi_product : this.refs.deskripsiEdit.value ? this.refs.deskripsiEdit.value : this.state.editItem.deskripsi_product
    }
    if(this.state.selectedFileEdit){
      var fd = new FormData()
      fd.append('edit', this.state.selectedFileEdit)
      fd.append('data' , JSON.stringify(data))
      fd.append('imageBefore' , this.state.editItem.image)
      Axios.put('http://localhost:2008/product/editproduct/'+ this.state.editItem.id,fd)
        .then((res) => {
          swal("Product Edited", res.data, "success")  
          this.getDataApi()
          this.setState({modal:false})
        })
        .catch((err) => {
          console.log(err)
        })
    }else {
      Axios.put('http://localhost:2008/product/editproduct/'+ this.state.editItem.id, data)
      .then((res) =>{
        swal("Product Edited", res.data, "success")  
        this.getDataApi()
        this.setState({modal:false})
      })
      .catch((err) =>{
        console.log(err)
      })
    }
    
  }

  onBtnDelete = (id) => {
      Axios.delete(urlApi + '/product/deleteproduct/' + id)
      .then((res) => {
        swal("Product Deleted" ,res.data, "success")
          this.getDataApi()
      })
      .catch((err) => console.log(err))
  };


  renderJsx = () => {
    var jsx = this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((val) => {
        return (
            <TableRow key={val.id}>
                <TableCell>{val.id}</TableCell>
                  <TableCell component="th" scope="row">
                    {val.nama_product}
                  </TableCell>
                  <TableCell>Rp. {val.harga_product}</TableCell>
                  <TableCell>{val.discount_product}%</TableCell>
                  <TableCell>{val.category_product}</TableCell>
                  <TableCell><img src={`http://localhost:2008/`+val.image} alt='pict' width='40px'/></TableCell>
                  <TableCell>{val.deskripsi_product}</TableCell>
                  <TableCell>
                  <Button animated color='blue' style={{borderRadius:'40px'}}onClick={() => this.setState({modal :true , editItem: val})}>
                    <Button.Content visible>Edit</Button.Content>
                    <Button.Content hidden>
                    <Icon name='edit' />
                     </Button.Content>
                 </Button>
                 <Button animated color='red' style={{borderRadius:'40px',marginTop:'2px'}} onClick={() => this.onBtnDelete(val.id)}>
                    <Button.Content visible>Del</Button.Content>
                    <Button.Content hidden>
                    <Icon name='delete' />
                     </Button.Content>
                 </Button>
                 </TableCell>
            </TableRow>
        )
    })
    return jsx
  }

  dropdownCategory = () => {
    var jsx = this.state.category.map((val) => {
      return <option value={val.id}>{val.category}</option>
    })
    return jsx
  }

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    if(this.props.role === 'admin'){
      return (
        <div className='container' style={{marginTop:'80px'}}>
          {/* {======= Add Produk =========} */}
          <h2>Add Product ~ Bike</h2>
          <div className = 'row mt-3 mb-2'>
              <div className= 'col-md-4'>
                  <input className="form-control mb-1" ref ="nama" type="text" placeholder='Masukkan nama barang'/>
                  <input className="form-control mb-1" ref="harga" type="number" placeholder='Masukkan harga barang'/>
                  <input className="form-control mb-1" ref="diskon" type="number" placeholder='Masukkan diskon barang'/>
              </div>
              <div className= 'col-md-4'>
                  <select className="form-control mb-1" ref="category">
                  {this.dropdownCategory()}</select>
                  <textarea className="form-control mb-1" ref="deskripsi" rows="3" placeholder='Masukkan deskripsi'/>
              </div>
              <div className= 'col-md-3'>
                  <input style={{display:"none"}} ref="input" type="file" onChange={this.onChangeHandler}/>
                  <input type="button" style={{borderRadius:'40px'}} className="form-control btn-secondary mb-1" onClick={() => this.refs.input.click()} value={this.valueHandler()}/>
                  <input type="button" style={{borderRadius:'40px'}} className="form-control btn-secondary mb-1" onClick={this.onBtnAdd} value="ADD PRODUCT"/>
                  {
                    this.state.error ? <p style={{color:'red'}}>{this.state.error}</p> : null
                  }
              </div>
          </div>
          {/* {============ End of Add Produk ===============} */}
          <Paper className={classes.root}>
            <div className={classes.tableWrapper}>
              <Table className={classes.table}>
              <TableHead>
                  <TableRow>
                      <TableCell style={{fontSize:'24px',fontWeight:'600'}}>ID</TableCell>
                      <TableCell style={{fontSize:'24px',fontWeight:'600'}}>NAMA</TableCell>
                      <TableCell style={{fontSize:'24px',fontWeight:'600'}}>HARGA</TableCell>
                      <TableCell style={{fontSize:'24px',fontWeight:'600'}}>DISC</TableCell>
                      <TableCell style={{fontSize:'24px',fontWeight:'600'}}>CTGRY</TableCell>
                      <TableCell style={{fontSize:'24px',fontWeight:'600'}}>IMG</TableCell>
                      <TableCell style={{fontSize:'24px',fontWeight:'600'}}>DESC</TableCell>
                  </TableRow>
              </TableHead>
                <TableBody>
                    {this.renderJsx()}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 48 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      colSpan={3}
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        native: true,
                      }}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActionsWrapped}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </Paper>
          
    
          {/* {======= Edit Produk =========} */}
          <div>
        <Modal isOpen={this.state.modal} toggle={() => this.setState({modal:false})} className={this.props.className}>
          <ModalHeader toggle={() => this.setState({modal:false})}>Edit Produk ~ {this.state.editItem.nama_product}</ModalHeader>
          <ModalBody>
            <div className = "row">
              <div className="col-md-3">
                <img src={'http://localhost:2008/'+this.state.editItem.image} width='100%' alt='broken' />
                <input type = "file" onChange={this.onChangeHandlerEdit} style={{display:"none"}} ref='inputEdit'/>
                <input type="button" value={this.valueHandlerEdit()} className= "btn btn-primary" onClick={() => this.refs.inputEdit.click()}/>
              </div>
              <div className="col-md-9">
                <input type = "text" className='form-control' ref='namaEdit' placeholder={this.state.editItem.nama_product}/>
                <input type = "number" className='form-control mt-3' ref='hargaEdit' placeholder={this.state.editItem.harga_product}/><br/>
                <input type = "number" className='form-control' ref='diskonEdit' placeholder={this.state.editItem.discount_product}/>
                <select className='form-control mt-3' ref='kategoriEdit'>
                {this.dropdownCategory()}
                </select>
                <textarea type = "text" row='3' className='form-control mt-3' ref='deskripsiEdit' placeholder={this.state.editItem.deskripsi_product}/>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.onBtnSave()}>Save</Button>{' '}
            <Button color="secondary" onClick={() => this.setState({modal:false})}>Cancel</Button>
          </ModalFooter>
        </Modal>
        </div>
        {/* {=========== End Of Edit Product ==================} */}
          </div>
        );
    }return <PageNotFound/>
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return{
    role : state.user.role
  }
}

export default connect (mapStateToProps)(withStyles(styles)(CustomPaginationActionsTable));