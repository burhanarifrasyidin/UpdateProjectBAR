import React from 'react'


class Footer extends React.Component{

    state ={number:1}
    handleState=()=>{
        this.setState({number:this.state.number+1})
    }
    render(){
        return(
            <div className='container container-fluid'>
            <div style={{position:'none',left:'0px',bottom:'0px',height:'50px',backgroundColor:'none',width:'100%',color:'grey',textAlign:'center',fontSize:'17px',fontFamily:'-apple-system, BlinkMacSystemFont',paddingTop:'20px'}}>
            &copy; {new Date().getFullYear()} Copyright: Burhan AR
            </div>
            </div>
            
        )
    }
}

export default Footer
