pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';

contract CommunityCoinV2 is Ownable, SafeMath {
    // User Mappings
	mapping (address => uint) public hollowBalances;
    mapping (address => uint) public currentSolidBalances;
    mapping (address => uint) public futureSolidBalances;
    mapping (address => uint) public lastHarvests;
    mapping (address => bool) public activeStatus;

    // User Rights
    mapping (address => bool) public userToAdmins;
    address public owner; // equivalent to Super Admin

    // Token Mappings
    uint public tokenCount;
    uint public tokenValue;
    // Test implementation doesn't include customization for time formatting
    // and amount of tokens transferred / generated

    // Transactions
    struct Transaction {
        address toAddress;
        uint sentValue;
        uint timestamp;
    }

    mapping (address => Transaction[]) public userToTransactions;

    constructor() public {
        owner = msg.sender;
        activeStatus[msg.sender] = true;
        userToAdmins[msg.sender] = true;

        // Following values are preset for testing purposes
        hollowBalances[msg.sender] = 60;
        currentSolidBalances[msg.sender] = 15;
        lastHarvests[msg.sender] = now;
        tokenCount = 75;
        tokenValue = 0;
    }

    function getHollowBalance(address addr) public view returns(uint) {
        return hollowBalances[addr];
    }

    function getCurrentSolidBalance(address addr) public view returns(uint) {
        return currentSolidBalances[addr];
    }

    function getFutureSolidBalance(address addr) internal view returns(uint) {
        return futureSolidBalances[addr];
    }

    function getLastHarvest(address addr) public view returns(uint) {
        return lastHarvests[addr];
    }

    function getActiveStatus(address addr) public view returns(bool) {
        return activeStatus[addr];
    }

    function checkIfAdmin(address addr) public view returns(bool) {
        return userToAdmins[addr];
    }

    function getTokenCount() public view returns(uint) {
        return tokenCount;
    }

    function getTokenValue() public view returns(uint) {
        return tokenValue;
    }

    function getContractBalance() public view returns(uint) {
        return address(this).balance;
    }

    function getBalance(address addr) public view returns(uint) {
        return addr.balance;
    }

    // Contract Managment
    function transferOwnership(address _owner) public onlyOwner {
        return super.transferOwnership(_owner);
    }

    function withdraw() external onlyOwner {
        msg.sender.transfer(address(this).balance);
    }

    event DonationToContract(address addr, uint amount, uint newTokenValue);

    function donateToContract() external payable {
        // !NEEDS TO UPDATE TOKEN VALUE SAFELY
        tokenValue = mod(address(this).balance, tokenCount);
        emit DonationToContract(msg.sender, msg.value, tokenValue);
    }
}
