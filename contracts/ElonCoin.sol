pragma solidity >=0.4.22 <0.9.0;

contract ElonCoin {

    // Constructor
    //Set the totsal number of tokens
    //Read the tital number of tokens

    //totalSupply - public acts as a function.
    //Getters/Setters are unnecessary.

    //name
    string public name = "Elon Coin";

    //symbol
    string public symbol = "ELON";

    //standard - not required.
    string public standard = "Elon Coin v1.0";

    //total supply
    uint256 public totalSupply;

    //Key/Value map.
    mapping(address => uint256) public balanceOf;

    //symbol
    

    address owner;

    //An event  
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value

    );
    
    constructor(uint256 _initialSupply) public {
        //10% will be how rich we get
        //We want 1,000,000 each
        //market cap goal must equal 40,000,000
        //total supply = 40 mil
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
        owner = msg.sender;

    }

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
}