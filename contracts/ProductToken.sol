pragma solidity >=0.4.22 <0.9.0;

contract ProductToken {

    struct product_token {
        uint256 tokenID;
        bool used;
        address customerAddress;
        uint256 price;
        string productID;
    }

    event Deposit(address _from, uint amount);

    function withdraw() payable public {
        msg.sender.transfer(address(this).balance);
    }
    
    function() external payable {
    }

    function whoami() public view returns (address) {
        return address(this);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
