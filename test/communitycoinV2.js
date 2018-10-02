// contracts
const CommunityCoin = artifacts.require("./CommunityCoinV2.sol");

/**************************************
* Tests
**************************************/

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

    it(`should donate ${donation_amount} ether from Account 1 to CommunityCoin Contract`, async () => {
        const contract_before = await coco.getContractBalance.call();
        const account_1_before = web3.eth.getBalance(account_1);

        const tx = await coco.donateToContract({ from: account_1, value: web3.toWei(donation_amount, "ether") });

        const contract_after = await coco.getContractBalance.call();
        const account_1_after = web3.eth.getBalance(account_1);

        assert.isAbove(contract_after.toNumber(), contract_before.toNumber(), 'CommunityCoin Contract did not recieve donation');
        assert.isBelow(account_1_after.toNumber(), account_1_before.toNumber(), 'Account 1 did not send the donation');

        // const tokenValue = await coco.getTokenValue.call();
        // console.log(web3.toWei(donation_amount, "ether"))
        // console.log(tokenValue.toNumber());
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

    // it('should activate and deactivate users', async () => {
    //
    // });


    // USER INTERACTIONS
    it('should redeem solid Community Coins from Account 1', async () => {
        const account_1_before = web3.eth.getBalance(account_1);
        const tx1 = await coco.redeemTokens({ from: account_1 });
        const account_1_after = web3.eth.getBalance(account_1);
        assert.isAbove(account_1_after.toNumber(), account_1_before.toNumber(), 'Account 1 did not recieve the redeemed value');

        const solidTokenCount = await coco.getCurrentSolidBalance.call(account_1);
        assert.equal(solidTokenCount.toNumber(), 0, 'Account 1 still has tokens after redemption');
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
