// contracts
const CommunityCoin = artifacts.require("./CommunityCoin.sol");

// helpers
const helper = require("./helpers/truffleTestHelper");

// tests
contract('CommunityCoin Tests', function(accounts) {
    // BASE CONTRACT FUNCTIONALITY
    let coco;

    it('should be deployed, CommunityCoin', async () => {
        coco = await CommunityCoin.deployed();
        assert(coco !== undefined, 'CommunityCoin was NOT deployed');
    });

    const account_1 = accounts[0];
    const account_2 = accounts[1];
    const account_3 = accounts[2];
    const account_4 = accounts[3];
    const account_5 = accounts[4];
    const donation_amount = 2;

    // CONTRACT DONATIONS
    it(`should donate ${donation_amount} ether from Account 1 to CommunityCoin Contract`, async () => {
        const contract_before = web3.eth.getBalance(coco.address);
        const account_1_before = web3.eth.getBalance(account_1);

        const tx = await coco.donateToContract({ from: account_1, value: web3.toWei(donation_amount, "ether") });

        const contract_after = web3.eth.getBalance(coco.address);
        const account_1_after = web3.eth.getBalance(account_1);

        assert.isAbove(contract_after.toNumber(), contract_before.toNumber(), 'CommunityCoin Contract did not recieve donation');
        assert.isBelow(account_1_after.toNumber(), account_1_before.toNumber(), 'Account 1 did not send the donation');
    });

    // USER MANAGMENT
    it('should create new Admins', async () => {
        try {
            const tx1 = await coco.makeAdmin(account_5, { from: account_1 });
            assert(true, 'Owner was able to create a new Admin');
        } catch(e) {
            assert(false, 'Owner was not able to create a new Admin');
        }

        try {
            const tx2 = await coco.makeAdmin(account_2, { from: account_2 });
            assert(false, 'Not owner was able to create a new Admin');
        } catch(e) {
            assert(true, 'Not owner was not able to create a new Admin');
        }

        const adminStatusAccount5 = await coco.checkIfAdmin(account_5);
        const adminStatusAccount2 = await coco.checkIfAdmin(account_2);
        assert.equal(adminStatusAccount5, true, 'Account 5 is not admin');
        assert.equal(adminStatusAccount2, false, 'Account 2 is admin');
    });

    it('should revoke Admins', async () => {
        try {
            const tx1 = await coco.revokeAdminRights(account_5, { from: account_2 });
            assert(false, 'Not owner was able to revoke Admin rights');
        } catch(e) {
            assert(true, 'Not owner was not able to revoke Admin rights');
        }

        try {
            const tx2 = await coco.revokeAdminRights(account_5, { from: account_1 });
            assert(true, 'Owner was able to revoke Admin rights');
        } catch(e) {
            assert(false, 'Owner was not able to revoke Admin rights');
        }

        const adminStatusAccount5 = await coco.checkIfAdmin(account_5);
        assert.equal(adminStatusAccount5, false, 'Account 5 is not admin');
    });

    it('should activate and deactivate users', async () => {
        try {
            const tx1 = await coco.activateUser(account_5, { from: account_1 });
            assert(true, 'Admin was able to activate the user');
        } catch(e) {
            assert(false, 'Admin was not able to activate the user');
        }

        let account5UserStatus = await coco.getActiveStatus(account_5);
        assert.equal(account5UserStatus, true, 'Account 5 is not active');

        try {
            const tx2 = await coco.deactivateUser(account_5, { from: account_3 });
            assert(false, 'Not Admin was able to deactivate the user');
        } catch(e) {
            assert(true, 'Not Admin was not able to deactivate the user');
        }

        account5UserStatus = await coco.getActiveStatus(account_5);
        assert.equal(account5UserStatus, true, 'Account 5 is not active');

        try {
            const tx2 = await coco.deactivateUser(account_5, { from: account_1 });
            assert(true, 'Admin was able to deactivate the user');
        } catch(e) {
            assert(false, 'Admin was not able to deactivate the user');
        }

        account5UserStatus = await coco.getActiveStatus(account_5);
        assert.equal(account5UserStatus, false, 'Account 5 is still active');
    });


    // USER ACTIONS + INTERACTIONS
    it('should redeem solid Community Coins from Account 1', async () => {
        const account_1_before = web3.eth.getBalance(account_1);
        const tx1 = await coco.redeemTokens({ from: account_1 });
        const account_1_after = web3.eth.getBalance(account_1);
        assert.isAbove(account_1_after.toNumber(), account_1_before.toNumber(), 'Account 1 did not recieve the redeemed value');

        const solidTokenCount = await coco.getBalances.call({ from: account_1 });
        assert.equal(solidTokenCount[1].toNumber(), 0, 'Account 1 still has tokens after redemption');
    });

    it('should harvest solid Community Coins from Account 1', async () => {
        const acct1BalancesBefore = await coco.getBalances({ from: account_1 });
        const tx1 = await coco.harvestSolidCoins({ from: account_1 });
        const acct1BalancesAfter = await coco.getBalances({ from: account_1 });
        assert.isAbove(acct1BalancesAfter[1].toNumber(), acct1BalancesBefore[1].toNumber(), 'Account 1 did not recieve harvested Solid coins');
    });

    it('should activate 2 users and set their timestamps', async () => {
        const tx1 = await coco.activateUser(account_3, { from: account_1 });
        const tx2 = await coco.activateUser(account_4, { from: account_1 });

        const account3UserStatus = await coco.getActiveStatus(account_3);
        const account4UserStatus = await coco.getActiveStatus(account_4);
        assert.equal(account3UserStatus, true, 'Account 3 is not active');
        assert.equal(account4UserStatus, true, 'Account 4 is not active');

        const acct3Balances = await coco.getBalances({ from: account_3 });
        const acct3HollowBalance = acct3Balances[0];
        const acct3SolidBalance = acct3Balances[1];
        const acct4Balances = await coco.getBalances({ from: account_4 });
        const acct4HollowBalance = acct4Balances[0];
        const acct4SolidBalance = acct4Balances[1];
        assert.equal(acct3HollowBalance.toNumber(), 0, 'Account 3 Hollow Balance is not empty');
        assert.equal(acct3SolidBalance.toNumber(), 0, 'Account 3 Solid Balance is not empty');
        assert.equal(acct4HollowBalance.toNumber(), 0, 'Account 4 Hollow Balance is not empty');
        assert.equal(acct4SolidBalance.toNumber(), 0, 'Account 4 Solid Balance is not empty');
    });


    const week = 2419200;

    it(`should advance time and block together ${week} seconds`, async () => {
        const originalBlock = web3.eth.getBlock('latest');
        const newBlock = await helper.advanceTimeAndBlock(week);
        const timeDiff = newBlock.timestamp - originalBlock.timestamp;

        assert.isTrue(timeDiff >= week, 'time and block were not advanced');
    });

    it(`should harvest hollow coins for account 3 and 4`, async () => {
        const tx1 = await coco.harvestHollowCoins({ from: account_3 });
        const tx2 = await coco.harvestHollowCoins({ from: account_4 });

        const acct3Balance = await coco.getBalances({ from: account_3 });
        const acct4Balance = await coco.getBalances({ from: account_4 });

        assert.isTrue(acct3Balance[0].toNumber() > 0, 'Account 3 Hollow Balance is empty');
        assert.isTrue(acct4Balance[0].toNumber() > 0, 'Account 4 Hollow Balance is empty');
    });

    it('should send Community Coins from Account 3 to Account 4', async () => {
        const account_4_before = await coco.getBalances({ from: account_4 });
        const tx1 = await coco.sendHollowCoins(account_4, 5, { from: account_3 });
        const account_4_after = await coco.getBalances({ from: account_4 });
        assert.isAbove(account_4_after[2].toNumber(), account_4_before[2].toNumber(), 'Account 4 did not recieve solid coins');
    });

    // CONTRACT MANAGMENT
    it('should trasfer ownership of the contract from Account 1 to Account 2', async () => {
        try {
            const tx = await coco.transferOwnership(account_2, { from: account_1 });
            assert(true, 'Account 1 was able to transfer the ownership of the contract');
        } catch(e) {
            assert(false, 'Account 1 was not able to transfer the ownership of the contract');
        }
    });

    it('should withdraw all ether from contract to Account 2 only', async () => {
        try {
            const tx = await coco.withdraw({ from: account_1 });
            assert(false, 'Account 1 was not able to witdraw funds from the contract');
        } catch(e) {
            assert(true, 'Account 1 was able to witdraw funds from the contract');
        }

        const account_2_before = web3.eth.getBalance(account_2);

        try {
            const tx = await coco.withdraw({ from: account_2 });
            assert(true, 'Account 2 was able to witdraw funds from the contract');
        } catch(e) {
            assert(false, 'Account 2 was able to witdraw funds from the contract');
        }

        const account_2_after = web3.eth.getBalance(account_2);
        assert.isAbove(account_2_after.toNumber(), account_2_before.toNumber(), 'Account 2 did not recieve the funds');
    });

});
