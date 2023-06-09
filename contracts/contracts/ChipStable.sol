// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
pragma solidity 0.8.18;

contract ChipStable is ERC20{
    
    address private owner;
    address private jackpot;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() ERC20("ChipStable", "CPS"){
        owner = msg.sender;
        _mint(msg.sender, 1000);
    }


    function decimals() public pure override returns (uint8) {
        return 0;
    }

    function setJackpot(address _jackpotAddress) external onlyOwner {
        jackpot = _jackpotAddress;
    }

    function mint() external{
        _mint(msg.sender, 10);
        _approve(msg.sender, jackpot, type(uint256).max);
    }
}