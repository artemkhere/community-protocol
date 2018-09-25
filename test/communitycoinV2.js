// contracts
const CommunityCoin = artifacts.require("./CommunityCoinV2.sol");

/**************************************
* Tests
**************************************/

contract('CommunityCoin Tests', function(accounts) {
    let coco;

    it('should be deployed, CommunityCoin', async () => {
        coco = await CommunityCoin.deployed();
        assert(coco !== undefined, 'CommunityCoin was NOT deployed');
    });

    const donation_amount = 1;
    const account_1 = accounts[0];

    it(`should donate ${donation_amount} ether from Account 1 to CommunityCoin Contract`, async () => {
        const contract_before = await coco.getContractBalance.call();
        const account_1_before = web3.eth.getBalance(account_1);

        const tx = await coco.donateToContract({ from: account_1, value: web3.toWei(donation_amount, "ether") });

        const contract_after = await coco.getContractBalance.call();
        const account_1_after = web3.eth.getBalance(account_1);

        assert.isAbove(contract_after.toNumber(), contract_before.toNumber(), 'CommunityCoin Contract did not recieve donation');
        assert.isBelow(account_1_after.toNumber(), account_1_before.toNumber(), 'Account 1 did not send the donation');
    });

});
