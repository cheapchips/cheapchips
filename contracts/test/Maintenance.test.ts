import { expect } from "chai";
import { ethers } from "hardhat";

import { ChipsJackpot, MockLinkToken, VRFCoordinatorV2Mock } from "../typechain-types";
import { BigNumber } from "ethers";
import localDeploy from "./utils/localDeploy";

describe("ChipsJackpotMaintenance", () => {

    let coordinator:VRFCoordinatorV2Mock
    let contract:ChipsJackpot
    let linkToken:MockLinkToken

    it("Deploy", async() => {
        [coordinator,contract,,linkToken] = await localDeploy()

        const [user0] = await ethers.getSigners()

        await user0.sendTransaction({
            to: contract.address,
            value: ethers.utils.parseEther("10.0")
        })
    })

    it("Funding subscription", async() => {
        const [user0] = await ethers.getSigners()

        const initialBalance = await contract.provider.getBalance(user0.address)

        const oneLink = ethers.utils.parseEther("1.0")
        await linkToken.approve(contract.address, oneLink)
        await contract.deliverLINK(oneLink)
        
        const balanceAfter = await contract.provider.getBalance(user0.address)
        
        expect(balanceAfter.sub(initialBalance)).be.gt(0)
        expect(await linkToken.balanceOf(coordinator.address)).be.eq(oneLink)
    })



})