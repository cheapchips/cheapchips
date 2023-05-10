// SPDX-License-Identifier: MIT
import "./VRFCoordinatorV2FeeConfigInterface.sol";

pragma solidity 0.8.18;

contract ChipsJackpotMaintenance {

    // will use Chainlink datafeeds

    // (500 gwei) * ( 100 000 max callback gas + 200 000 max verification gas)
    uint256 internal totalGasCostPerRequest = 150000000 gwei;

    VRFCoordinatorV2FeeConfigInterface private Coordinator;

    constructor(address _coordinatorAddress)
    {
        Coordinator = VRFCoordinatorV2FeeConfigInterface(_coordinatorAddress);
    }

    function calculateLinkCostInNative(uint256 _amount) internal pure returns(uint256) {
        // 1 LINK = 7.42 MATIC
        return 7.42 ether * _amount / 10**6;
    }

    function calculateTotalRequestCost() public view returns(uint256) {
        (uint256 premiumInLINKMillionths,,,,,,,,) = Coordinator.getFeeConfig();
        uint256 premiumCostInNative = calculateLinkCostInNative(premiumInLINKMillionths);
        return totalGasCostPerRequest + premiumCostInNative;
    }

    

}

