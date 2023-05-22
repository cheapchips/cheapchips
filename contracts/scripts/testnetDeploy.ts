import { ethers } from "hardhat";
import { LinkTokenInterface__factory, VRFCoordinatorV2Interface__factory } from "../typechain-types";


async function deploy(){

    const user = await ethers.getImpersonatedSigner("0xaDc35b0F0Eb14709cBCF28086C505EA976BF8c99")

    const ONE_ETHER = ethers.utils.parseEther("1.0")
    /**
     * Values for Mumbai Testnet
     */
    const LINK_TOKEN_ADDRESS = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB"
    const VRF_COORDINATOR_ADDRESS = "0x7a1bac17ccc5b313516c5e16fb24f7659aa5ebed"
    const KEYHASH = "0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f"
    const UPKEEP_REGISTRY_ADDRESS = "0xE16Df59B887e3Caa439E0b29B42bA2e7976FD8b2"
    const UPKEEP_REGISTRAR_ADDRESS = "0x57A4a13b35d25EE78e084168aBaC5ad360252467"


    const ChipStable = await ethers.getContractFactory("ChipStable")
    const ChipsJackpot = await ethers.getContractFactory("ChipsJackpot")

    const token = await ChipStable.deploy()


    const linkToken = await LinkTokenInterface__factory.connect(LINK_TOKEN_ADDRESS, user)
    const coordinator = await VRFCoordinatorV2Interface__factory.connect(VRF_COORDINATOR_ADDRESS, user)
    
    const VRFSubscriptionCreator = await ethers.getContractFactory("VRFSubscriptionCreator")
    const vrfCreator = await VRFSubscriptionCreator.deploy(coordinator.address, linkToken.address)

    vrfCreator.createNewSubscription()
    const subId = await vrfCreator.subId()
    console.log("VRFSubId:", subId.toString())

    await linkToken.transfer(vrfCreator.address, ONE_ETHER.div(5))
    await vrfCreator.topUpSubscription(ONE_ETHER.div(5))

    const jackpot = await ChipsJackpot.deploy(token.address, coordinator.address, subId, UPKEEP_REGISTRY_ADDRESS, linkToken.address, KEYHASH)

    const UpkeepCreator = await ethers.getContractFactory("UpkeepCreator")
    const upkeepCreator = await UpkeepCreator.deploy(UPKEEP_REGISTRAR_ADDRESS, LINK_TOKEN_ADDRESS)

    await linkToken.transfer(upkeepCreator.address, ONE_ETHER.div(5))
    

    await upkeepCreator.register({
        name: "cheapchips", 
        encryptedEmail: "0x", 
        upkeepContract: 
        jackpot.address, 
        gasLimit: 500000, 
        adminAddress: user.address, 
        checkData: "0x", 
        offchainConfig: "0x", 
        amount: ONE_ETHER.div(5)})

    const upkeepId = await upkeepCreator.upkeepId()
    console.log("UpkeepId:", upkeepId.toString())
    
    jackpot.setUpkeepId(upkeepId)

}

deploy()