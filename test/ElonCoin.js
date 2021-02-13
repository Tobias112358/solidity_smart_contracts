const _deploy_contracts = require("../migrations/2_deploy_contracts");

var ElonCoin = artifacts.require("ElonCoin");

contract('ElonCoin', function(accounts){

    it('initialised the contract with the correct values', function() {
        return ElonCoin.deployed()

        .then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.name();
        })

        .then(function(name) {
            assert.equal(name, 'Elon Coin', 'has the correct name');
            return tokenInstance.symbol();
        })
        .then(function(symbol) {
            assert.equal(symbol, 'ELON', 'has the correct symbol');
            return tokenInstance.standard();
        })
        .then(function(standard) {
            assert.equal(standard, 'Elon Coin v1.0', 'has the correct standard.');
        })
    });

    it('sets the total supply upon deploymeent.', function() {
        return ElonCoin.deployed()

        .then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        })

        .then(function(totalSupply) {
            assert.equal(totalSupply.toNumber(), 40000000, 'sets the total supply to 40 million.');
            return tokenInstance.balanceOf(accounts[0]);
        })

        .then(function(adminBalance) {
            assert.equal(adminBalance.toNumber(), 40000000, 'it allocates the initial supply to the admin account.')
        })
    });

    it('transfers token ownership.', function() {
        return ElonCoin.deployed()

        .then(function(instance) {
            tokenInstance = instance;
            //NOTE: transfer.call does NOT make a transaction.
            return tokenInstance.transfer.call(accounts[1], 40000001);

        })

        .then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >= 0, 'error message must contain revert.');
            //NOTE: transfer() will cause a real transaction.
            return tokenInstance.transfer.call(accounts[1], 250000, {from: accounts[0] });

        })

        .then(function(success) {
            assert.equal(success, true, 'it returns true.');
            return tokenInstance.transfer(accounts[1], 250000, {from: accounts[0] });
        })

        .then(function(receipt) {
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Transfer', 'The event should be the "Transfer" event.');
            assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the tokens are transferred from.');
            assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the tokens are transferred to.');
            assert.equal(receipt.logs[0].args._value, 250000, 'logs the transfer amount.');
            return tokenInstance.balanceOf(accounts[1]);
        })

        .then(function(balance) {
            assert.equal(balance.toNumber(), 250000, 'adds the amount to the receiving account.');
            return tokenInstance.balanceOf(accounts[0]);
        })
        .then(function(balance) {
            assert.equal(balance.toNumber(), 39750000, 'deducts the amount to the receiving account.');
            //return tokenInstance.balanceOf(accounts[0]);
        })

    });

})