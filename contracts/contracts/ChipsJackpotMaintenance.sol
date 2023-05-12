// SPDX-License-Identifier: MIT
import "./VRFCoordinatorV2ExtendedInterface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/utils/math/SafeCast.sol";
import "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";

import "hardhat/console.sol";

using SafeCast for int256;


pragma solidity 0.8.18;

contract ChipsJackpotMaintenance {

    // will use Chainlink datafeeds

    // (500 gwei) * ( 100 000 max callback gas + 200 000 max verification gas)
    uint256 internal totalGasCostPerRequest = 150000000 gwei;

    VRFCoordinatorV2ExtendedInterface private Coordinator;

    AggregatorV3Interface internal priceFeed;

    LinkTokenInterface internal LinkToken;

    uint64 private subscriptionId;


    constructor(address _coordinatorAddress, address _aggregatorAddress, address _linkTokenAddress, uint64 _subscriptionId)
    {
        Coordinator = VRFCoordinatorV2ExtendedInterface(_coordinatorAddress);
        subscriptionId = _subscriptionId;
        LinkToken = LinkTokenInterface(_linkTokenAddress);
        /**
        * Network: Mumbai Testnet
        * Aggregator: LINK/MATIC
        * Address: 0x12162c3E810393dEC01362aBf156D7ecf6159528
        */
        priceFeed = AggregatorV3Interface(
            _aggregatorAddress
        );
    }

    function calculateLinkCostInNative(uint256 _amount) internal view returns(uint256) {
        (,int price,,,) = priceFeed.latestRoundData();
        return price.toUint256() * _amount;
    }

    function calculateTotalRequestCost() public view returns(uint256) {
        (uint256 premiumInLINKMillionths,,,,,,,,) = Coordinator.getFeeConfig();
        uint256 premiumCostInNative = calculateLinkCostInNative(premiumInLINKMillionths) / 10**6;
        return totalGasCostPerRequest + premiumCostInNative; 
    }

    function deliverLINK(uint256 _amount) external {
        // user sends link -> contract sends native
        LinkToken.transferFrom(msg.sender, address(this), _amount);
        LinkToken.transferAndCall(address(Coordinator), _amount, abi.encode(subscriptionId));

        uint256 refund = calculateLinkCostInNative(_amount) / 1 ether;
        payable(msg.sender).transfer(refund);
    }

    receive() external payable {}
}

