const _deploy_contracts = require("../migrations/2_deploy_contracts");

var CommunityChest = artifacts.require("CommunityChest");

contract('CommunityChest', function(accounts){
    it('Adds wei to the contract`s balance ', function() {
        return CommunityChest.deployed()

        .then();
    })

    it('Deposits wei to a winner', function() {
        return CommunityChest.deployed()

        .then();
    })
})

