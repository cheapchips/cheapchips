// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

abstract contract ChipsJackpotConsumer is VRFConsumerBaseV2{
    event OracleRequestSent(uint256 requestId);

    struct OracleRequestStatus {
        bool fulfilled; // whether the request has been successfully fulfilled
        bool exists; // whether a requestId exists
        uint256 randomNumber;
    }

    mapping(uint256 => OracleRequestStatus) s_requests;

    uint64 subscriptionId;

    VRFCoordinatorV2Interface Coordinator;

    bytes32 keyHash = 0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc;

    uint32 callbackGasLimit = 100000;

    uint16 requestConfirmations = 3;


    constructor(address _coordinatorAddress, uint64 _subscriptionId)
    VRFConsumerBaseV2(_coordinatorAddress)
    {
        Coordinator = VRFCoordinatorV2Interface(_coordinatorAddress);
        subscriptionId = _subscriptionId;
    }

    function requestRandomWords() internal returns (uint256 requestId)
    {
        // Request to coordinator
        requestId = Coordinator.requestRandomWords(
            keyHash,
            subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            1
        );
        
        s_requests[requestId] = OracleRequestStatus({
            randomNumber: 0,
            exists: true,
            fulfilled: false
        });


        emit OracleRequestSent(requestId);
        return requestId;
    }

    function fulfillRandomWords(uint256 _requestId, uint256[] memory _randomWords) internal override{
        require(s_requests[_requestId].exists, "request not found");
        s_requests[_requestId].fulfilled = true;
        s_requests[_requestId].randomNumber = _randomWords[0];

        
        addRandomNumberToRound(_randomWords[0]);
    }

    function addRandomNumberToRound(uint256 _randomNumber) internal virtual; 

}