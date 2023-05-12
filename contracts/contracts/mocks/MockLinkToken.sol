// SPDX-License-Identifier: MIT

/**
 * 
 * SOURCE: https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/mocks/MockLinkToken.sol
 *  
 */
pragma solidity ^0.8.0;

import {ERC677ReceiverInterface} from "@chainlink/contracts/src/v0.8/interfaces/ERC677ReceiverInterface.sol";

contract MockLinkToken {
  uint256 private constant TOTAL_SUPPLY = 1_000_000_000 * 1e18;

  constructor() {
    balances[msg.sender] = TOTAL_SUPPLY;
  }

  mapping(address => uint256) public balances;
  mapping(address => mapping(address => uint256)) public allowances;
  

  function totalSupply() external pure returns (uint256 totalTokensIssued) {
    return TOTAL_SUPPLY; // 1 billion LINK -> 1e27 Juels
  }

  function transfer(address _to, uint256 _value) public returns (bool) {
    balances[msg.sender] = balances[msg.sender] - _value;
    balances[_to] = balances[_to] + _value;
    return true;
  }

  function setBalance(address _address, uint256 _value) external returns (bool) {
    balances[_address] = _value;
    return true;
  }

  function balanceOf(address _address) external view returns (uint256) {
    return balances[_address];
  }

  function transferAndCall(address _to, uint256 _value, bytes calldata _data) public returns (bool success) {
    transfer(_to, _value);
    _data;
    // if (isContract(_to)) {
    //   contractFallback(_to, _value, _data);
    // }
    return true;
  }

  function isContract(address _addr) private view returns (bool hasCode) {
    uint256 length;
    assembly {
      length := extcodesize(_addr)
    }
    return length > 0;
  }

  function contractFallback(address _to, uint256 _value, bytes calldata _data) private {
    ERC677ReceiverInterface receiver = ERC677ReceiverInterface(_to);
    receiver.onTokenTransfer(msg.sender, _value, _data);
  }


  function approve(address _spender, uint256 _amount) external returns(bool success) {
     allowances[msg.sender][_spender] = _amount;
    return true;
  }

  function transferFrom(address _from, address _to, uint256 _amount) external returns(bool success) {
    balances[_from] = balances[_from] - _amount;
    balances[_to] = balances[_to] + _amount;
    return true;
  }

}