// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

interface VRFCoordinatorV2FeeConfigInterface {

    struct FeeConfig {
        // Flat fee charged per fulfillment in millionths of link
        // So fee range is [0, 2^32/10^6].
        uint32 fulfillmentFlatFeeLinkPPMTier1;
        uint32 fulfillmentFlatFeeLinkPPMTier2;
        uint32 fulfillmentFlatFeeLinkPPMTier3;
        uint32 fulfillmentFlatFeeLinkPPMTier4;
        uint32 fulfillmentFlatFeeLinkPPMTier5;
        uint24 reqsForTier2;
        uint24 reqsForTier3;
        uint24 reqsForTier4;
        uint24 reqsForTier5;
    }

    function getFeeConfig()
        external
        view
        returns (
        uint32 fulfillmentFlatFeeLinkPPMTier1,
        uint32 fulfillmentFlatFeeLinkPPMTier2,
        uint32 fulfillmentFlatFeeLinkPPMTier3,
        uint32 fulfillmentFlatFeeLinkPPMTier4,
        uint32 fulfillmentFlatFeeLinkPPMTier5,
        uint24 reqsForTier2,
        uint24 reqsForTier3,
        uint24 reqsForTier4,
        uint24 reqsForTier5
        );

}