const Migrations = artifacts.require("Migrations");
const CommunityChest = artifacts.require("CommunityChest");


module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(CommunityChest);
};
