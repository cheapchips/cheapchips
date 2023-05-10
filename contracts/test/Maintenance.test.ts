import { expect } from "chai";
import { ethers } from "hardhat";
import { ChipsJackpot, VRFCoordinatorV2Mock } from "../typechain-types";
import { BigNumber } from "ethers";
import localDeploy from "./utils/localDeploy";

describe("ChipsJackpotMaintenance", () => {

    let coordinator:VRFCoordinatorV2Mock
    let contract:ChipsJackpot

    it("Deploy", async() => {
        [coordinator,contract] = await localDeploy()
    })

    it("Check coordinator config", async() => {
        console.log(await coordinator.getFeeConfig())
    })

    it("Total request cost should be equal 0.15 * 10^18 (gas) + 7.42 * 0.1 * 10^18 (link)", async() => {
        const expectedGasCost = BigNumber.from(10).pow(16).mul(15)
        const expectedLinkCost = BigNumber.from(10).pow(15).mul(742)
        expect(await contract.calculateTotalRequestCost()).to.be.eq(expectedGasCost.add(expectedLinkCost))
    })

})