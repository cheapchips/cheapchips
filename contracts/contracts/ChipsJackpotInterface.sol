// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

interface ChipsJackpotInterface {
    function getCurrentRoundId() external returns (uint256);
    function getRoundData(uint256 _roundId) external returns (uint8, uint8[] memory, uint256, uint256, uint256);
    function getPlayerIdInRound(uint256 _roundId) external returns (uint8);
    function withdrawPrize(uint256 _roundId) external;
    function deposit(uint256 _amount) external payable;
    function rawFulfillRandomWords(uint256 requestId, uint256[] memory randomWords) external;
}