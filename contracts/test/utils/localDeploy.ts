import { ethers } from "hardhat"
import { ChipStable, ChipsJackpot, VRFCoordinatorV2Mock, MockLinkToken, KeeperMock } from "../../typechain-types"
import { BigNumber } from "ethers";
import getPrice from "./getPrice";
export default async function localDeploy():Promise<[VRFCoordinatorV2Mock, ChipsJackpot, ChipStable, MockLinkToken, KeeperMock]>{

    // MockLinkToken
    const MockLinkToken = await ethers.getContractFactory("MockLinkToken")

    // VFRCoordinatorV2Mock
    const Coordinator = await ethers.getContractFactory("VRFCoordinatorV2Mock")


    const ChipStable = await ethers.getContractFactory("ChipStable")
    const ChipsJackpot = await ethers.getContractFactory("ChipsJackpot")

    /**
     * Deploying Mock Coordinator
     * base fee (link premium)
     * gas price (in link)
     * - using recomended settings for local env
     */
    const BASE_FEE=100000000000000000n // 10^(18)
    const GASPRICELINK=1000000000n // 10^(9)

    const coordinator = await Coordinator.deploy(BASE_FEE, GASPRICELINK)

    // creating subscription
    await coordinator.createSubscription()

    // subId = 1
    // funding subscription -> (funds for around 9 requests)
    await coordinator.fundSubscription(1, 1000000000000000000n) // 10^(19)


    /**
     * Deploying Mock Link Token
     */
    const mockLinkToken = await MockLinkToken.deploy()

 
    /**
     * Deploying Mock Keeper
     */
    const KeeperMock = await ethers.getContractFactory("KeeperMock")
    const keeper = await KeeperMock.deploy(mockLinkToken.address)


     /**
     * Deploying ChipStable
     */
    const token = await ChipStable.deploy()

    // Send tokens to others
    const [addr0, addr1, addr2] = (await ethers.getSigners()).map((signer) => signer.address)
    await token.transfer(addr1, 300)
    await token.transfer(addr2, 300)

    await mockLinkToken.transfer(addr1, ethers.utils.parseEther("10.0"))
    await mockLinkToken.transfer(addr2, ethers.utils.parseEther("10.0"))


    /**
     * Deploying ChipsJackpot contract (consumer)
     */
    const jackpot = await ChipsJackpot.deploy(token.address, coordinator.address, 1, keeper.address, mockLinkToken.address)
    // test keyhash - 0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc


    /**
     * Register upkeep
     */
    await keeper.register(jackpot.address)
    await mockLinkToken.approve(keeper.address, ethers.utils.parseEther("10.0"))
    await keeper.addFunds(0, ethers.utils.parseEther("10.0"))

    /**
     * Add consumer 
     */
    await coordinator.addConsumer(1, jackpot.address)

    return [coordinator, jackpot, token, mockLinkToken, keeper]

}