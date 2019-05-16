import React from 'react'
import { relative } from 'path';


class Footer extends React.Component{

    state ={number:1}
    handleState=()=>{
        this.setState({number:this.state.number+1})
    }
    render(){
        return(
            <div className='footer'>
            <div className='container container-fluid'>
                <div style={{marginLeft:'500px'}}>
                    <img src='http://pluspng.com/img-png/instagram-png-instagram-png-logo-1455.png' width='25px' alt='pict'/>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/600px-Facebook_logo_%28square%29.png' width='25px' style={{marginLeft:'20px'}} alt='pict'/>
                    <img src='https://seeklogo.com/images/T/twitter-2012-negative-logo-5C6C1F1521-seeklogo.com.png' width='25px' style={{marginLeft:'20px'}} alt='pict'/>
                </div>
                <div style={{left:'0px',height:'50px',backgroundColor:'none',width:'100%',color:'grey',textAlign:'center',fontSize:'17px',fontFamily:'-apple-system, BlinkMacSystemFont',paddingTop:'20px'}}>
                &copy; {new Date().getFullYear()} Copyright: Burhan AR
                </div>
            </div>
            </div>
            
        )
    }
}

export default Footer
