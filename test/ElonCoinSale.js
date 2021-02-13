var ElonCoinSale = artifacts.require('ElonCoinSale');

contract('ElonCoinSale', function(accounts) {
    var tokenSaleInstance;
    var tokenPrice = 0.0000001*(10**18);

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
});