const ElonCoin = artifacts.require("ElonCoin");


module.exports = function (deployer) {
  deployer.deploy(ElonCoin, 40000000);
};
