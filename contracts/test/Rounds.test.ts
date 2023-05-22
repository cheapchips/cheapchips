import { ethers } from "hardhat"
import { time } from "@nomicfoundation/hardhat-network-helpers"
import { ChipStable, ChipsJackpot, KeeperMock, MockLinkToken, VRFCoordinatorV2Mock } from "../typechain-types"
import localDeploy from "./utils/localDeploy"
import { expect } from "chai"
import { BigNumber } from "ethers"


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
            await jackpot.connect(user1).deposit(2)
            await jackpot.connect(user2).deposit(3)
        })
    })

    describe("Close round / End round", () => {
        
        it("Upkeep closes round", async() => {
            await time.increase(30)
            await keeper.upkeep(0)
        })

        it("Random value from coordinator", async() => {
            await coordinator.fulfillRandomWords(1, jackpot.address)
        })
    })

    describe("Withdraw", () => {
        
        it("User2 can withdraw", async() => {
            const [,,user2] = await ethers.getSigners()
            await jackpot.connect(user2).withdrawPrize(0)
        })
    })

    describe("Deposit funds (next round)", () => {
        
        it("Total fee for last round should be greater than 0", async() => {
            expect(await jackpot.getTotalFeeForLastRound()).to.be.greaterThan(0)
        })

        it("User0 deposit", async() => {
            const [user0] = await ethers.getSigners()
            const totalFee = await jackpot.getTotalFeeForLastRound()

            const balanceBefore = await jackpot.balanceFees()
            await jackpot.deposit(3)
            const balanceAfter = await jackpot.balanceFees()
            
            expect(balanceBefore.sub(balanceAfter)).to.be.equal(totalFee.div(3).add(10))            
        })

        it("User1 & User2 deposit", async() => {
            const [,user1, user2] = await ethers.getSigners()
            await jackpot.connect(user1).deposit(3)
            await jackpot.connect(user2).deposit(3)
        })
    })

    describe("Close (next round) / End (next round)", () => {

        let upkeepBalance:BigNumber;
        
        it("Upkeep closes round", async() => {
            await time.increase(30)
            await keeper.upkeep(0)
        })

        it("Random value from coordinator", async() => {
            await coordinator.fulfillRandomWords(2, jackpot.address)
        })

        it("currentRoundId == 2", async() => {
            expect(await jackpot.getCurrentRoundId()).to.be.equal(2)
        })

        it("Check upkeep & vrf balance", async() => {
            console.log((await coordinator.getSubscription(1)).balance)
            console.log((await keeper.getUpkeep(0)).balance)
        })
    })

    describe("Third round (roundId=2)", () => {
        it.skip("Check required fees", async() => {
            console.log(await jackpot.getTotalFeeForLastRound())
        })

        it("Deposits", async() => {
            const [user0, user1, user2] = await ethers.getSigners()

            await jackpot.connect(user0).deposit(3)
            await jackpot.connect(user1).deposit(3)
            await jackpot.connect(user2).deposit(3)
        })

        it("Close / End", async() => {
            await time.increase(30)
            await keeper.upkeep(0)
            await coordinator.fulfillRandomWords(3, jackpot.address)
        })

        it("currentRoundId == 3", async() => {
            expect(await jackpot.getCurrentRoundId()).to.be.equal(3)
        })

        it("Check upkeep & vrf balance", async() => {
            console.log((await coordinator.getSubscription(1)).balance)
            console.log((await keeper.getUpkeep(0)).balance)
        })
    })
})