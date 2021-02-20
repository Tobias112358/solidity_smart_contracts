//SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.4.22 <0.9.0;

import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
import "./ElonCoin.sol";

contract CommunityChest {

    struct ParticipantValues {
        uint256 depositedEthereum;
        uint256 depositedElon;
    }

    mapping (address => ParticipantValues) participants;
    address [] participantAddresses;

    
    uint private count = 0;
    uint private round = 1;
    address private winner;    
    ElonCoin public tokenContract;

    event Deposit(address _from, uint amount);
    event Award(address _winner, uint amount);

    function withdraw() payable public {
        msg.sender.transfer(address(this).balance);
    }

    //When the community chest hits a certain number, award one participant with the winnnings.
    function cashOverflow() payable public {

        if(getBalance() > calculateOverflowGasPrice()){
            //TODO: calculate winner.
            //participants[winner].transfer(getBalance());

            emit Award(participantAddresses[0], msg.value);
            round = round + 1;
            ResetParticipantValues();
            participantAddresses = new address[](participantAddresses.length);
        }
    }

    //Sets the 
    function SetParticipantValues(address _participant, uint256 eth, uint256 elon) public returns (bool) {
        
        ParticipantValues storage curParticipantValues = participants[_participant];
        curParticipantValues.depositedEthereum += eth;
        curParticipantValues.depositedElon += elon;
        participants[_participant] = curParticipantValues;
        return true;
    }

    function ResetParticipantValues() public returns (bool) {
        ParticipantValues memory valuesAt0;
        valuesAt0.depositedEthereum = 0;
        valuesAt0.depositedElon = 0;

        for(uint i=0; i<participantAddresses.length; i++) {
            participants[participantAddresses[i]] = valuesAt0;
        }
        return true;
    }

    // function deposit() payable public {
    //     //require(msg.value == amt);
    //     //emit Deposit(msg.sender, msg.value); 
        
    // }

    receive() external payable {
        // custom function code
        
        SetParticipantValues(msg.sender, msg.value, 0);
        participantAddresses.push(msg.sender);
        count = count + 1;
        //Generate new ElonCoin.
        cashOverflow();
    }

    fallback() external payable {
        
    }

    //Returns the smart contract's address.
    function whoami() public view returns (address) {
        return address(this);
    }

    //Returns the balance of this smart contract.
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function calculateOverflowGasPrice() public view returns (uint256) {
        return (round**2)*10**16;
    }

}
