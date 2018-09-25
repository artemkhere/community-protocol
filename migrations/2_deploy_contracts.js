const CommunityCoin = artifacts.require("./CommunityCoinV2.sol");

module.exports = function(deployer) {
    deployer.deploy(CommunityCoin);
};
