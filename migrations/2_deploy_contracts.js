const CommunityCoin = artifacts.require("./CommunityCoin.sol");

module.exports = function(deployer) {
    deployer.deploy(CommunityCoin);
};
