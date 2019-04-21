import React from 'react'
import queryString from 'query-string'
import Axios from 'axios'

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
            <div className="container">
                Email Berhasil di verifikasi
            </div>
        )
    }
}

export default Verify