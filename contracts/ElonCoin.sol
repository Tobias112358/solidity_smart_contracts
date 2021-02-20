//SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20Snapshot.sol";

contract ElonCoin is ERC20Snapshot {

    // Constructor
    //Set the totsal number of tokens
    //Read the tital number of tokens

    //totalSupply - public acts as a function.
    //Getters/Setters are unnecessary.

    //name
    //string public name = "Elon Coin";

    //symbol
    //string public symbol = "ELON";

    //standard - not required.
    string public standard = "Elon Coin v1.0";

    //total supply
    //uint256 public totalSupply;

    //Key/Value map.
    //mapping(address => uint256) public balanceOf;

    //allowance
    //mapping(address => mapping(address => uint256)) public allowance;
    


/*    //An event  
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value

    );

    event Approval(
        address indexed _owner, 
        address indexed _spender, 
        uint256 _value

    );
*/   
    constructor(uint256 _initialSupply) ERC20("Elon Coin", "ELON") public {
        
        
        _mint(msg.sender, _initialSupply);

    }

/*
    //Transfers _value amount of tokens to address _to, and MUST fire the Transfer event. 
    //The function SHOULD throw if the message caller's account balance does not have enough tokens to spend.
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        //transer
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        //transfer event
        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    //Allows _spender to withdraw from your account multiple times, up to the _value amount. 
    //If this function is called again it overwrites the current allowance with _value.
    function approve(address _spender, uint256 _value) public returns (bool success) {
        //allowance
        allowance[msg.sender][_spender] = _value;

        //Approve Event
        emit Approval(msg.sender, _spender, _value);

        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[_from] >= _value);
        require(allowance[_from][msg.sender] >= _value);

        //change the balance
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        //Update allowance
        allowance[_from][msg.sender] -= _value;
        
        //transfer event
        emit Transfer(_from, _to, _value);

        return true;
    }
*/

}