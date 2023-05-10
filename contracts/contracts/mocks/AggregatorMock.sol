// SPDX-License-Identifier: MIT
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

pragma solidity 0.8.18;


contract AggregatorMock is AggregatorV3Interface {
    function decimals() external view override returns (uint8) {}

    function description() external view override returns (string memory) {}

    function version() external view override returns (uint256) {}

    struct Round {
        uint80 roundId;
        int256 answer;
        uint256 startedAt;
        uint256 updatedAt;
        uint80 answeredInRound;
    }

    uint80 private currentRoundId;
    mapping(uint80 => Round) private rounds;

    function getRoundData(
        uint80 _roundId
    )
        external
        view
        override
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
        override
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        return (
            rounds[currentRoundId].roundId,
            rounds[currentRoundId].answer,
            rounds[currentRoundId].startedAt,
            rounds[currentRoundId].updatedAt,
            rounds[currentRoundId].answeredInRound
        );
    }

    function fillRoundData(int256 _answer) external{
        Round storage round = rounds[currentRoundId];
        round.roundId = currentRoundId;
        round.answer = _answer;
        currentRoundId++;
    }
}

