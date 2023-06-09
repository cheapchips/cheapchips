// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

interface ChipsJackpotCoreInterface {

    struct Player{
        uint8 id;
        bool exists;
    }

    enum RoundState { DEFAULT, CLOSED, ENDED }
    enum ParicipationStatus { NONE, WIN, LOSE, WITHDRAWN }

    struct Round {
        RoundState state;
        uint256 endTime;
        uint8[] tickets;
        mapping(address => Player) players;
        uint8 numberOfPlayers;
        uint256 randomNumber;
        bool winnerWithdrawedPrize;
    }

    struct ArchivedRound {
        uint256 id;
        uint8 numberOfPlayers;
        uint8 playerId;
        ParicipationStatus playerParticipationStatus;
        uint256 prizePool;
        uint256 endTime;
        uint8 winnerId;
    }


    function getCurrentRoundId() external returns (uint256);
    function getRoundData(uint256 _roundId) external returns (uint8, uint8[] memory, uint256, uint256, uint256, RoundState);
    function getRoundDataRange(uint256 _startId, uint256 _stopId) external view returns (ArchivedRound[] memory archivedRounds);
    function getPlayerIdInRound(uint256 _roundId) external returns (uint8 id, bool exists);
    function withdrawPrize(uint256 _roundId) external;
    function getParticipationStatus(uint256 _roundId) external view returns (ParicipationStatus);
}