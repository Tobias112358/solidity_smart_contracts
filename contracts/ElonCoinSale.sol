pragma solidity >=0.4.22 <0.9.0;

import "./ElonCoin.sol";

contract ElonCoinSale {

    address admin;
    ElonCoin public tokenContract;
    uint256 public tokenPrice;

    constructor(ElonCoin _tokenContract, uint256 _tokenPrice) public {
        //assign admin
        admin = msg.sender;
        //Token contract
        tokenContract = _tokenContract;
        //Token price
        tokenPrice = _tokenPrice;
    }
}