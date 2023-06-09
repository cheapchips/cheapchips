// SPDX-License-Identifier: MIT
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";

pragma solidity 0.8.18;

contract VRFSubscriptionCreator{

    VRFCoordinatorV2Interface Coordinator;
    LinkTokenInterface LinkToken;


    uint64 public subId;

    constructor(address _vrfCoordinatorAddress, address _linkTokenAddress){
        Coordinator = VRFCoordinatorV2Interface(_vrfCoordinatorAddress);
        LinkToken = LinkTokenInterface(_linkTokenAddress);
    }

    function createNewSubscription() external {
        subId = Coordinator.createSubscription();
    }

    function addConsumer(address _consumerAddress) external {
        Coordinator.addConsumer(subId, _consumerAddress);
    }

    function getSubId() external view returns(uint64) {
        return subId;
    }


    function topUpSubscription(uint256 _amount) external {
        LinkToken.transferAndCall(address(Coordinator), _amount, abi.encode(subId));
    }
}