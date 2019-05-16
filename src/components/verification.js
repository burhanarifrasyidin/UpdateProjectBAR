import React from 'react'
import queryString from 'query-string'
import Axios from 'axios'
import {Link} from 'react-router-dom'

class Verify extends React.Component{
    componentDidMount(){
        this.verification()
    }

    verification = () => {
        var params = queryString.parse(this.props.location.search)
        Axios.put('http://localhost:2008/user/verify',
        {
            username : params.username,
            password : params.password
        }
        )
        .then((res) => alert(res.data))
        .catch((err) => console.log(err))
    }

    render(){
        return (
            <div className="container" style={{paddingTop:'150px'}}>
                <h1 style={{textAlign:'center'}}>Email Berhasil di Verifikasi,Silahkan Berbelanja</h1>
                <Link to='/'><input style={{marginLeft:'520px'}} className='btn btn-primary' type='button' value='shopping'></input></Link>
            </div>
        )
    }
}

export default Verify