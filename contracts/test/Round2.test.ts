import { ethers } from "hardhat"
import { time } from "@nomicfoundation/hardhat-network-helpers"
import { ChipStable, ChipsJackpot, KeeperMock, MockLinkToken, VRFCoordinatorV2Mock } from "../typechain-types"
import localDeploy from "./utils/localDeploy"


describe("ChipsJackpot round scenario", () => {

    let coordinator:VRFCoordinatorV2Mock
    let jackpot:ChipsJackpot
    let token:ChipStable
    let link:MockLinkToken
    let keeper:KeeperMock

    const ONE_ETHER = ethers.utils.parseEther("1.0")

    describe("Init", () => {
        it("Deployment...", async() => {
            [coordinator, jackpot, token, link, keeper] = await localDeploy()
        })
    })

    describe("Deposits", () => {

        it("Fees deposit", async() => {
            const [user0, user1, user2] = await ethers.getSigners()
            
            // approve
            await link.connect(user0).approve(jackpot.address, ONE_ETHER)
            await link.connect(user1).approve(jackpot.address, ONE_ETHER)
            await link.connect(user2).approve(jackpot.address, ONE_ETHER)

            // deposit fees
            await jackpot.connect(user0).depositFees(ONE_ETHER)
            await jackpot.connect(user1).depositFees(ONE_ETHER)            
            await jackpot.connect(user2).depositFees(ONE_ETHER)
        })

        it("Deposit funds", async() => {
            const [user0, user1, user2] = await ethers.getSigners()

            await token.connect(user0).approve(jackpot.address, 10)
            await token.connect(user1).approve(jackpot.address, 10)
            await token.connect(user2).approve(jackpot.address, 10)

            // console.log(await token.balanceOf(user0.address))
            // console.log(await token.balanceOf(user1.address))
            // console.log(await token.balanceOf(user2.address))

            await jackpot.connect(user0).deposit(1)
            // await jackpot.connect(user1).deposit(2)
            // await jackpot.connect(user2).deposit(3)
        })
    })

    describe.skip("Close round / End round", () => {
        
        it("Upkeep closes round", async() => {
            await time.increase(30)
            await keeper.upkeep(0)

            console.log(await jackpot.getRoundData(0))
        })

        it("Random value from coordinator", async() => {
            await coordinator.fulfillRandomWords(1, jackpot.address)
        })

    })
})