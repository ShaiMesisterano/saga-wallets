import React from 'react';

const NewWallet = props => (
	<div>
		<h4>Add A Wallet</h4>
		<form onSubmit={props.onAdd}>
			<input type="text" placeholder="Public Key" value={props.walletPublicKey} onChange={props.onWalletPublicKeyChange} />
			<br /><br />
			<input type="text" placeholder="Wallet Name" maxLength="30" value={props.walletName} onChange={props.onWalletNameChange} />
			<br /><br />
			<input type="submit" value="Add" />
			<input type="button" value="Cancel" onClick={props.onCancel} />
		</form>
		<div>{props.errors}</div>
	</div>
);

export default NewWallet;