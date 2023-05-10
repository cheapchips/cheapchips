import { expect } from "chai";
import localDeploy from "./utils/localDeploy";
import { ChipStable, ChipsJackpot, VRFCoordinatorV2Mock } from "../typechain-types";
import { ethers } from "hardhat";
import { time } from "@nomicfoundation/hardhat-network-helpers"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("ChipsJackpot round scenario", () => {
    
    let coordinator:VRFCoordinatorV2Mock
    let jackpot:ChipsJackpot
    let token:ChipStable
    

    describe("Init", () => {
        it("Deploy contracts (token and jackpot) (tokens are sent to user1 & user2)", async() => {
            [coordinator, jackpot, token] = await localDeploy()
        })

        it("Round id should be equal 0", async() => {
            expect(await jackpot.getCurrentRoundId()).to.equal(0)
        })

        it("Users can approve their tokens", async() => {
            const users = await ethers.getSigners()
            const txs = users.map((user) => token.connect(user).approve(jackpot.address, 100))
            await Promise.all(txs)
        })
    })

    describe("Deposits", () => {
        it("User0 can deposit 3 tokens", async() => {
            const [user0] = await ethers.getSigners()
            await jackpot.connect(user0).deposit(3)
        })
    
        it("User0 can't deposit more in this round", async() => {
            const [user0] = await ethers.getSigners()
            await expect(jackpot.connect(user0).deposit(2)).to.be.revertedWith("You have already joined to this round!")
        })
    
        it("User1 can't deposit more that 5 tokens", async() => {
            const [ , user1] = await ethers.getSigners()
            await expect(jackpot.connect(user1).deposit(6)).to.be.revertedWith("Deposit limit reached! Only 5 tokens per round.")
        })
    
        it("User3 (without tokens) can't enter the round", async() => {
            const[,,,user3] = await ethers.getSigners()
            await expect(jackpot.connect(user3).deposit(6)).to.be.revertedWith("Insufficient token balance!")
        })
    
        it("User1 can deposit for 4 tokens and User2 can deposit for 1 token", async() => {
            const [,user1, user2] = await ethers.getSigners()
    
            await jackpot.connect(user1).deposit(4)
            await jackpot.connect(user2).deposit(1)
        })
    })

    describe.skip("Check round data", () => {
        it("Number of players should equal 3", async() => {
            const [numberOfPlayers] = await jackpot.getRoundData(0)
            expect(numberOfPlayers).to.be.eq(3)
        })

        it("Ticket array should be [0,0,0,1,1,1,1,2]", async() => {
            const [, tickets] = await jackpot.getRoundData(0)
            expect(tickets).to.eql([0,0,0,1,1,1,1,2])
        })

        it("Number of tickets should be equal 8 ", async() => {
            const [,,numberOfTickets] = await jackpot.getRoundData(0)
            expect(numberOfTickets).to.eq(8)
        })

        it("End timestamp shouldn't be equal 0", async() => {
            const [,,,endTimestamp] = await jackpot.getRoundData(0)
            expect(endTimestamp).to.not.eq(0)
        })

    })

    describe.skip("Close round", () => {
        it("No user should be able to call closeRound() before endTimestamp", async() => {
            await expect(jackpot.closeRound()).to.be.revertedWith("Round is still active!")
        })

        it("User with id = 0 can't withdraw before random number is added to round", async () => {
            const[user0] = await ethers.getSigners()
            expect(await jackpot.getPlayerIdInRound(0)).to.be.eq(0)
            await expect(jackpot.connect(user0).withdrawPrize(0)).to.be.revertedWith("The winner of that round has not been chosen yet!")
        })

        it("Any user can close the round after endTimestamp; OracleRequestSent event, requestId should be equal 1", async() => {
            await time.increase(15) // increase time by 15 sec
            const[,,,user3] = await ethers.getSigners()
            await expect(jackpot.connect(user3).closeRound()).to.emit(jackpot, "OracleRequestSent").withArgs(1)
        })

        it("Round can't be closed twice", async() => {
            await expect(jackpot.closeRound()).to.be.revertedWith("Round can't be closed twice!")
        })

        it("Perform coordinator actions for requestId = 1; RoundEnded emit should be emited", async() => {
            await expect(coordinator.fulfillRandomWords(1, jackpot.address)).to.emit(jackpot, "RoundEnded")
        })

        it("Current round id should be equal 1", async() => {
            expect(await jackpot.getCurrentRoundId()).to.be.eq(1)
        })

    })

    describe.skip("Withdrawals", () => {

        let winner:SignerWithAddress

        it("Random winner can withdraw funds", async() => {
            const users = await ethers.getSigners()
            const [,tickets,numberOfTickets,,randomNumber] = await jackpot.getRoundData(0)
            const pos = randomNumber.mod(numberOfTickets).toNumber() 

            winner = users[tickets[pos]] // user1
        
            const balanceBefore = await token.balanceOf(winner.address)

            await jackpot.connect(winner).withdrawPrize(0)

            const balanceAfter = await token.balanceOf(winner.address)

            expect(balanceAfter.sub(balanceBefore)).eq(numberOfTickets)
            
        })

        it("Winner can't withdraw twice", async() => {
            await expect(jackpot.connect(winner).withdrawPrize(0)).to.be.revertedWith("Prize has been already withdrawed!")
        })


        it("User which is not winner can't withdraw funds", async() => {
            const [,, user2] = await ethers.getSigners()
            await expect(jackpot.connect(user2).withdrawPrize(0)).to.be.revertedWith("You haven't won that round!")

        })

        it("User can't withdraw from round in which they hasn't participated ", async() => {
            const [,,, user3] = await ethers.getSigners()
            await expect(jackpot.connect(user3).withdrawPrize(0)).to.be.revertedWith("You haven't participated in that round!")
        })

        it("User can't withdraw from round which hasn't been started yet", async() => {
            await expect(jackpot.withdrawPrize(1)).to.be.revertedWith("The winner of that round has not been chosen yet!")
        })
    })

    
})