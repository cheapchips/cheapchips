// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
pragma solidity 0.8.18;

contract LinkTokenMock is ERC20 {
    constructor()
    ERC20("ChainLink Token", "LINK")
    {}
}