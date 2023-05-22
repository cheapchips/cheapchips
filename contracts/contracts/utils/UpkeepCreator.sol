// SPDX-License-Identifier: MIT
import "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";


pragma solidity 0.8.18;

struct RegistrationParams {
    string name;
    bytes encryptedEmail;
    address upkeepContract;
    uint32 gasLimit;
    address adminAddress;
    bytes checkData;
    bytes offchainConfig;
    uint96 amount;
}

interface KeeperRegistrarInterface {
    function registerUpkeep(
        RegistrationParams calldata requestParams
    ) external returns (uint256);
}


contract UpkeepCreator{

    KeeperRegistrarInterface Registrar;
    LinkTokenInterface LinkToken;


    uint256 public upkeepId;

    constructor(address _registrarAddress, address _linkTokenAddress){
        Registrar = KeeperRegistrarInterface(_registrarAddress);
        LinkToken = LinkTokenInterface(_linkTokenAddress);
    }

    function register(RegistrationParams memory params) external {
        LinkToken.approve(address(Registrar), params.amount);
        upkeepId = Registrar.registerUpkeep(params);
    }


}