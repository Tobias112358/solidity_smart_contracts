const ElonCoin = artifacts.require("ElonCoin");
const ElonCoinSale = artifacts.require("ElonCoinSale");


//200000000 Eloncoin
module.exports = function (deployer) {
  deployer.deploy(ElonCoin, 40000000)
  .then(function() {
    var tokenPrice = 0.0000001*(10**18);

    return  deployer.deploy(ElonCoinSale, ElonCoin.address, tokenPrice);
  });
 
};
