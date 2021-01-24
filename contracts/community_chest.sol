pragma solidity <0.9.0;

contract CommunityChest {

    event Deposit(address _from, uint amount);

    function withdraw() payable public {
        msg.sender.transfer(address(this).balance);
    }

    function deposit() payable public {
        //require(msg.value == amt);
        emit Deposit(msg.sender, msg.value);
        
    }

    function whoami() public view returns (address) {
        return address(this);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}