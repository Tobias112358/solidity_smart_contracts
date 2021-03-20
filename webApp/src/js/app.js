App = {
	web3Provider : null,
	contracts: {},
	account: '0x0',

	init: function() {
		console.log("App initialised!")
		return App.initWeb3();
	},

	initWeb3: function() {
		if(typeof web3 !== 'undefined') {
			//If a web3 instance is already provided by Meta Mask
			App.web3Provider = window.ethereum;
			web3 = new Web3(window.ethereum);
		} else {
			// Specify deafult instance if no web3 instance provided
			App.web3Provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
			web3 = new Web3(App.web3Provider);
		}

		return App.initContracts(); 
	},

	initContracts: function() {
		$.getJSON("ElonCoinSale.json", function(elonCoinSale){
			App.contracts.ElonCoinSale = TruffleContract(elonCoinSale);
			App.contracts.ElonCoinSale.setProvider(App.web3Provider);
			App.contracts.ElonCoinSale.deployed().then(function(elonCoinSale) {
				console.log("Elon Coin Sale Address:", elonCoinSale.address);
			});
		}).done(function() {
			$.getJSON("ElonCoin.json", function(elonCoin) {

				App.contracts.ElonCoin = TruffleContract(elonCoin);
				App.contracts.ElonCoin.setProvider(App.web3Provider);
				App.contracts.ElonCoin.deployed().then(function(elonCoin) {
					console.log("Elon Coin Address:", elonCoin.address);
				});
				return App.render();
			});
		})
	},

	render: function() {
		//Load account data
		web3.eth.getCoinbase(function(err, account) {
			if(err === null) {
				console.log("account", account);
				App.account = account;
				$('#accountAddress').html("Your Account:" + account);
			}
		});
	}
}

$(function() {
	$(window).load(function(){
		App.init();
	})
});