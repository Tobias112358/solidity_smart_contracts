pragma solidity >=0.4.22 <0.9.0;

contract CommunityChest {
    address payable[] private participants = new address payable[](10);
    uint private count = 0;

    event Deposit(address _from, uint amount);
    event Award(address _winner, uint amount);

    function withdraw() payable public {
        msg.sender.transfer(address(this).balance);
    }

    //When the community chest hits a certain number, award one participant with the winnnings.
    function cashOverflow() payable public {

        require(getBalance() > 50*10**18);
        participants[0].transfer(getBalance());
        emit Award(participants[0], msg.value);
    }

    // function deposit() payable public {
    //     //require(msg.value == amt);
    //     //emit Deposit(msg.sender, msg.value);
        
    // }
    function() external payable {
        participants[count] = msg.sender;
        count = count + 1;
        cashOverflow();
    }

    //Returns the smart contract's address.
    function whoami() public view returns (address) {
        return address(this);
    }

    //Returns the balance of this smart contract.
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }



}
