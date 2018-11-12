import React from 'react';
import NewWallet from './NewWallet';

class Wallets extends React.Component {
	constructor() {
		super();
		this.endpoint = {
			url: "http://interview-api.saga.org/api/v1/users/me/wallets",
			token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNzRlNmY3YS1mYjI3LTQ4OGUtODFmMC1kY2M2ZTRjOWRmZGMiLCJtb3JlRGF0YSI6Int9Iiwicm9sZXMiOlsibWVtYmVyIl0sInR5cGUiOiJFWFBJUkVfT05MWSIsImV4cCI6MTU0MjAyNDM5NiwianRpIjoiMWQ0ZmNjMTQtMjgyYi00OGJiLWE4MGEtNDk3MDM3MjhkN2ZkIn0.xSKIJ42QB0AS-TEHhgQdmZu9n9tyfp9lWxDY_O7HNYE",
		}
		this.endpoint.headers = {
        	"Authorization": "Bearer " + this.endpoint.token,
            "Content-Type": "application/json",
            "Origin": "www.blabla.com"
        };
		this.state = {
			isLoading: true,
			showAddNew: false,
			wallets: [],
			addedWallets: 0,
			walletName: '',
			walletPublicKey: ''
		}
	}
	async componentDidMount() {
		const response = await fetch(this.endpoint.url, {
	        method: "GET",
	        headers: this.endpoint.headers
    	});
		const data = await response.json();
		this.setState({
			isLoading: false,
			wallets: data
		});
	}
	toggleAddNew = () => {
		this.setState({
			showAddNew: this.state.showAddNew ? false : true
		});
	}
	async addNew(e) {
		const walletName = this.state.walletName || "Untitled";
		const walletPublicKey = this.state.walletPublicKey;
		if (walletPublicKey.length !== 42) {
			alert("Public Key length should be 42");
			e.preventDefault();
		}
		else if (this.state.addedWallets >= 10) {
			alert("Only 10 new wallets are allowed");
			e.preventDefault();
		}
		else {
			this.setState({
				isLoading: true
			});
			const data = {
				name: walletName,
				publicKey: walletPublicKey,
				colorValidator: "ssssssssssssssssssssssssssssssssssssssss"
			}
			const response = await fetch(this.endpoint.url, {
	        	method: "POST",
	        	headers: this.endpoint.headers,
	        	body: JSON.stringify(data)
	    	});
			const newWallet = await response.json();
			const allWallets = this.state.wallets;
			allWallets.push(newWallet);
			this.setState({
				isLoading: false,
				showAddNew: false,
				wallets: allWallets,
				addedWallets: ++this.state.addedWallets
			});
		}
	}
	sortByName(arr) {
		const _arr = arr.concat();
		return _arr.sort( (a, b) => {
			if(a.name === "Untitled" || b.name === "Untitled") { return -1; }
			if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
		    if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
		    return 0;
		} );
	}
	onWalletNameChange(e) {
		this.setState({
			walletName: e.target.value
		})
	}
	onWalletPublicKeyChange(e) {
		this.setState({
			walletPublicKey: e.target.value
		})
	}
	render() {
		let walletsData;
		if (this.state.isLoading) {
			return (<div>Loading...</div>);
		}
		else {
			if (this.state.showAddNew) {
				return(<div><NewWallet walletPublicKey={this.state.walletPublicKey} walletName={this.state.walletName} onWalletNameChange={this.onWalletNameChange.bind(this)} onWalletPublicKeyChange={this.onWalletPublicKeyChange.bind(this)} onAdd={(e) => this.addNew(e)} onCancel={this.toggleAddNew} /></div>);
			}
			else {
				if (!this.state.wallets) {
					return (<div>No wallets</div>);
				}
				else {
					walletsData = this.sortByName(this.state.wallets).map( (wallet, key) => {
						let createdAt = new Date(wallet.createdAt);
						return <tr key={key}>
							<td>{wallet.name}</td>
							<td>{createdAt.getDate()}/{createdAt.getMonth() + 1}/{createdAt.getFullYear()}</td>
							</tr>;
					});
				}
				return (
					<div>
						<button className="btn btn-primary" onClick={this.toggleAddNew}>Add A Wallet</button>
						<table>
							<tbody>
								<tr>
									<th>Name</th>
									<th>Created Date</th>
								</tr>
								{ walletsData }
							</tbody>
						</table>
					</div>
				);
			}
		}
	}
};

export default Wallets;