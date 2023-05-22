// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

interface VRFCoordinatorV2ExtendedInterface {

    function fundSubscription(
        uint64 _subId, 
        uint96 _amount
        )
        external;
}