// SPDX-License-Identifier: MIT
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

pragma solidity 0.8.18;


contract AggregatorMock is AggregatorV3Interface {
    function decimals() external view returns (uint8) {}

    function description() external view returns (string memory) {}

    function version() external view returns (uint256) {}

    struct Round {
        uint80 roundId;
        int256 answer;
        uint256 startedAt;
        uint256 updatedAt;
        uint80 answeredInRound;
    }

    uint80 private currentRoundId;
    mapping(uint80 => Round) private rounds;

    constructor(){}

    function getRoundData(
        uint80 _roundId
    )
        external
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        return (
            rounds[_roundId].roundId,
            rounds[_roundId].answer,
            rounds[_roundId].startedAt,
            rounds[_roundId].updatedAt,
            rounds[_roundId].answeredInRound
        );
    }

    function latestRoundData()
        external
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        return (
            rounds[currentRoundId-1].roundId,
            rounds[currentRoundId-1].answer,
            rounds[currentRoundId-1].startedAt,
            rounds[currentRoundId-1].updatedAt,
            rounds[currentRoundId-1].answeredInRound
        );
    }

    function fillRoundData(
        int256 _answer
    ) 
        external
    {
        Round storage round = rounds[currentRoundId];
        round.roundId = currentRoundId;
        round.answer = _answer;
        currentRoundId++;
    }
}

