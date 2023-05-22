// SPDX-License-Identifier: MIT
import "@chainlink/contracts/src/v0.8/interfaces/AutomationCompatibleInterface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";

import "hardhat/console.sol";


pragma solidity 0.8.18;

contract KeeperMock {

    uint256 private lastUpkeepId;

    mapping(uint256 => address) private upkeeps;
    mapping(uint256 => UpkeepInfo) private upkeepInfos;

    struct UpkeepInfo {
        address target;
        uint32 executeGas;
        bytes checkData;
        uint96 balance;
        address admin;
        uint64 maxValidBlocknumber;
        uint32 lastPerformBlockNumber;
        uint96 amountSpent;
        bool paused;
        bytes offchainConfig;
    }



    LinkTokenInterface internal LinkToken;

    uint96 private FEE = 0.01 ether;


    constructor(address _linkTokenAddress){
        LinkToken = LinkTokenInterface(_linkTokenAddress);
    }

    function register(address _contractAddress) external{
        upkeeps[lastUpkeepId] = _contractAddress;
        UpkeepInfo storage info;
        info = upkeepInfos[lastUpkeepId];
        
        lastUpkeepId++; 
    }

    function addFunds(uint256 _upkeepId, uint96 _amount) external {
        LinkToken.transferFrom(msg.sender, address(this), _amount);
        UpkeepInfo storage info = upkeepInfos[_upkeepId];
        info.balance = info.balance + _amount;
    }

    function getUpkeep(uint256 id) external view returns(UpkeepInfo memory upkeepInfo){
        UpkeepInfo storage info = upkeepInfos[id];
        return info;
    }

    function upkeep(uint256 _upkeepId) external {
        AutomationCompatibleInterface Contract = AutomationCompatibleInterface(upkeeps[_upkeepId]);
        Contract.performUpkeep("");

        UpkeepInfo storage info = upkeepInfos[_upkeepId];

        info.balance = info.balance - FEE;

    }

    // function upkeep(uint256 _upkeepId) external returns(bool, bytes memory){
    //     // console.log(upkeeps[_upkeepId]);
    //     address caller = upkeeps[_upkeepId];
    //     AutomationCompatibleInterface a;

    //     bytes memory resp = abi.encodeWithSelector(a.performUpkeep.selector, "");
    //     (bool success, bytes memory data) = caller.call(resp);

    //     upkeepBalances[_upkeepId] = upkeepBalances[_upkeepId] - FEE;

    //     return (success, data);
    // }

}
