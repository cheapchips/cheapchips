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
    })

    it("Funding subscription", async() => {
        const [user0] = await ethers.getSigners()
        // TODO: linkToken.approve()  
        
        // user0
    })



})