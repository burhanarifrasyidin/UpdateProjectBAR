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
import { Button,Icon,Input } from 'semantic-ui-react';
import { urlApi } from './../support/urlApi';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import {Link} from 'react-router-dom';
import {cartCount,resetCount} from './../1.actions';



function formatMoney(number) {
  return number.toLocaleString('in-RP', { style: 'currency', currency: 'IDR' });
}

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
    
  };

  componentDidMount(){
    this.getDataApi()
  }

  getDataApi = () => {
      Axios.get(urlApi + '/cart?id_user=' + this.props.id)
      .then((res) => this.setState({rows : res.data}))
      .catch((err) => console.log(err))
  }

  
  handleChangePage = (event, page) => {
      this.setState({ page });
    };
    
    
    onBtnEditClick = (param) => {
        this.setState({isEdit : true, editItem : param})
    } 
    
    onBtnDelete = (id) => {
        Axios.delete(urlApi + '/cart/' + id)
        .then(() => {
            this.getDataApi()
            this.props.cartCount(this.props.username)
            swal("Delete Product", "Selamat Anda Berhasil Delete", "success");
        })
        .catch((err) => console.log(err))
    };
    
    onBtnSave = () => {
        var nama = this.state.editItem.nama
        var harga = this.state.editItem.harga
        var discount = this.state.editItem.discount
        var category = this.state.editItem.category
        var img = this.state.editItem.img
        var deskripsi = this.state.editItem.deskripsi
        var id_product = this.state.id
        var id_user = this.props.id
        var qty = parseInt(this.qty.inputRef.value) === '' ? parseInt(this.state.editItem.qty) : parseInt(this.qty.inputRef.value)
        var note = this.state.editItem.note
    var newData = {id_user,id_product,note,nama,harga,discount,category,img,deskripsi,qty}
    Axios.put(urlApi + '/cart/'+ this.state.editItem.id,newData)
    .then((res) => {
        swal("Selamat!!", "Anda Berhasil Save Qty Produk", "success");
        this.getDataApi()
        this.setState({isEdit : false, editItem : {}})
        
    })
    .catch((err) => console.log(err))
}

onBtnCancel = () => {
    swal("Selamat!!", "Anda Berhasil Cancel Edit Qty Produk", "success");
    this.setState({isEdit : false, editItem : {}})
}

getTotalHarga = () => {
    var harga = 0 
    for(var i =0;i<this.state.rows.length;i++){
        harga += parseInt((this.state.rows[i].harga-(this.state.rows[i].harga*(this.state.rows[i].discount/100)))*this.state.rows[i].qty)
    }
    return harga
}

getItem = () => {
  var arr = []
  for(var i = 0 ; i < this.state.rows.length ; i++){
    var nama = this.state.rows[i].nama 
    var harga = this.state.rows[i].harga 
    var discount= this.state.rows[i].discount  
    var qty = this.state.rows[i].qty
    var data = {nama, harga, qty, discount}
    arr.push(data)
  }
  return arr
}

deleteCart = () => {
  for(var i = 0 ; i < this.state.rows.length ; i++){
    Axios.delete(urlApi + '/cart/' + this.state.rows[i].id)
    .then((res) => {
      this.props.resetCount()
      this.getData()
    })
  }
}

cekOut = () => {
  var date = new Date()
    var newData = {
      idUser : this.props.id,
      username : this.props.username,
      tanggal : String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear(),
      waktu : String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0') + ':' + String(date.getSeconds()).padStart(2, '0'),
      total : this.getTotalHarga(),
      item : this.getItem()
    }
    Axios.post(urlApi + '/history' , newData)
    .then((res) => {
      swal('Checkout Status' , 'Sukses','success')
      this.deleteCart()
    })
}

  renderJsx = () => {
    var jsx = this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((val) => {
        return (
            <TableRow key={val.id}>
                <TableCell>{val.id}</TableCell>
                  <TableCell component="th" scope="row">
                    {val.nama}
                  </TableCell>
                  <TableCell>Rp. {val.harga}</TableCell>
                  <TableCell>{val.discount}%</TableCell>
                  <TableCell>{val.qty}</TableCell>
                  {/* {
                    this.state.isEdit===true && this.state.editIndex===index?
                  <TableCell align="center">
                  <input ref="quantity" type="number" defaultValue={val.qty}>
                  </input></TableCell>:
                  <TableCell align="center">{val.qty}</TableCell>
                  } */}
                  <TableCell>
                    {formatMoney((val.harga - (val.harga*(val.discount/100)))*val.qty)}
                  </TableCell>
                  <TableCell>
                  <Button animated color='blue' onClick={() => this.onBtnEditClick(val)}>
                    <Button.Content visible><i class="fas fa-edit"></i></Button.Content>
                    <Button.Content hidden>
                    <Icon name='edit' />
                     </Button.Content>
                 </Button><br/><br/>
                 <Button animated color='red' onClick={() => this.onBtnDelete(val.id)}>
                    <Button.Content visible><i class="fas fa-trash"></i></Button.Content>
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

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    // destructering untuk manggil di place holder dengan cukup nama,harga dll
    // var {nama,harga,discount,category,deskripsi,img} = this.state.editItem;
    
      return (
        <div className='container' style={{marginTop : '80px'}}>
        { rows.length > 0 ?
        <div>
        <Paper className={classes.root}>
            <div className={classes.tableWrapper}>
              <Table className={classes.table}>
              <TableHead>
                  <TableRow>
                      <TableCell style={{fontSize:'24px',fontWeight:'600'}}>ID</TableCell>
                      <TableCell style={{fontSize:'24px',fontWeight:'600'}}>NAMA</TableCell>
                      <TableCell style={{fontSize:'24px',fontWeight:'600'}}>HARGA</TableCell>
                      <TableCell style={{fontSize:'24px',fontWeight:'600'}}>DISC</TableCell>
                      <TableCell style={{fontSize:'24px',fontWeight:'600'}}>QTY</TableCell>
                      <TableCell style={{fontSize:'24px',fontWeight:'600'}}>TOTAL</TableCell>
                      <TableCell style={{fontSize:'24px',fontWeight:'600'}}>ACT</TableCell>
                  </TableRow>
              </TableHead>
                <TableBody>
                    {this.renderJsx()}
                  {emptyRows > 0 && (
                    <TableRow>
                      <TableCell colSpan={7}>
                        <h1 style={{fontWeight:'bold'}}>Total Belanja : <b>{formatMoney(this.getTotalHarga())} </b> </h1>
                        </TableCell>
                      <TableCell colSpan={6} >
                      <Link to='/history'><Button style={{marginLeft:'-250px'}} animated color='blue' onClick={this.cekOut}>
                          <Button.Content visible>CheckOut</Button.Content>
                          <Button.Content hidden>
                          <Icon name='check' />
                          </Button.Content>
                      </Button></Link>
                      </TableCell>

                      <TableCell colSpan={6} >
                      <Link to='/product'><Button style={{marginLeft:'-180px'}} animated color='green' onClick={this.conShop}>
                          <Button.Content visible>Continue Shop</Button.Content>
                          <Button.Content hidden>
                          <Icon name='check' />
                          </Button.Content>
                      </Button>
                      </Link>
                      </TableCell>
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
        
        </div>
        : <Link to='/'><div className='row justify-content-center p-2'><div className='col-md-6' style={{paddingTop:'200px'}}><input type='button' value='Your Cart Is Empty,Continue Shopping' className='btn btn-success' style={{fontSize:'27px',fontWeight:'bold',textAlign:'center'}}></input></div></div></Link>
        } 
        
          
          {
          this.state.isEdit === true ?
          <Paper className='mt-3'>
              <Table>
                  <TableHead>
                    <TableRow>
                        <TableCell style={{fontSize:'24px',fontWeight:'600'}}>EDIT QTY PRODUCT</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                      <TableRow>
                          <TableCell>
                            <Input ref={input => this.qty = input} type='number' min={0} placeholder='Qty' className='mt-2 ml-2 mb-2'></Input>
                             <Button animated color='teal' className='mt-2 ml-2 mb-2' onClick={this.onBtnSave}>
                                <Button.Content visible>Save</Button.Content>
                                <Button.Content hidden>
                                <Icon name='save' />
                                </Button.Content>
                            </Button>
    
                            <Button animated color='yellow' className='mt-2 ml-2 mb-2' onClick={this.onBtnCancel}>
                                <Button.Content visible>Cancel</Button.Content>
                                <Button.Content hidden>
                                <Icon name='cancel' />
                                </Button.Content>
                            </Button>
                            </TableCell>
                      </TableRow>
                  </TableBody>
            </Table>
          </Paper>
          : null
          }
          </div>
        );
    
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return{
    role : state.user.role,
    id : state.user.id,
    cart : state.cart.count,
    username : state.user.username
  }
}

export default connect (mapStateToProps,{cartCount,resetCount})(withStyles(styles)(CustomPaginationActionsTable));