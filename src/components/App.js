import React from 'react';
import Header from './Header';
import Wallets from './Wallets';

const App = props => {
    return (
    	<div>
    		<Header text="Wallets" />
	    	<div style={{margin: "20px"}}><Wallets /></div>
      </div>
    );
};

export default App;