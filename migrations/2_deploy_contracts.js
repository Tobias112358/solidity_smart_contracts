const ElonCoin = artifacts.require("ElonCoin");
const ElonCoinSale = artifacts.require("ElonCoinSale");



module.exports = function (deployer) {
  deployer.deploy(ElonCoin, 40000000)
  .then(function() {
    var tokenPrice = 0.0000001*(10**18);

    return  deployer.deploy(ElonCoinSale, ElonCoin.address, tokenPrice);
  });
 
};
