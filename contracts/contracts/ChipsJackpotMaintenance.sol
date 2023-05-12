// SPDX-License-Identifier: MIT
import "./VRFCoordinatorV2FeeConfigInterface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/utils/math/SafeCast.sol";
import "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";

using SafeCast for int256;


pragma solidity 0.8.18;

contract ChipsJackpotMaintenance {

    // will use Chainlink datafeeds

    // (500 gwei) * ( 100 000 max callback gas + 200 000 max verification gas)
    uint256 internal totalGasCostPerRequest = 150000000 gwei;

    VRFCoordinatorV2FeeConfigInterface private Coordinator;

    AggregatorV3Interface internal priceFeed;

    LinkTokenInterface internal LinkToken;


    constructor(address _coordinatorAddress, address _aggregatorAddress, address _linkTokenAddress)
    {
        Coordinator = VRFCoordinatorV2FeeConfigInterface(_coordinatorAddress);
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
        return price.toUint256() * _amount / 10**6;
    }

    

    function calculateTotalRequestCost() public view returns(uint256) {
        (uint256 premiumInLINKMillionths,,,,,,,,) = Coordinator.getFeeConfig();
        uint256 premiumCostInNative = calculateLinkCostInNative(premiumInLINKMillionths);
        return totalGasCostPerRequest + premiumCostInNative; 
    }

    // function deliverLINK() external {
    // }

    

}

