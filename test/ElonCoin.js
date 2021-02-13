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

    it('approves token for delegated transfer.', function() {
        return ElonCoin.deployed()

        .then(function(instance) {
            tokenInstance = instance;
            //NOTE: transfer.call does NOT make a transaction.
            return tokenInstance.approve.call(accounts[1], 100);

        })

        .then(function(success) {
            assert.equal(success, true, 'it returns true.');
            //Approving accounts[1] to spend 100 elon coin on accounts[0]'s behalf
            return tokenInstance.approve(accounts[1], 100, {from: accounts[0]});
        })

        .then(function(receipt) {
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Approval', 'The event should be the "Approval" event.');
            assert.equal(receipt.logs[0].args._owner, accounts[0], 'logs the account the tokens are authorised by.');
            assert.equal(receipt.logs[0].args._spender, accounts[1], 'logs the account the tokens are authorised to.');
            assert.equal(receipt.logs[0].args._value, 100, 'logs the transfer amount.');
            return tokenInstance.allowance(accounts[0], accounts[1]);
        })

        .then(function(allowance) {
            assert.equal(allowance.toNumber(), 100, 'stores the allowance for delegated transfer.');
        })

    });

    it('handles delegated token transfers.', function() {
        return ElonCoin.deployed()

        .then(function(instance) {
            tokenInstance = instance;
            fromAcc = accounts[2];
            toAcc = accounts[3];
            spendingAcc = accounts[4];
            //Transfer tokens to fromAcc.
            return tokenInstance.transfer(fromAcc, 100, {from: accounts[0]});

        })
        //Approve spendingAcc to spend 10 tokens from fromAcc
        .then(function(receipt) {
            return tokenInstance.approve(spendingAcc, 10, {from: fromAcc});
        })
        //Try transferrring something larger tha the sender's balance.
        .then(function(receipt) {
            return tokenInstance.transferFrom(fromAcc, toAcc, 40000001, {from: spendingAcc});
        })

        .then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >= 0, 'cannot transfer value larger than balance.');
            //Try transfering more than the approved amount.
            return tokenInstance.transferFrom(fromAcc, toAcc, 20, {from: spendingAcc});
        })
        
        .then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >= 0, 'cannot transfer value larger than approved amount.');
            //Try transfering more than the approved amount.
            return tokenInstance.transferFrom.call(fromAcc, toAcc, 10, {from: spendingAcc});

        })
        .then(function(success) {
            assert.equal(success, true, 'it returns true.');
            return tokenInstance.transferFrom(fromAcc, toAcc, 10, {from: spendingAcc});
        })
        
        .then(function(receipt) {
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Transfer', 'The event should be the "Transfer" event.');
            assert.equal(receipt.logs[0].args._from, fromAcc, 'logs the account the tokens are authorised by.');
            assert.equal(receipt.logs[0].args._to, toAcc, 'logs the account the tokens are authorised to.');
            assert.equal(receipt.logs[0].args._value, 10, 'logs the transfer amount.');
            return tokenInstance.balanceOf(fromAcc);
        })

        .then(function(balance) {
            assert.equal(balance.toNumber(), 90, 'deducts the amount from the sending account.');
            return tokenInstance.balanceOf(toAcc);
        })
        .then(function(balance) {
            assert.equal(balance.toNumber(), 10, 'adds the amount to the receiving account.');
            return tokenInstance.allowance(fromAcc, spendingAcc);
        })
        .then(function(allowance) {
            assert.equal(allowance, 0, 'deducts the amount the allowance.');
        })
    });
})