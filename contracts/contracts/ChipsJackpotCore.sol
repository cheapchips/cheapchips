// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./ChipsJackpotCoreInterface.sol";

pragma solidity 0.8.18;


contract ChipsJackpotCore is ChipsJackpotCoreInterface {
    

    IERC20 public token;
  
    event Deposit(address indexed _from, uint8 _id, uint256 _amount);
    event RoundEnded(uint256 _roundId, uint256 _randomNumber);
    event Closed(uint256 _roundId);
    event Withdrawal(address indexed _to, uint256 _amount);

    uint256 internal currentRoundId;
    mapping(uint256 => Round) internal rounds;  // maps id to round

    uint256 internal MIN_PLAYERS = 3;
    uint256 internal MAX_PLAYERS = 100;
    uint256 internal END_TIME = 1 minutes;

    address private owner;

    constructor(address _tokenAddress) 
    {
        owner = msg.sender;
        token = IERC20(_tokenAddress);
    }

      modifier onlyOwner{
        require(msg.sender==owner,"Not the owner");
        _;
    }



    function getCurrentRoundId() external view returns (uint256) {
        return currentRoundId;
    }

    function getRoundData(uint256 _roundId) external view returns (uint8, uint8[] memory, uint256, uint256, uint256, RoundState){
        Round storage round = rounds[_roundId];
        return (round.numberOfPlayers, round.tickets, round.tickets.length, round.endTime, round.randomNumber, round.state);
    }

 function getRoundDataRange(uint256 _startId, uint256 _stopId) external view returns(ArchivedRound[] memory){

        ArchivedRound[] memory archivedRounds = new ArchivedRound[](_stopId - _startId + 1);

        for (uint256 i =_startId; i <= _stopId; ++i) {
            Round storage round = rounds[i];

            Player memory player = round.players[msg.sender];
            ArchivedRound memory archivedRound;
            
            archivedRound.id = i;
            archivedRound.numberOfPlayers = round.numberOfPlayers;
            archivedRound.playerId = round.players[msg.sender].id;

            ParicipationStatus status = ParicipationStatus.NONE;

            uint8 winnerId = round.tickets[round.randomNumber % round.tickets.length];

            if(player.exists && round.state == RoundState.ENDED) {
                if(winnerId == player.id) {
                    status = ParicipationStatus.WIN;
                    if(round.winnerWithdrawedPrize){
                        status = ParicipationStatus.WITHDRAWN;
                    }
                }
                else status = ParicipationStatus.LOSE;
            }

            archivedRound.playerParticipationStatus = status;
            archivedRound.prizePool = round.tickets.length;
            archivedRound.endTime = round.endTime;
            archivedRound.winnerId = winnerId;

            archivedRounds[i] = (archivedRound);
        }
        return archivedRounds;
    }

    function getPlayerIdInRound(uint256 _roundId) external view returns(uint8 id, bool exists){
        id = rounds[_roundId].players[msg.sender].id; 
        exists = rounds[_roundId].players[msg.sender].exists;
    }



    function getParticipationStatus(uint256 _roundId) external view returns(ParicipationStatus) {
        Round storage round = rounds[_roundId];
        Player memory player = round.players[msg.sender];

        ParicipationStatus status = ParicipationStatus.NONE;

        if(player.exists && round.state == RoundState.ENDED) {
            if(round.tickets[round.randomNumber % round.tickets.length] == player.id) {
                status = ParicipationStatus.WIN;
                if(round.winnerWithdrawedPrize){
                    status = ParicipationStatus.WITHDRAWN;
                }
            }
            else status = ParicipationStatus.LOSE;
        }

        return status;
    }


    function _closeRound() internal {
        Round storage round = rounds[currentRoundId];
        require(round.state == RoundState.DEFAULT, "Round can't be closed twice!");
        require(block.timestamp > round.endTime, "Round is still active!");
        round.state = RoundState.CLOSED;
        emit Closed(currentRoundId);
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
        uint256 amount = rounds[_roundId].tickets.length;

        token.transfer(msg.sender, amount);
        emit Withdrawal(msg.sender, amount);
    }

    function _deposit(uint256 _amount) internal {

        // protects contract from calling VRF while gas is above 500 gwei
        require(tx.gasprice < 500 gwei, "Too high gas price!");

        Round storage round = rounds[currentRoundId];

        require(block.timestamp < round.endTime || round.endTime == 0, "Deposits are closed, wait for the next round...");
        require(round.numberOfPlayers < MAX_PLAYERS, "Player limit per round reached!");
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

        if(round.numberOfPlayers == MIN_PLAYERS){
            round.endTime = block.timestamp + END_TIME;
        }

        emit Deposit(msg.sender, id, _amount);
    }

    function setMinPlayers(uint256 _numberOfPlayers) external onlyOwner {
        MIN_PLAYERS = _numberOfPlayers;
    }

    function setMaxPlayers(uint256 _numberOfPlayers) external onlyOwner {
        MAX_PLAYERS = _numberOfPlayers;
    }

    function setEndTime(uint256 _endTimePeriod) external onlyOwner {
        END_TIME = _endTimePeriod;
    }

    function getMinPlayers() external view returns(uint256) {
        return MIN_PLAYERS;
    }

    function getMaxPlayers() external view returns(uint256) {
        return MAX_PLAYERS;
    }

    function getEndTime() external view returns(uint256) {
        return END_TIME;
    }

}