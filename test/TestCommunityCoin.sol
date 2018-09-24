pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/CommunityCoin.sol";

contract TestCommunityCoin {

    function testInitialBalanceUsingDeployedContract() public {
        CommunityCoin coco = CommunityCoin(DeployedAddresses.CommunityCoin());

        uint hollowExpected = 10000;
        uint solidExpected = 250;
        uint currentMoment = now;


        Assert.equal(coco.getHollowBalance(tx.origin), hollowExpected, "Owner should have 10000 hollow CommunityCoins initially");
        Assert.equal(coco.getSolidBalance(tx.origin), solidExpected, "Owner should have 250 solid CommunityCoins initially");
        Assert.isAtMost(coco.checkLastHarvest(tx.origin), currentMoment, "Owners last harvest should be now or earlier");
    }

    function testInitialBalanceWithNewCommunityCoin() public {
        CommunityCoin coco = new CommunityCoin();

        uint hollowExpected = 10000;
        uint solidExpected = 250;
        uint currentMoment = now;


        Assert.equal(coco.getHollowBalance(tx.origin), hollowExpected, "Owner should have 10000 hollow CommunityCoins initially");
        Assert.equal(coco.getSolidBalance(tx.origin), solidExpected, "Owner should have 250 solid CommunityCoins initially");
        Assert.isAtMost(coco.checkLastHarvest(tx.origin), currentMoment, "Owners last harvest should be now or earlier");
    }

}
