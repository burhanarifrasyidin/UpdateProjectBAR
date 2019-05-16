import React from 'react'
import { Link,Redirect} from 'react-router-dom'
import { userRegister,loginWithGoogle } from './../1.actions'
import { connect } from 'react-redux'
import Loader from 'react-loader-spinner'
import firebase from 'firebase'
import { provider } from './../support/google'
import './../support/css/product.css'
import swal from 'sweetalert'



class Register extends React.Component{
    state = {error : ''}

    componentWillReceiveProps(newProps){
        if(newProps.error !== ""){
            this.setState({error : newProps.error})
        }
    }

    renderErrorMessege = () => {
        if(this.state.error !== ""){
            return <div class="alert alert-danger mt-3" role="alert">
                        {this.state.error}
                    </div>
        }
    }

    onBtnRegisterClick = () => {

        var username = this.refs.username.value
        var password = this.refs.password.value
        var email = this.refs.email.value
        var phone = this.refs.phone.value
        if(username === "" || password === ""|| email === "" || phone === ""){
            this.setState({error: ' Harus diisi semua '})
        }else{
            this.props.userRegister(username,password,email,phone)
            this.refs.username.value = ''
            this.refs.password.value = ''
            this.refs.email.value = ''
            this.refs.phone.value = ''
            swal('Register Success', 'Verify your email before login', 'success')
        }
    }

    loginWithGoogle = () => {
        firebase.auth().signInWithPopup(provider)
        .then((res) => {
            console.log(res)
            this.props.loginWithGoogle(res.user.email)
        })
        .catch((err) => console.log(err))
    }

    renderLoadingOrBtn = () => {
        if(this.props.loading === true){
            return <Loader
            type="Bars"
            color="#00BFFF"
            height="50"
            width="50"
            />
        }else{
            return <button type="button"  className="btn btn-primary" style={{width:"300px"}} onClick={this.onBtnRegisterClick}><i className="fas fa-sign-in-alt" />Sign Up!</button>
        }
    }

    render(){
        if(this.props.user !== ""){
            return <Redirect to= '/'/>
        }
        return(
            <div className="br">
            <div className="container myBody " style={{minHeight:"600px"}}><br/><br/>
            <div className="row justify-content-sm-center ml-auto mr-auto mt-3">
                        
                        <form className="border mb-3" style={{padding:"20px", borderRadius:"5%",backgroundColor:"white",marginTop:'80px'}} ref="formLogin">
                            <fieldset>
                            <h2>Create Account</h2>
                            <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon">
                                        <i className="fa fa-user prefix"></i>
                                        </span>
                                    </div>
                                    <input type="text" ref="username" className="form-control" id="inputUsername" placeholder="Username" required autoFocus/>
                                </div>

                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon">
                                        <i class="fas fa-key"></i>
                                        </span>
                                    </div>
                                    <input type="password" ref="password" className="form-control" id="inputPassword" placeholder="Password" required />
                                </div>
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon">
                                            <i class="fas fa-envelope"></i>
                                            </span>
                                    </div>
                                    <input type="email" ref="email" className="form-control" id="inputEmail" placeholder="Email@mail.com" required />
                                </div>

                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon">
                                            <i class="fas fa-phone"></i>
                                            </span>
                                    </div>
                                    <input type="phone" ref="phone" className="form-control" id="inputPhone" placeholder="Ex: 0857xxxxxxxx" required />
                                    
                                </div>
                                
                                <div className="form-group row">
                                    <div className="col-12">
                                    {this.renderLoadingOrBtn()}

                                    <div>
                                    <button className='btn btn-success mt-2' onClick={this.loginWithGoogle} style={{width:'300px'}}><i class="fab fa-google-plus"> Login With Google</i></button>
                                    </div>
                                    {this.renderErrorMessege()}
                                    </div>
                                        
                                </div>
                                <div className="btn my-auto"><p>Already have Account? <Link to="/login" className="border-bottom">Login</Link></p></div>
                                
                            </fieldset>
                        </form>
                        
                    </div>                
                </div>
                </div>
        )
    }
} 

const mapStateToProps = (state) => {
    return {
        user : state.user.username,
        loading : state.user.loading,
        error : state.user.error
    }
} 

export default connect(mapStateToProps,{userRegister,loginWithGoogle})(Register)