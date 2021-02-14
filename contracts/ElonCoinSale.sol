pragma solidity >=0.4.22 <0.9.0;

import "./ElonCoin.sol";

contract ElonCoinSale {

    address payable admin;
    ElonCoin public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokensSold;

    event Sell(
        address _buyer, 
        uint256 _amount
    );

    constructor(ElonCoin _tokenContract, uint256 _tokenPrice) public {
        //assign admin
        admin = msg.sender;
        //Token contract
        tokenContract = _tokenContract;
        //Token price
        tokenPrice = _tokenPrice;
    }

    //multiply
    function multiply(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x);
    }

    function buyTokens(uint256 _numberOfTokens) public payable {
        //require
        require(msg.value == multiply(_numberOfTokens, tokenPrice));
        require(tokenContract.balanceOf(address(this)) >= _numberOfTokens);
        require(tokenContract.transfer(msg.sender, _numberOfTokens));
        //keep track of number of tokens sold
        tokensSold += _numberOfTokens;
        //Trigger Sell event.
        emit Sell(msg.sender, _numberOfTokens);
    }

    //End Sale
    function endSale() public {
        //require 
        require(address(msg.sender) == admin);
        require(tokenContract.transfer(admin, tokenContract.balanceOf(address(this))));

        //Destroy this contract.
        //selfdestruct(admin);

        //SELFDESTRUCT ISSUES
        // UPDATE: Let's not destroy the contract here
        // Just transfer the balance to the admin
        admin.transfer(address(this).balance);
    }
}