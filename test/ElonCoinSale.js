var ElonCoinSale = artifacts.require('ElonCoinSale');
var ElonCoin = artifacts.require('ElonCoin');


contract('ElonCoinSale', function(accounts) {
    var tokenSaleInstance;
    var tokenInstance;
    var admin = accounts[0];
    var buyer = accounts[1];
    var tokenPrice = 0.0000001*(10**18);
    var tokensAvailable = 30000000;
    var numberOfTokens;

    it('initialises the contract with th correct values', function() {
        return ElonCoinSale.deployed()

        .then(function(instance) {
            tokenSaleInstance = instance;
            return tokenSaleInstance.address;
        })

        .then(function(address) {
            assert.notEqual(address, 0x0, 'has contract adress');
            return tokenSaleInstance.tokenContract();
        })
        .then(function(address) {
            assert.notEqual(address, 0x0, 'has token contract adress');
            return tokenSaleInstance.tokenPrice();
        })
        .then(function(price) {
            assert.equal(price, tokenPrice, 'token price is correct.');
            //return tokenSaleInstance.tokenPrice();
        })
    })

    it('facilitates token buying', function() {
        return ElonCoin.deployed()

        .then(function(instance) {
            tokenInstance = instance;
            return ElonCoinSale.deployed();
        })
        .then(function(instance) {
            tokenSaleInstance = instance;
            return tokenInstance.transfer(tokenSaleInstance.address, tokensAvailable, {from: admin })
        })
        .then(function(receipt) {
            numberOfTokens = 10;
            return tokenSaleInstance.buyTokens(numberOfTokens, {from: buyer, value: numberOfTokens * tokenPrice});
        })
        .then(function(receipt) {
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Sell', 'The event should be the "Sell" event.');
            assert.equal(receipt.logs[0].args._buyer, buyer, 'logs the account that purchaced the tokens.');
            assert.equal(receipt.logs[0].args._amount, numberOfTokens, 'logs the number of tokens purchased.');
            return tokenSaleInstance.tokensSold();
        })
        .then(function(amount) {
            assert.equal(amount.toNumber(), numberOfTokens, 'increments the number of tokens sold.');
            return tokenInstance.balanceOf(buyer);
        })
        .then(function(balance) {
            assert.equal(balance.toNumber(), numberOfTokens);
            return tokenInstance.balanceOf(tokenSaleInstance.address);
        })
        .then(function(balance) {
            assert.equal(balance.toNumber(), tokensAvailable - numberOfTokens);
            return tokenSaleInstance.buyTokens(numberOfTokens, {from: buyer, value: 1});
        })
        .then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >= 0, 'msg.value must be equal number of tokens in wei. ')
            return tokenSaleInstance.buyTokens(30000001, {from: buyer, value: numberOfTokens * tokenPrice });
        })
        .then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >= 0, 'cannot buy more tokens than available. ')
        })

    })

    it('ends token sale ', function() {
        return ElonCoin.deployed()

        .then(function(instance) {
            tokenInstance = instance;
            return ElonCoinSale.deployed();
        })
        .then(function(instance) {
            tokenSaleInstance = instance;
            return tokenSaleInstance.endSale({from: buyer })
        }) 
        .then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >= 0, 'must be admin to end sale.')
            //end sale as admin
            return tokenSaleInstance.endSale({from: admin});
        })
        .then(function(receipt) {
            return tokenInstance.balanceOf(admin);
        })
        .then(function(balance) {
            assert.equal(balance.toNumber(), 39999990, 'return all unsold tokens to admin');
            return tokenSaleInstance.tokenPrice();
        })
        .then(function(price) {
            assert.equal(price.toNumber(), 0, 'token price was reset.');
        })
    })
});