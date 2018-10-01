pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';

contract CommunityCoinV2 is Ownable {
    using SafeMath for uint256;

    // User Mappings
	mapping (address => uint256) public hollowBalances;
    mapping (address => uint256) public currentSolidBalances;
    mapping (address => uint256) public futureSolidBalances;
    mapping (address => uint256) public lastHarvests;
    mapping (address => bool) public activeStatus;

    // User Rights
    mapping (address => bool) public userToAdmins;
    address public owner; // equivalent to Super Admin

    // Tokens
    uint256 public tokenCount; // needs to have minimum 1
    uint256 public tokenValue;
    // Test implementation doesn't include customization for time formatting
    // and amount of tokens transferred / generated

    struct Relationship {
        uint256 maxSendValue;
        uint256 timestamp; // +1 week
    }

    mapping (address => mapping(address => Relationship[])) public userToRelationships;

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



    // NEEDS TO BE REMOVED SINCE SOLIDITY GENERATES NATURAL ACCESSORS
    function getHollowBalance(address addr) public view returns(uint256) {
        return hollowBalances[addr];
    }

    function getCurrentSolidBalance(address addr) public view returns(uint256) {
        return currentSolidBalances[addr];
    }

    function getFutureSolidBalance(address addr) internal view returns(uint256) {
        return futureSolidBalances[addr];
    }

    function getLastHarvest(address addr) public view returns(uint256) {
        return lastHarvests[addr];
    }

    function getActiveStatus(address addr) public view returns(bool) {
        return activeStatus[addr];
    }

    function checkIfAdmin(address addr) public view returns(bool) {
        return userToAdmins[addr];
    }

    function getTokenCount() public view returns(uint256) {
        return tokenCount;
    }

    function getTokenValue() public view returns(uint256) {
        return tokenValue;
    }

    function getContractBalance() public view returns(uint256) {
        return address(this).balance;
    }




    // Contract Managment
    function transferOwnership(address _owner) public onlyOwner {
        return super.transferOwnership(_owner);
    }

    event ContractEmptied(uint256 newTokenValue);

    function withdraw() external onlyOwner {
        tokenValue = 0;
        msg.sender.transfer(address(this).balance);
        emit ContractEmptied(tokenValue);
    }

    event TokenValueUpdated(uint256 newTokenValue);

    function updateTokenValue() internal {
        tokenValue = address(this).balance.div(tokenCount);
        emit TokenValueUpdated(tokenValue);
    }

    event DonationToContract(address addr, uint256 amount);

    function donateToContract() external payable {
        updateTokenValue();
        emit DonationToContract(msg.sender, msg.value);
    }

    event TokensRedeemed(address addr, uint256 amount);

    function redeemTokens() external returns(bool) {
        uint256 userBalance = currentSolidBalances[msg.sender];
        require(userBalance > 0);

        currentSolidBalances[msg.sender] = 0;
        tokenCount -= userBalance;

        msg.sender.transfer(userBalance.mul(tokenValue));

        updateTokenValue();

        emit TokensRedeemed(msg.sender, userBalance);
        return true;
    }




    // User Transactions
    function amountAllowedToBeSent(
        address _sender,
        address _reciever,
        uint256 _amount
    ) private returns(uint256) {
        Relationship memory relationship = userToRelationships[sender][reciever];

        // First interaction between users or last interaction happened over a week ago
        if (relationship.timestamp < now) { return 15; }

        // Last interaction happened less than a week ago
        if (relationship.timestamp >= now) { return relationship.maxSendValue; }

    }

    event Transfer(address indexed _from, address indexed _to, uint256 _amount);

    function sendHollowCoins(address receiver, uint256 amount) public {
        require (amount <= 15);
        require (amount > 0);
        require (hollowBalances[msg.sender] >= amount);
        require (amountAllowedToBeSent(msg.sender, receiver, amount) > 0);

        Relationship storage relationship = userToRelationships[msg.sender][reciever];
        relationship.maxSendValue -= amount;

        // Timestamp expired
        if (relationship.timestamp < now) {
            relationship.timestamp = now + 604800;
            relationship.maxSendValue = 15 - amount;
        }

        if (relationship.timestamp >= now) { relationship.maxSendValue -= amount; }

        hollowBalances[msg.sender] -= amount;
        solidBalances[receiver] += amount;

        emit Transfer(msg.sender, receiver, amount);
    }
}
