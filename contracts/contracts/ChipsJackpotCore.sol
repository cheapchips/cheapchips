// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./ChipsJackpotCoreInterface.sol";

pragma solidity 0.8.18;


contract ChipsJackpotCore is ChipsJackpotCoreInterface {
    

    IERC20 public token;
  
    event Deposit(address indexed _from, uint8 _id, uint256 _amount);
    event RoundEnded(uint256 _roundId, uint256 _randomNumber);

    uint256 internal currentRoundId;
    mapping(uint256 => Round) internal rounds;  // maps id to round

    constructor(address _tokenAddress) 
    {
        token = IERC20(_tokenAddress);
    }


    function getCurrentRoundId() external view returns (uint256) {
        return currentRoundId;
    }

    function getRoundData(uint256 _roundId) external view returns (uint8, uint8[] memory, uint256, uint256, uint256){
        Round storage round = rounds[_roundId];
        return (round.numberOfPlayers, round.tickets, round.tickets.length, round.endTime, round.randomNumber);
    }

    function getPlayerIdInRound(uint256 _roundId) external view returns(uint8){
        return rounds[_roundId].players[msg.sender].id;
    }


    function _closeRound() internal {
        Round storage round = rounds[currentRoundId];
        require(round.state == RoundState.DEFAULT, "Round can't be closed twice!");
        require(block.timestamp > round.endTime, "Round is still active!");
        round.state = RoundState.CLOSED;
    }

    function withdrawPrize(uint256 _roundId) external {
        Round storage round = rounds[_roundId];
        Player memory player = round.players[msg.sender];
        
        require(round.state == RoundState.ENDED, "The winner of that round has not been chosen yet!");
        require(player.exists, "You haven't participated in that round!");
        // calculate winner id of given round and match it with player's id
        require(round.tickets[round.randomNumber % round.tickets.length] == player.id, "You haven't won that round!");
        // check if the prize has been withdrawed by the player
        require(!round.winnerWithdrawedPrize, "Prize has been already withdrawed!");

        round.winnerWithdrawedPrize = true;

        token.transfer(msg.sender, rounds[_roundId].tickets.length);
    }

    function _deposit(uint256 _amount) internal {

        // protects contract from calling VRF while gas is above 500 gwei
        require(tx.gasprice < 500, "Too high gas price!");

        Round storage round = rounds[currentRoundId];

        require(block.timestamp < round.endTime || round.endTime == 0, "Deposits are closed, wait for the next round...");
        require(round.numberOfPlayers < 100, "Player limit per round reached!");
        require(!round.players[msg.sender].exists, "You have already joined to this round!");
        require(token.balanceOf(msg.sender) >= _amount, "Insufficient token balance!"); 
        require(_amount <= 5, "Deposit limit reached! Only 5 tokens per round.");
        require(_amount > 0, "Can't transfer 0 tokens!");

        token.transferFrom(msg.sender, address(this), _amount);
    
        uint8 id = round.numberOfPlayers;
        round.players[msg.sender] = Player(id, true);
        round.numberOfPlayers++;

        for (uint i; i < _amount; ++i) {
            round.tickets.push(id);
        }

        // 2 will be changed to 10 and 10 seconds to 5 minutes
        if(round.numberOfPlayers == 2){
            round.endTime = block.timestamp + 10 seconds;
        }

        emit Deposit(msg.sender, id, _amount);
    }

}