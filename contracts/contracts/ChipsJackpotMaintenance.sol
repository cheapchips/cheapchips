// SPDX-License-Identifier: MIT
import "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AutomationRegistryInterface2_0.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "./VRFCoordinatorV2ExtendedInterface.sol";

import "hardhat/console.sol";

pragma solidity 0.8.18;

contract ChipsJackpotMaintenance {


    VRFCoordinatorV2Interface private VRFCoordinator;

    LinkTokenInterface internal LinkToken;

    AutomationRegistryBaseInterface internal AutomationRegistry;

    uint256 private UPKEEP_ID;

    uint64 private SUBSCRIPTION_ID; // VRF subscription method

    uint96 private previousUpkeepBalance = 0;
    uint256 private previousVRFBalance = 0;

    mapping(address => uint256) playerFees; // name to think about



    address private owner;

    constructor(address _coordinatorAddress, address _keeperAddress, address _linkTokenAddress, uint64 _subscriptionId)
    {
        VRFCoordinator = VRFCoordinatorV2Interface(_coordinatorAddress);
        SUBSCRIPTION_ID = _subscriptionId;
        
        AutomationRegistry = AutomationRegistryBaseInterface(_keeperAddress); 

        LinkToken = LinkTokenInterface(_linkTokenAddress);

        LinkToken.approve(_keeperAddress, type(uint256).max);

        owner = msg.sender;

    }

    function getUpkeepBalance() private view returns(uint96) {
        return AutomationRegistry.getUpkeep(UPKEEP_ID).balance;
    }

    function getVRFBalance() private view returns(uint256) {
        (uint256 balance,,,) = VRFCoordinator.getSubscription(SUBSCRIPTION_ID);
        return balance;
    }

    function getFeeSpentOnVRF() internal view returns (uint256) {
        uint256 currentVRFBalance = getVRFBalance();
        uint256 spentOnVRF;
        if(previousVRFBalance < currentVRFBalance) spentOnVRF = 0;
        else spentOnVRF = previousVRFBalance - currentVRFBalance ;
        return spentOnVRF;
    }

    function getFeeSpentOnUpkeep() internal view returns (uint96) {
        uint96 currentUpkeepBalance = getUpkeepBalance();
        uint96 spentOnUpkeep;
        if(previousUpkeepBalance < currentUpkeepBalance) spentOnUpkeep = 0;
        else spentOnUpkeep = previousUpkeepBalance - currentUpkeepBalance ;
        return spentOnUpkeep;
    }

    function getTotalFeeForLastRound() public view returns (uint256) {
        return getFeeSpentOnVRF() + getFeeSpentOnUpkeep();
    }

    function updateUpkeepBalance() internal {
        previousUpkeepBalance = getUpkeepBalance();
    }

    function updateVRFBalance() internal {
        previousVRFBalance = getVRFBalance();
    }

    function depositFees(uint256 _amount) external { // name to think about
        LinkToken.transferFrom(msg.sender, address(this), _amount);
        playerFees[msg.sender] = playerFees[msg.sender] + _amount;
    }

    function balanceFees() external view returns(uint256) {
        return playerFees[msg.sender];
    }

    function spendFees(uint256 _amount) internal {
        require(playerFees[msg.sender] >= _amount, "Insufficient fees balance!");
        playerFees[msg.sender] = playerFees[msg.sender] - _amount;
    }

    function transferToChainlinkServices() internal{
        uint96 upkeepFee = getFeeSpentOnUpkeep();
        uint256 vrfFee = getFeeSpentOnVRF();

        if(vrfFee != 0){
            LinkToken.transferAndCall(address(VRFCoordinator), vrfFee, abi.encode(SUBSCRIPTION_ID));
            // VRFCoordinatorV2ExtendedInterface(address(VRFCoordinator)).fundSubscription(SUBSCRIPTION_ID, uint96(vrfFee)); // only for local env
        } 
        if(upkeepFee != 0) AutomationRegistry.addFunds(UPKEEP_ID, upkeepFee);
    }

    function setUpkeepId(uint256 _id) external {
        require(msg.sender==owner,"Not the owner");
        UPKEEP_ID = _id;
    }


}

