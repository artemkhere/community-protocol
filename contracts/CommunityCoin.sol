pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';

contract CommunityCoin is Ownable {
    using SafeMath for uint256;

    // USER RESOURCES
    mapping (address => uint256) public hollowBalances;
    mapping (address => uint256) public currentSolidBalances;
    mapping (address => uint256) public unresolvedSolidBalances;
    mapping (address => uint256) public lastHollowHarvests;
    mapping (address => uint256) public lastSolidHarvests;
    mapping (address => bool) public activeStatus;
    mapping (address => bool) public activationRequested;

    // USER DATA
    mapping (address => string) public profileImages;
    mapping (address => string) public firstNames;
    mapping (address => string) public familyNames;
    mapping (address => string) public departments;
    mapping (address => string) public titles;
    mapping (address => uint256) public activatedTimes;
    mapping (address => string) public userTypes;

    // USER RIGHTS
    mapping (address => bool) public userToAdmins;
    address public owner; // equivalent to Super Admin

    // ADMIN RESOURCES
    address[] public userList;
    address[] public activeUsers;
    address[] public deactivatedUsers;
    address[] public activationRequests;

    // TOKENS
    uint256 public tokenCount; // needs to have minimum 1
    uint256 public tokenValue;

    struct Relationship {
        uint256 maxSendValue;
        uint256 timestamp;
    }

    mapping (address => mapping (address => Relationship)) public userToRelationships;

    constructor() public {
        tokenCount = 158;
        tokenValue = 0;

        owner = msg.sender;
        activeStatus[msg.sender] = true;
        userToAdmins[msg.sender] = true;

        // TESTING SET UP
        firstNames[msg.sender] = 'Artem';
        familyNames[msg.sender] = 'Kuznetsov';
        departments[msg.sender] = 'Engineering';
        titles[msg.sender] = 'Unicorn';
        activatedTimes[msg.sender] = now;
        activationRequested[msg.sender] = true;
        userTypes[msg.sender] = 'owner';

        hollowBalances[msg.sender] = 1;
        currentSolidBalances[msg.sender] = 122;
        unresolvedSolidBalances[msg.sender] = 35;
        lastHollowHarvests[msg.sender] = now - 604800;
        lastSolidHarvests[msg.sender] = now - 604800;
    }


    // ACCESSORS FOR FRONTEND
    function getPersonalInfo(address addr) public view returns(
        string profileImage,
        string firstName,
        string familyName,
        string department,
        string title
    ) {
        profileImage = profileImages[addr];
        firstName = firstNames[addr];
        familyName = familyNames[addr];
        department = departments[addr];
        title = titles[addr];
    }

    function getAccountInfo(address addr) public view returns(
        uint256 activatedTime,
        bool activationRequest,
        bool active,
        string userType
    ) {
        activatedTime = activatedTimes[addr];
        activationRequest = activationRequested[addr];
        active = activeStatus[addr];
        userType = userTypes[addr];
    }

    function getBalances() public view returns(
        uint256 hollowBalance,
        uint256 currentSolidBalance,
        uint256 unresolvedSolidBalance,
        uint256 lastHollowHarvest,
        uint256 lastSolidHarvest
    ) {
        hollowBalance = hollowBalances[msg.sender];
        currentSolidBalance = currentSolidBalances[msg.sender];
        unresolvedSolidBalance = unresolvedSolidBalances[msg.sender];
        lastHollowHarvest = lastHollowHarvests[msg.sender];
        lastSolidHarvest = lastSolidHarvests[msg.sender];
    }

    function getAllUsers() public view returns(address[] memory) {
        return userList;
    }

    function getActivationRequests() public view returns(address[] memory) {
        return activationRequests;
    }

    // SETTERS FOR FRONTEND
    function setUserInfo(
        string profileImage,
        string firstName,
        string familyName,
        string department,
        string title
    ) public {
        profileImages[msg.sender] = profileImage;
        firstNames[msg.sender] = firstName;
        familyNames[msg.sender] = familyName;
        departments[msg.sender] = department;
        titles[msg.sender] = title;
        emit UserInfoUpdated(msg.sender);
    }
    event UserInfoUpdated(address addr);

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

    // USER ACTIONS
    function requestActivation(
        string profileImage,
        string firstName,
        string familyName,
        string department,
        string title
    ) public {
        require (!activationRequested[msg.sender]);
        activationRequested[msg.sender] = true;
        activationRequests.push(msg.sender);
        profileImages[msg.sender] = profileImage;
        firstNames[msg.sender] = firstName;
        familyNames[msg.sender] = familyName;
        departments[msg.sender] = department;
        titles[msg.sender] = title;
        emit UserInfoUpdated(msg.sender);
        emit ActivationRequested(msg.sender);
    }
    event ActivationRequested(address addr);

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
        /* uint256 lastHarvest = lastSolidHarvests[msg.sender]; */
        /* require((lastHarvest + 2419200) <= now); */
        uint256 availableCoins = unresolvedSolidBalances[msg.sender];
        require(availableCoins > 0);

        if (availableCoins > 0) {
            lastSolidHarvests[msg.sender] = now;
            currentSolidBalances[msg.sender] += availableCoins;
            unresolvedSolidBalances[msg.sender] = 0;

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

    function checkIfAdmin(address user) public view returns(bool) {
        return userToAdmins[user];
    }

    function getActiveStatus(address user) public view returns(bool) {
        return activeStatus[user];
    }

    function makeAdmin(address newAdmin) external onlyOwner {
        require(newAdmin != address(0));
        userToAdmins[newAdmin] = true;
        userTypes[newAdmin] = 'admin';
        emit NewAdmin(newAdmin);
    }
    event NewAdmin(address addr);

    function revokeAdminRights(address admin) external onlyOwner {
        require(admin != address(0));
        userToAdmins[admin] = false;
        userTypes[admin] = 'user';
        emit AdminRevoked(admin);
    }
    event AdminRevoked(address addr);

    function activateUser(address user) external onlyAdmin {
        require(user != address(0));
        require(!activeStatus[user]);
        removeRequesterFromQueu(user);
        activeStatus[user] = true;
        activatedTimes[user] = now;
        lastHollowHarvests[user] = now;
        lastSolidHarvests[user] = now;
        userList.push(user);
        activeUsers.push(user);
        userTypes[user] = 'user';
        emit UserActivated(user);
    }
    event UserActivated(address addr);

    function removeRequesterFromQueu(address requester) internal {
        address[] memory rq = activationRequests;
        if (rq.length < 1) { return; }
        for (uint16 i = 0; i < rq.length; i++) {
            if (rq[i] == requester) { activationRequests[i] = 0x0; return; }
        }
        return;
    }

    /* function removeRequesterAtIndex(uint16 index) internal {
        require (index >= activationRequests.length);

        for (uint16 i = index; i < activationRequests.length - 1; i++) {
            activationRequests[i] = activationRequests[i + 1];
        }

        delete activationRequests[activationRequests.length - 1];
        activationRequests.length--;
    } */

    function deactivateUser(address user) external onlyAdmin {
        require(activeStatus[user]);
        activeStatus[user] = false;
        userTypes[user] = 'deactivated';

        emit UserDeactivated(user);
    }
    event UserDeactivated(address addr);

    function removeActiveUser(address user) internal {
        address[] memory au = activeUsers;
        if (au.length < 1) { return; }
        for (uint16 i = 0; i < au.length; i++) {
            if (au[i] == user) { activeUsers[i] = 0x0; return; }
        }
        return;
    }

    /* function removeActiveUserAtIndex(uint16 index) internal {
        require (index >= activeUsers.length);

        for (uint16 i = index; i < activeUsers.length - 1; i++) {
            activeUsers[i] = activeUsers[i + 1];
        }

        delete activeUsers[activeUsers.length - 1];
        activeUsers.length--;
    } */

    // possibility of duplicated users in deactivated user list
}
