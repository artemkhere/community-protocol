var ConvertLib = artifacts.require("./ConvertLib.sol");
var CommunityCoin = artifacts.require("./CommunityCoin.sol");

module.exports = function(deployer) {
    deployer.deploy(ConvertLib);
    deployer.link(ConvertLib, CommunityCoin);
    deployer.deploy(CommunityCoin);
};
