// SPDX-License-Identifier: MIT
import "./VRFCoordinatorV2FeeConfigInterface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

pragma solidity 0.8.18;

contract ChipsJackpotMaintenance {

    // will use Chainlink datafeeds

    // (500 gwei) * ( 100 000 max callback gas + 200 000 max verification gas)
    uint256 internal totalGasCostPerRequest = 150000000 gwei;

    VRFCoordinatorV2FeeConfigInterface private Coordinator;

    AggregatorV3Interface internal priceFeed;

    constructor(address _coordinatorAddress, address _aggregatorAddress)
    {
        Coordinator = VRFCoordinatorV2FeeConfigInterface(_coordinatorAddress);
        /**
        * Network: Mumbai Testnet
        * Aggregator: BTC/USD
        * Address: 0x12162c3E810393dEC01362aBf156D7ecf6159528
        */
        priceFeed = AggregatorV3Interface(
            _aggregatorAddress
        );
    }




    function calculateLinkCostInNative(uint256 _amount) internal view returns(uint256) {
        // 1 LINK = 7.42 MATIC
        (,int price,,,) = priceFeed.latestRoundData(); 
        return  uint256(price) * _amount / 10**6; // breaks only if price is 10^77
    }

    

    function calculateTotalRequestCost() public view returns(uint256) {
        (uint256 premiumInLINKMillionths,,,,,,,,) = Coordinator.getFeeConfig();
        uint256 premiumCostInNative = calculateLinkCostInNative(premiumInLINKMillionths);
        return totalGasCostPerRequest + premiumCostInNative;
    }

    

}

