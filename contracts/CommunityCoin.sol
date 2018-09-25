pragma solidity ^0.4.18;

import "./ConvertLib.sol";

contract CommunityCoin {
	mapping (address => uint) hollowBalances;
    mapping (address => uint) solidBalances;
    mapping (address => uint) lastHarvests;
    mapping (address => uint) ownerToUser;
    mapping (uint => address) userToOwner;
    uint idCount = 1;

    struct Transaction {
        address toAddress;
        uint sentValue;
        uint timestamp;
    }

    Transaction[] transactions;

    struct PrivateUser {
        string name;
        uint id;
        uint[] sentTransactions;
        // future considerations
        // bool active;
    }

    PrivateUser[] public userList;

    constructor() public {
        hollowBalances[tx.origin] = 10000;
        solidBalances[tx.origin] = 250;
        lastHarvests[tx.origin] = now; // owner last hollow harvest
        userList.push(PrivateUser("_emptyUser", 0, new uint[](0)));
    }

    event NewUserCreated(string name, uint id);

    function createNewUser(string name) public {
        require (ownerToUser[msg.sender] == 0);
        lastHarvests[msg.sender] = now;
        ownerToUser[msg.sender] = idCount;
        userToOwner[idCount] = msg.sender;
        userList.push(PrivateUser(name, idCount, new uint[](0)));
        idCount += 1;
        emit NewUserCreated(name, idCount);
    }

    function getUserFromOwner(address ownerAddress) public view returns(uint) {
        return ownerToUser[ownerAddress];
    }

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    function sendHollowCoins(address receiver, uint amount) public returns(bool sufficient) {
        if (hollowBalances[msg.sender] < amount) return false;
        if (amount > 15) return false;
        if (valueThatCanBeSent(msg.sender, receiver) < amount) return false;

        hollowBalances[msg.sender] -= amount;
        solidBalances[receiver] += amount;

        Transaction memory trns = Transaction(receiver, amount, now);
        uint trnsID = transactions.push(trns) - 1;
        userList[ownerToUser[msg.sender]].sentTransactions.push(trnsID);

        emit Transfer(msg.sender, receiver, amount);
        return true;
    }

    function getHollowBalance(address addr) public view returns(uint) {
        return hollowBalances[addr];
    }

    function getSolidBalance(address addr) public view returns(uint) {
        return solidBalances[addr];
    }

    function checkLastHarvest(address addr) public view returns(uint) {
        return lastHarvests[addr];
    }

    function checkIdCount() public view returns(uint) {
        return idCount;
    }

    // I want this to be view, but it forces me to use storage for my structs array
    function valueThatCanBeSent(address sender, address reciever) public returns(uint) {
        uint[] memory transactionIDs = getTransactionsIDs(sender);
        Transaction[] storage filteredTrns;
        uint maxSendValue = 15;

        for (uint i = 0; i < transactionIDs.length; i++) {
            filteredTrns.push(transactions[transactionIDs[i]]);
        }

        for (uint x = 0; x < filteredTrns.length; x++) {
            address addrMatch = filteredTrns[x].toAddress;
            uint timeMatch = filteredTrns[x].timestamp;
            uint weekAgo = now - 604800;

            if (addrMatch == reciever && timeMatch > weekAgo) {
                maxSendValue -= filteredTrns[x].sentValue;
            }
        }

        return maxSendValue;
    }

    function getTransactionsIDs(address addr) public view returns(uint[]) {
        uint userID = ownerToUser[addr];
        uint[] memory transactionIDs = userList[userID].sentTransactions;

        return transactionIDs;
    }

    event Harvest(address indexed _addr, uint256 _value);

    function harvestHollowCoins() public {
        uint lastHarvest = lastHarvests[msg.sender];
        uint availableCoins = now - lastHarvest;
        if (availableCoins > 0) {
            lastHarvests[msg.sender] = now;
            hollowBalances[msg.sender] += availableCoins;
            emit Harvest(msg.sender, availableCoins);
        }
    }
}
