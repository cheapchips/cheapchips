// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;
import "./ChipsJackpotCore.sol";
import "./ChipsJackpotConsumer.sol";


contract ChipsJackpot is ChipsJackpotCore, ChipsJackpotConsumer {
    constructor(
        address _tokenAddress,
        address _coordinatorAddress,
        uint64 _subscriptionId
    )
        ChipsJackpotCore(_tokenAddress)
        ChipsJackpotConsumer(_coordinatorAddress, _subscriptionId)
    {}

    function addRandomNumberToRound(
        uint256 _randomNumber
    ) internal virtual override {
        require(rounds[currentRoundId].state == RoundState.CLOSED, "Round is still active!");
        rounds[currentRoundId].randomNumber = _randomNumber;
        rounds[currentRoundId].state = RoundState.ENDED;

        emit RoundEnded(currentRoundId, _randomNumber); // modulo op is performed offchain to resolve who is the winner
        
        currentRoundId++; // next round
    }

    function closeRound() external {
        _closeRound();
        requestRandomWords();
    }
}