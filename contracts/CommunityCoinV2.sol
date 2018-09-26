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
    uint256 public tokenCount;
    uint256 public tokenValue;
    // Test implementation doesn't include customization for time formatting
    // and amount of tokens transferred / generated

    // Transactions
    struct Transaction {
        address toAddress;
        uint256 sentValue;
        uint256 timestamp;
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
}
