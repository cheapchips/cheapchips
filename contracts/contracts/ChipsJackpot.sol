// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;
import "./ChipsJackpotCore.sol";
import "./ChipsJackpotConsumer.sol";
import "./ChipsJackpotMaintenance.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AutomationCompatibleInterface.sol";

import "hardhat/console.sol";


contract ChipsJackpot is ChipsJackpotCore, ChipsJackpotConsumer, ChipsJackpotMaintenance, AutomationCompatibleInterface {

    constructor(
        address _tokenAddress,
        address _coordinatorAddress,
        uint64 _subscriptionId,
        address _keeperAddress,
        address _linkTokenAddress
    )
        ChipsJackpotCore(_tokenAddress)
        ChipsJackpotConsumer(_coordinatorAddress, _subscriptionId)
        ChipsJackpotMaintenance(_coordinatorAddress, _keeperAddress, _linkTokenAddress, _subscriptionId)
    {}

    function addRandomNumberToRound(
        uint256 _randomNumber
    ) internal virtual override {
        require(rounds[currentRoundId].state == RoundState.CLOSED, "Round is still active!");
        rounds[currentRoundId].randomNumber = _randomNumber;
        rounds[currentRoundId].state = RoundState.ENDED;

        emit RoundEnded(currentRoundId, _randomNumber); // modulo op is performed offchain to resolve who is the winner
        
        ++currentRoundId; // next round
    }

    function deposit(uint256 _amount) external payable {
        uint256 serviceFee = getTotalFeeForLastRound() / 3;
        spendFees(serviceFee);
        _deposit(_amount);
    }

    function checkUpkeep(bytes calldata /* checkData */) external view override returns(bool upkeepNeeded, bytes memory perfomData){
        upkeepNeeded = rounds[currentRoundId].endTime > block.timestamp && rounds[currentRoundId].state == RoundState.DEFAULT;
        perfomData = "";
    }

    function performUpkeep(bytes calldata) external override {
        transferToChainlinkServices();
        updateUpkeepBalance();
        updateVRFBalance();
        closeRound();
    }

    // manual - safety valve
    function closeRound() public {
        _closeRound();
        requestRandomWords();
    }
}