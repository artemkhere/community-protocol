pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';

contract CommunityCoinV2 is Ownable {
    using SafeMath for uint256;

    // USER MAPPINGS
	mapping (address => uint256) public hollowBalances;
    mapping (address => uint256) public currentSolidBalances;
    mapping (address => uint256) public unresolvedSolidBalances;
    mapping (address => uint256) public lastHollowHarvests;
    mapping (address => uint256) public lastSolidHarvests;
    mapping (address => bool) public activeStatus;

    // USER RIGHTS
    mapping (address => bool) public userToAdmins;
    address public owner; // equivalent to Super Admin

    // TOKENS
    uint256 public tokenCount; // needs to have minimum 1
    uint256 public tokenValue;

    struct Relationship {
        uint256 maxSendValue;
        uint256 timestamp;
    }

    mapping (address => mapping (address => Relationship)) public userToRelationships;

    constructor() public {
        owner = msg.sender;
        activeStatus[msg.sender] = true;
        userToAdmins[msg.sender] = true;

        // Following values are preset for testing purposes
        hollowBalances[msg.sender] = 60;
        currentSolidBalances[msg.sender] = 15;
        lastHollowHarvests[msg.sender] = now;
        lastSolidHarvests[msg.sender] = now;
        tokenCount = 75;
        tokenValue = 0;
    }



    // ACCESSORS
    function getHollowBalance(address addr) public view returns(uint256) {
        return hollowBalances[addr];
    }

    function getCurrentSolidBalance(address addr) public view returns(uint256) {
        return currentSolidBalances[addr];
    }

    function getUnresolvedSolidBalance(address addr) internal view returns(uint256) {
        return unresolvedSolidBalances[addr];
    }

    function getLastHollowHarvest(address addr) public view returns(uint256) {
        return lastHollowHarvests[addr];
    }

    function getLastSolidHarvest(address addr) public view returns(uint256) {
        return lastSolidHarvests[addr];
    }

    function getActiveStatus(address addr) public view returns(bool) {
        return activeStatus[addr];
    }

    function checkIfAdmin(address addr) public view returns(bool) {
        return userToAdmins[addr];
    }


    // NEEDS TO BE REMOVED SINCE SOLIDITY GENERATES ACCESSORS
    function getTokenCount() public view returns(uint256) {
        return tokenCount;
    }

    function getTokenValue() public view returns(uint256) {
        return tokenValue;
    }

    function getContractBalance() public view returns(uint256) {
        return address(this).balance;
    }




    // CONTRACT MANAGMENT
    function transferOwnership(address _owner) public onlyOwner {
        return super.transferOwnership(_owner);
    }


    function withdraw() external onlyOwner {
        tokenValue = 0;
        msg.sender.transfer(address(this).balance);
        emit ContractEmptied(tokenValue);
    }
    event ContractEmptied(uint256 newTokenValue);


    function updateTokenValue() internal {
        tokenValue = address(this).balance.div(tokenCount);
        emit TokenValueUpdated(tokenValue);
    }
    event TokenValueUpdated(uint256 newTokenValue);

    function donateToContract() external payable {
        updateTokenValue();
        emit DonationToContract(msg.sender, msg.value);
    }
    event DonationToContract(address addr, uint256 amount);


    // USER TRANSACTIONS
    function amountAllowedToBeSent(address _sender, address _receiver) private view returns(uint256) {
        Relationship memory relationship = userToRelationships[_sender][_receiver];
        // First interaction between users or last interaction happened over a week ago
        if (relationship.timestamp < now) { return 15; }
        // Last interaction happened less than a week ago
        if (relationship.timestamp >= now) { return relationship.maxSendValue; }

    }

    function sendHollowCoins(address receiver, uint256 amount) public {
        require (activeStatus[msg.sender]);
        require (activeStatus[receiver]);
        require (amount <= 15);
        require (amount > 0);
        require (hollowBalances[msg.sender] >= amount);
        require (amountAllowedToBeSent(msg.sender, receiver) > 0);

        Relationship storage relationship = userToRelationships[msg.sender][receiver];
        relationship.maxSendValue -= amount;

        // Timestamp expired
        if (relationship.timestamp < now) {
            relationship.timestamp = now + 604800;
            relationship.maxSendValue = 15 - amount;
        }

        if (relationship.timestamp >= now) { relationship.maxSendValue -= amount; }

        hollowBalances[msg.sender] -= amount;
        unresolvedSolidBalances[receiver] += amount;

        emit Transfer(msg.sender, receiver, amount);
    }
    event Transfer(address indexed _from, address indexed _to, uint256 _amount);


    function harvestHollowCoins() external {
        require(activeStatus[msg.sender]);
        uint256 lastHarvest = lastHollowHarvests[msg.sender];
        uint256 availableCoins = (now - lastHarvest).div(17280);

        if (availableCoins > 0) {
            lastHollowHarvests[msg.sender] = now;
            hollowBalances[msg.sender] += availableCoins;

            tokenCount += availableCoins;
            updateTokenValue();

            emit HollowHarvest(msg.sender, availableCoins);
        }
    }
    event HollowHarvest(address indexed _addr, uint256 _value);


    function harvestSolidCoins() external {
        require(activeStatus[msg.sender]);
        uint256 lastHarvest = lastSolidHarvests[msg.sender];
        require((lastHarvest + 2419200) <= now);
        uint256 availableCoins = unresolvedSolidBalances[msg.sender];
        require(availableCoins > 0);

        if (availableCoins > 0) {
            lastSolidHarvests[msg.sender] = now;
            currentSolidBalances[msg.sender] += availableCoins;

            emit SolidHarvest(msg.sender, availableCoins);
        }
    }
    event SolidHarvest(address indexed _addr, uint256 _value);


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
    event TokensRedeemed(address addr, uint256 amount);


    // USER MANAGMENT
    modifier onlyAdmin() {
        require(userToAdmins[msg.sender]);
        _;
    }


    function makeAdmin(address newAdmin) external onlyOwner {
        require(newAdmin != address(0));
        userToAdmins[newAdmin] = true;
        emit NewAdmin(newAdmin);
    }
    event NewAdmin(address addr);


    function revokeAdminRights(address admin) external onlyOwner {
        require(admin != address(0));
        userToAdmins[admin] = false;
        emit AdminRevoked(admin);
    }
    event AdminRevoked(address addr);


    function activateUser(address user) external onlyAdmin {
        require(user != address(0));
        require(!activeStatus[user]);
        activeStatus[user] = true;
        lastHollowHarvests[user] = now;
        lastSolidHarvests[user] = now;
        emit UserActivated(user, now, now);
    }
    event UserActivated(address addr, uint256 lastHollowHarvest, uint256 lastSolidHarvest);


    function deactivateUser(address user) external onlyAdmin {
        require(activeStatus[user]);
        activeStatus[user] = false;
        emit UserDeactivated(user);
    }
    event UserDeactivated(address addr);
}
