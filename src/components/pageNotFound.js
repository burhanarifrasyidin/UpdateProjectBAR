import React from 'react'
import './../support/css/pageNotFound.css'

class PageNotFound extends React.Component {
    render(){
        return(
        <div id="notfound" style={{marginTop:'60px'}}>
		    <div class="notfound">
			<div class="notfound-404">
				<div></div>
				<h1>404</h1>
			</div>
			<h2>Page not found</h2>
			<p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
			<a href="..">home page</a>
		    </div>
	    </div>
        )
    }
}

export default PageNotFound