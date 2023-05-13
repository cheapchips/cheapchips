// SPDX-License-Identifier: MIT
import "./VRFCoordinatorV2ExtendedInterface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/utils/math/SafeCast.sol";
import "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";

import "hardhat/console.sol";

using SafeCast for int256;


pragma solidity 0.8.18;

contract ChipsJackpotMaintenance {

    /**
     * @dev Calulated gas cost for Chainlink VRF request:
     * @dev 500 gwei - max gas price (selected gas lane) 
     * @dev 100 000 gas units - max callback gas
     * @dev 200 000 gas units - max verification gas
     * @dev vrf_gas_cost = 500 gwei * (100 000  + 200 000) = 150 000 000 gwei

     * @dev Calculated gas cost for Chainlink Automation:
     * @dev 300 gwei - average gas price (on the Polygon)
     * @dev 150000 gas units - closeRound() gas usage
     * @dev 80000 gas units - gas overhead
     * @dev 0.7 - payment premium
     * @dev automation_gas_cost = (300 gwei * 150 000) * (1 + 0.7) + (300 gwei * 80 000) = 76 636 000 gwei 
     * 
     * @dev Total gas cost per round:
     * @dev total_gas_cost_per_round = vrf_gas_cost + automation_gas_cost = 226 636 000 gwei -> 240 000 000 gwei
     */
    uint256 private totalGasCostPerRound = 240000000 gwei;




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

    function calculateTotalRoundCost() public view returns(uint256) {
        (uint256 premiumInLINKMillionths,,,,,,,,) = Coordinator.getFeeConfig();
        uint256 premiumCostInNative = calculateLinkCostInNative(premiumInLINKMillionths) / 10**6;
        return totalGasCostPerRound + premiumCostInNative; 
    }

    function deliverLINK(uint256 _amount) external {
        LinkToken.transferFrom(msg.sender, address(this), _amount);
        LinkToken.transferAndCall(address(Coordinator), _amount, abi.encode(subscriptionId));

        uint256 refund = calculateLinkCostInNative(_amount) / 1 ether;
        payable(msg.sender).transfer(refund);
    }

    receive() external payable {}
}

