import React from 'react'
import { Link,Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { onLogin,cartCount } from './../1.actions'
import Loader from 'react-loader-spinner'
import cookie from 'universal-cookie'
import './../support/css/product.css'


const Cookie = new cookie()
class Login extends React.Component{

    componentWillReceiveProps(newProps){
        if(newProps.username !== ''){
            this.props.cartCount(newProps.username)
            Cookie.set('userData',newProps.username,{path :'/'})
        } 
    }

    
    onBtnLoginClick=()=>{
        var username = this.refs.username.value
        var password = this.refs.password.value
        this.props.onLogin(username,password)
    }

    renderBtnOrLoading = () => {
        if (this.props.loading === true){
            return <Loader
            type="Bars"
            color="#00BFFF"
            height="50"
            width="50"
            />
        }else {
            return <button type="button" className="btn btn-primary" onClick={this.onBtnLoginClick} style={{width:"300px"}} ><i className="fas fa-sign-in-alt" /> Login</button>
        }
        
    }

    renderErrorMessage = () => {
    if(this.props.error !== ""){
        return <div class="alert alert-danger mt-2" role="alert">
                {this.props.error}
                </div>
    }
    }

    render(){
        if(this.props.username !== ""){
            return <Redirect to = '/'/>
        }

        return(
            <div className='bl'>
            <div className="container myBody"><br/><br/><br/><br/>
                <div className="row justify-content-sm-center ml-auto mr-auto">
                    <form className="border mb-3" style={{padding:"20px", borderRadius:"5%",backgroundColor:'none',marginTop:'120px',marginRight:'550px'}} ref="formLogin">
                        <fieldset>
                        <h2>Login</h2>
                        <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon">
                                    <i className="fa fa-user prefix"></i>
                                    </span>
                                </div>
                                <input type="text" ref="username" className="form-control" id="inputEmail" placeholder="Username" required autoFocus/>
                            </div>

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon">
                                    <i class="fas fa-key"></i>
                                    </span>
                                </div>
                                <input type="password" ref="password" className="form-control" id="inputPassword" placeholder="Password" onKeyPress={this.renderOnKeyPress} required />
                            </div>
                     
                            
                            <div className="form-group row">
                                <div className="col-12" style={{textAlign:'center'}}>
                                {this.renderBtnOrLoading()}
                                {this.renderErrorMessage()}
                                </div>
                                    
                            </div>
                            <div className="btn my-auto"><p>Don't have Account? <Link to="/register" className="border-bottom">Sign Up!</Link></p></div>
                        </fieldset>
                    </form>                 
                </div>                
            </div>
            </div>
        )
    }
}

const mapStateToProps =(state)=>{
    return{
    username : state.user.username,
    loading : state.user.loading,
    error : state.user.error
    }
}

export default connect(mapStateToProps,{onLogin,cartCount})(Login)