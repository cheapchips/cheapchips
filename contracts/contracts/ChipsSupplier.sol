// SPDX-License-Identifier: MIT

import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

pragma solidity 0.8.18;

contract ChipsSupplier{

    /**
     * @dev TOKEN ADDRESSES IN THE POLYGON MAINNET
     */
    address private immutable LINK_ADDRESS = 0xb0897686c545045aFc77CF20eC7A532E3120E0F1;
    address private immutable WETH_ADDRESS = 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270; // WRAPPED MATIC
    address private immutable ROUTER_ADDRESS = 0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506; // SushiSwapRouter

    IUniswapV2Router02 private router;

    constructor(){
        router = IUniswapV2Router02(ROUTER_ADDRESS);
    }

    function getWETHAddress() external view returns(address){
        address weth = router.WETH(); 
        return weth;
    }

    function swapNative() external payable {
        address[] memory path = new address[](2);
        path[0] = WETH_ADDRESS;
        path[1] = LINK_ADDRESS;

        router.swapExactETHForTokensSupportingFeeOnTransferTokens(0, path, msg.sender, block.timestamp + 10000000);
    }

    receive() external payable{}
}