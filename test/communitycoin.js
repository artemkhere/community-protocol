var CommunityCoin = artifacts.require("./CommunityCoin.sol");

contract('CommunityCoin', function(accounts) {
    it("should put 10000 hollow CommunityCoins in the first account", function() {
        return CommunityCoin.deployed().then(function(instance) {
            return instance.getHollowBalance.call(accounts[0]);
        }).then(function(hollowBalance) {
            assert.equal(hollowBalance.valueOf(), 10000, "10000 hollow wasn't in the first account");
        });
    });

    it("should put 250 solid CommunityCoins in the first account", function() {
        return CommunityCoin.deployed().then(function(instance) {
            return instance.getSolidBalance.call(accounts[0]);
        }).then(function(hollowBalance) {
            assert.equal(hollowBalance.valueOf(), 250, "250 solid wasn't in the first account");
        });
    });

    it("should set idCount to 1", function() {
        return CommunityCoin.deployed().then(function(instance) {
            return instance.checkIdCount.call();
        }).then(function(idCount) {
            assert.equal(idCount.valueOf(), 1, "id count was not set to 1");
        });
    });

    it("should create a new user", function() {
        const account = accounts[0];

        return CommunityCoin.deployed(
        ).then(function(instance) {
            return instance.createNewUser("Artem K", { from: account });
        }).then(function(result) {
            assert(true, 'New User was created');
        }).catch(function(e) {
            assert(false, 'New User was not created');
        });
    });

    it("should only allow creation of one user under the same address", function() {
        const account = accounts[0];

        return CommunityCoin.deployed(
        ).then(function(instance) {
            return instance.createNewUser("Artem K", { from: account });
        }).then(function(result) {
            assert(false, 'New User was created, but it should not have been');
        }).catch(function(e) {
            assert(true, 'New User was not created and thats great');
        });
    });

    it("should create second new user", function() {
        const account = accounts[1];

        return CommunityCoin.deployed(
        ).then(function(instance) {
            return instance.createNewUser("Jenn K", { from: account });
        }).then(function(result) {
            assert(true, 'Second User was created');
        }).catch(function(e) {
            assert(false, 'Second User was not created');
        });
    });

    it("should check second user id equals 2", function() {
        const account = accounts[1];

        return CommunityCoin.deployed().then(function(instance) {
            return instance.getUserFromOwner.call(account);
        }).then(function(id) {
            assert.equal(id.toNumber(), 2, 'second user id equals 2');
        });
    });

    // it("should send hollow coins correctly", function() {
    //     var coco;
    //
    //     // Get initial balances of first and second account.
    //     var account_one = accounts[0];
    //     var account_two = accounts[1];
    //
    //     var account_one_starting_hollow_balance;
    //     var account_two_starting_solid_balance;
    //     var account_one_ending_hollow_balance;
    //     var account_two_ending_solid_balance;
    //
    //     var amount = 15;
    //
    //     return CommunityCoin.deployed(
    //     ).then(function(instance) {
    //         coco = instance;
    //         return coco.getHollowBalance.call(account_one);
    //     }).then(function(balance) {
    //         account_one_starting_hollow_balance = balance.toNumber();
    //         return coco.getSolidBalance.call(account_two);
    //     }).then(function(balance) {
    //         account_two_starting_solid_balance = balance.toNumber();
    //         return coco.sendHollowCoins(account_two, amount, { from: account_one });
    //     }).then(function() {
    //         return coco.getHollowBalance.call(account_one);
    //     }).then(function(balance) {
    //         account_one_ending_hollow_balance = balance.toNumber();
    //         return coco.getSolidBalance.call(account_two);
    //     }).then(function(balance) {
    //         account_two_ending_solid_balance = balance.toNumber();
    //
    //         assert.equal(account_one_ending_hollow_balance, account_one_starting_hollow_balance - amount, "Hollow coins weren't correctly taken from the sender");
    //         assert.equal(account_two_ending_solid_balance, account_two_starting_solid_balance + amount, "Solid coins weren't correctly sent to the receiver");
    //     });
    // });

    it('should send 5 hollow coins correctly', async () => {
        let coco = await CommunityCoin.deployed();
        const accn_1 = accounts[0];
        const accn_2 = accounts[1];
        const amount = 5;

        const accn_1_start_hollow_blnc = await coco.getHollowBalance.call(accn_1);
        const accn_2_start_solid_blnc = await coco.getSolidBalance.call(accn_2);
        const send_tx = await coco.sendHollowCoins(accn_2, amount, { from: accn_1 });
        const accn_1_end_hollow_blnc = await coco.getHollowBalance.call(accn_1);
        const accn_2_end_solid_blnc = await coco.getSolidBalance.call(accn_2);
        assert.equal(accn_1_end_hollow_blnc.toNumber(), accn_1_start_hollow_blnc.toNumber() - amount, "Hollow coins weren't correctly taken from the sender");
        assert.equal(accn_2_end_solid_blnc.toNumber(), accn_2_start_solid_blnc.toNumber() + amount, "Solid coins weren't correctly sent to the receiver");
    });

    // it("should harvest coins correctly and update the timestamp", function() {
    //     var coco;
    //
    //     // Get initial hollow balance of an account.
    //     var account = accounts[0];
    //
    //     var starting_hollow_balance;
    //     var ending_hollow_balance;
    //     var starting_timestamp;
    //     var ending_timestamp;
    //
    //     return CommunityCoin.deployed().then(function(instance) {
    //         coco = instance;
    //         return coco.getHollowBalance.call(account);
    //     }).then(function(balance) {
    //         starting_hollow_balance = balance.toNumber();
    //         return coco.checkLastHarvest.call(account);
    //     }).then(function(timestamp) {
    //         starting_timestamp = timestamp.toNumber();
    //     }).then(function() {
    //         return new Promise(function(resolve) {
    //             console.log('      waiting 5 seconds for coin harvest')
    //             return setTimeout(function() { resolve(); }, 5000);
    //         });
    //     }).then(function() {
    //         return coco.harvestHollowCoins({ from: account });
    //     }).then(function() {
    //         return coco.getHollowBalance.call(account);
    //     }).then(function(balance) {
    //         ending_hollow_balance = balance.toNumber();
    //         return coco.checkLastHarvest.call(account);
    //     }).then(function(timestamp) {
    //         ending_timestamp = timestamp.toNumber();
    //
    //         assert.isBelow(starting_hollow_balance, ending_hollow_balance, "Hollow coins were not added to the balance after harvest");
    //         assert.isBelow(starting_timestamp, ending_timestamp, "Timestamp was not updated after harvest");
    //     });
    // });

    // it('should create a new user', async () => {
    //     const account_one = accounts[0];
    //
    //     try {
    //         const tx = await CommunityCoin.createNewUser("Artem K", account_one, { from: account_one });
    //         assert(true, 'New User was created');
    //     } catch(e) {
    //         assert(false, 'New User was not created');
    //     }
    // });
});
