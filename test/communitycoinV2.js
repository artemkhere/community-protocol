// contracts
const CommunityCoin = artifacts.require("./CommunityCoinV2.sol");

/**************************************
* Tests
**************************************/

contract('CommunityCoin Tests', function(accounts) {
  let coco;
  const account_1 = accounts[0];
  const account_2 = accounts[1];

  it('should be deployed, CommunityCoin', async () => {
    property = await CommunityCoin.deployed();
    assert(property !== undefined, 'CommunityCoin was NOT deployed');
  });

});
