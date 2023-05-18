// SPDX-License-Identifier: MIT

import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import "./PegSwapInterface.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

pragma solidity 0.8.18;

contract ChipsSupplier{

    /**
     * @dev TOKEN ADDRESSES IN THE POLYGON MAINNET
     */
    address private immutable LINK_ERC677_ADDRESS = 0xb0897686c545045aFc77CF20eC7A532E3120E0F1;
    address private immutable LINK_ERC20_ADDRESS = 0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39;
    address private immutable WETH_ADDRESS = 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270; // WRAPPED MATIC
    address private immutable ROUTER_ADDRESS = 0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506; // SushiSwapRouter
    address private immutable FACTORY_ADDRESS = 0xc35DADB65012eC5796536bD9864eD8773aBc74C4; // SushiSwapFactory
    address private immutable PEG_SWAP_ADDRESS = 0xAA1DC356dc4B18f30C347798FD5379F3D77ABC5b; // Chainlink Peg Swap

    IUniswapV2Router02 private router;
    IUniswapV2Factory private factory;

    event Wow(uint256 amount);

    constructor(){
        router = IUniswapV2Router02(ROUTER_ADDRESS);
        factory = IUniswapV2Factory(FACTORY_ADDRESS);
    }

    function getPair() external view returns(address) {
        address pair = factory.getPair(WETH_ADDRESS, LINK_ERC20_ADDRESS);
        return pair;
    }

    function swapNative() external payable {
        address[] memory path = new address[](2);
        path[0] = WETH_ADDRESS;
        path[1] = LINK_ERC20_ADDRESS;

        router.swapExactETHForTokens{value: msg.value}(0, path, address(this), block.timestamp + 10 minutes);


        IERC20(LINK_ERC20_ADDRESS).approve(PEG_SWAP_ADDRESS, 1 ether);

        PegSwapInterface(PEG_SWAP_ADDRESS).swap(1 ether, LINK_ERC20_ADDRESS, LINK_ERC677_ADDRESS);

    }

    receive() external payable{}
}