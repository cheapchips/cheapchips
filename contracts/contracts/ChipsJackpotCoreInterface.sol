// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

interface ChipsJackpotCoreInterface {

    struct Player{
        uint8 id;
        bool exists;
    }

    enum RoundState { DEFAULT, CLOSED, ENDED }

    struct Round {
        RoundState state;
        uint256 endTime;
        uint8[] tickets;
        mapping(address => Player) players;
        uint8 numberOfPlayers;
        uint256 randomNumber;
        bool winnerWithdrawedPrize;
    }


    function getCurrentRoundId() external returns (uint256);
    function getRoundData(uint256 _roundId) external returns (uint8, uint8[] memory, uint256, uint256, uint256);
    function getPlayerIdInRound(uint256 _roundId) external returns (uint8);
    function withdrawPrize(uint256 _roundId) external;
    function deposit(uint256 _amount) external payable;
}