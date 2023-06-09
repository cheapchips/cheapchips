import { expect } from "chai";
import { ChipStable } from "../typechain-types";
import { ethers } from "hardhat";

describe("Token test", () => {

    let token:ChipStable

    it("Token deployment", async() => {
        const ChipStable = await ethers.getContractFactory("ChipStable")
        token = await ChipStable.deploy()
    })

    it("Check metadata (name, symbol)", async() => {
        expect(await token.name()).eq("ChipStable")
        expect(await token.symbol()).eq("CPS")
    })

    it("Transfer token from user0 to user1", async() => {
        const [user0, user1] = await ethers.getSigners()
        await token.connect(user0).transfer(user1.address, 100)
        expect(await token.balanceOf(user1.address)).eq(100)
    })

    it("User 0 approves user1 to spend 100 of his tokens", async() => {
        const [user0, user1, user2] = await ethers.getSigners()
        await token.connect(user0).approve(user1.address, 100)
        await token.connect(user1).transferFrom(user0.address, user2.address, 100)
        expect(await token.balanceOf(user2.address)).eq(100)
        expect(await token.balanceOf(user0.address)).eq(800)
        expect(await token.balanceOf(user1.address)).eq(100)
    })
})