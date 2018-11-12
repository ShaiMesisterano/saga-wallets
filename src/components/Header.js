import React from 'react';

const Header = props => (
    <div>
    	<header>
    		<div className="navbar navbar-dark bg-dark box-shadow">
		    	<div className="container-fluid navbar-brand d-flex align-items-center">
            		{props.text}
		      	</div>
	    	</div>
	    </header>
    </div>
);

export default Header;