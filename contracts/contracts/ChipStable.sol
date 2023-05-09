// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
pragma solidity 0.8.18;

contract ChipStable is ERC20{
    constructor() ERC20("ChipStable", "CPS"){
        _mint(msg.sender, 1000);
    }

    function decimals() public pure override returns (uint8) {
        return 0;
    }
}