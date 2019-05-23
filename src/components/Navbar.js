import React, {Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem
} from 'reactstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import terserah from 'universal-cookie';
import {resetUser,resetCount,getSearchData} from './../1.actions'

const objCookie = new terserah()
class HeaderKu extends Component {
    state = {search:''}

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    onBtnLogout = () => {
        objCookie.remove('userData')
        this.props.resetUser()
        this.props.resetCount()
    }

    valueHandler = () => {
        this.setState({search : this.refs.searchBook.value})
    }

    onBtnSearch = () => {
        this.props.getSearchData(this.state.search.toLowerCase())
        this.refs.searchBook.value=''
    }

    render() {
        if(this.props.bebas === ""){
            return (
                <div className='navcolor'>
                <div style = {{marginBottom: "75px",position:'absolute'}}>
                    <Navbar light expand = "md" fixed = "top" style={{height:'60px',backgroundImage:'linear-gradient(178deg,#242426,#242426)'}} >
                        <NavbarBrand className = "ml-2" style={{fontSize:'20px'}}>
                            <Link to = '/'><img src = "http://www.logospng.com/images/6/10-reasons-why-google-optimise-is-my-favourite-split-6432.png" alt = "brand" width = "30px" height='30px'/><span className='navbartext'>OnOSepeda.Com</span></Link>
                        </NavbarBrand>
                    <NavbarToggler onClick = {this.toggle}/><Collapse isOpen = {this.state.isOpen}navbar >
                        <Nav className = "ml-auto"navbar >
                        <NavItem >
                        <div className = "input-group"
                            style = {{width: "350px",marginTop:'2.5px'}}>
                            <input type = "text" ref = "searchBook" onChange ={this.valueHandler} className = "form-control border-primary"
                            placeholder = "Masukkan kata kunci ... " />
                            <div className = "input-group-append mr-2" >
                                <Link to={'/product?q='+this.state.search}><button  style={{color:'white'}} className = "btn border-primary" type = "button" onClick ={this.onBtnSearch}><i className = "fas fa-search" /></button>
                                </Link>
                            </div>
                        </div>  
                        </NavItem>
            
                        <NavItem >
                            <Link to = "/register"><NavLink className = "btn btn-default border-primary mr-2" style = {{fontSize: "14px",color:'white'}}><i className = "fas fa-user-plus" />Daftar</NavLink>
                            </Link >
                         </NavItem> 
                    
                         <NavItem >
                             <Link to = "/login"><NavLink className = "btn btn-default border-primary" style = {{fontSize: "14px",color:'white'}}><i className = "fas fa-sign-in-alt" />Masuk</NavLink>
                             </Link>
                         </NavItem>
                        </Nav>
                      </Collapse>
                      </Navbar>
                    </div>
                </div>
                )
        } else {
            return (
            <div style = {{marginBottom: "75px",position:'absolute'}}>
                <Navbar light expand = "md"fixed = "top" style={{height:'60px',backgroundImage:'linear-gradient(178deg,#242426,#242426)'}}>
                    <NavbarBrand className = "ml-2" style={{fontSize:'20px'}}><Link to = '/'><img src = "http://www.logospng.com/images/6/10-reasons-why-google-optimise-is-my-favourite-split-6432.png" alt = "brand" width = "30px" height='30px'/><span className='navbartext'>OnOSepeda.Com</span></Link>
                    </NavbarBrand >
                    <NavbarToggler onClick = {this.toggle}/><Collapse isOpen = {this.state.isOpen}navbar><Nav className = "ml-auto" navbar>
                    <NavItem >
                    <div className = "input-group" style = {{width: "350px",marginTop:'2.5px'}}>
                         <input type = "text" ref = "searchBook" onChange ={this.valueHandler} className = "form-control" placeholder = "Masukkan kata kunci ... " />
                            <div className = "input-group-append mr-2" style={{color:'blue'}} >
                            <Link to={'/search?q='+this.state.search}><button className = "btn border-secondary" type = "button" id = "button-addon2" style={{color:'white'}} onClick ={this.onBtnSearch}><i className = "fas fa-search" /></button> </Link></div> </div>  
                    </NavItem>

                    <NavItem>
                        <NavLink style={{color:'white',fontSize:'16px'}}>Hi,{this.props.bebas}</NavLink>
                    </NavItem>

                    <NavItem >
                        <Link to = "/cart"> <button className = "btn btn-default border-primary" data-toggle="tooltip" data-placement="bottom" title="Cart" style = {{fontSize: "14px",color:'white',marginTop:'3px'}} ><i class="fas fa-shopping-cart"></i> {this.props.cart}</button>
                        </Link >
                    </NavItem> 
                        {this.props.role === 'admin' ? 
                            <NavItem>
                                    <Link to='/managetransaksi'><button className="btn btn-default border-primary" data-toggle="tooltip" data-placement="bottom" title="Transaksi" style={{color:"white",marginLeft:'8px',marginTop:'3px'}}><i class="fas fa-bell"></i> {this.props.transaksi ? this.props.transaksi : null}</button></Link>
                            </NavItem> :  
                             <NavItem>
                                    <Link to='/paymentlist'><button className="btn btn-default border-primary" data-toggle="tooltip" data-placement="bottom" title="Status" style={{color:"white",marginLeft:'8px',marginTop:'3px'}}><i class="fas fa-bell"></i></button></Link>
                                    </NavItem>
                        }
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret style={{color:'white'}}>
                            Menu
                        </DropdownToggle>
                        <DropdownMenu right>
                            {
                                this.props.role === 'admin' ?
                                <Link to='/manage'><DropdownItem>
                                    Manage Product 
                                </DropdownItem></Link>
                                : null
                            }
                            {
                                this.props.role === 'admin' ?
                                <Link to='/managecategory'><DropdownItem>
                                Manage Category
                                </DropdownItem></Link>
                                : null
                            }
                            <Link to='/history'><DropdownItem>
                                History Transaction
                            </DropdownItem></Link>
                            {
                                this.props.role === 'user' ?
                                <Link to='/payment'><DropdownItem>
                                    Upload Bukti Pembayaran
                                </DropdownItem></Link>
                                : null
                            }
                            {
                                this.props.role === 'user' ?
                                <Link to='/wishlist'><DropdownItem>
                                    Wishlist Product
                                </DropdownItem></Link>
                                : null
                            }
                            <Link to='/editprofile'><DropdownItem>
                                Edit Profile
                            </DropdownItem></Link>
                            <DropdownItem divider />
                            <DropdownItem onClick={this.onBtnLogout}>
                                Log Out
                            </DropdownItem>
                            </DropdownMenu>
                    </UncontrolledDropdown>
                    </Nav>
                </Collapse>
                </Navbar>
            </div>
                )
            }
        
    }
}

const mapStateToProps =(state)=>{
    return {
        bebas : state.user.username,
        role : state.user.role,
        cart : state.cart.count,
        search : state.search.search,
        transaksi : state.trans.transaksi
    }
}

export default connect (mapStateToProps,{resetUser,resetCount,getSearchData})(HeaderKu);