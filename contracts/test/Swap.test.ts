import { expect } from "chai";
import { ethers } from "hardhat";
import { ChipsSupplier, ERC20__factory} from "../typechain-types";

describe("Swap test", () => {

    let contract:ChipsSupplier

    describe("Init", () => {
        it("Swap contract deployment", async() => {
            const ChipsSupplier = await ethers.getContractFactory("ChipsSupplier")
            contract = await ChipsSupplier.deploy()
        })
    })


    describe("Actions", () => {
        it("Swap native to LINK", async() => {
            
            const [user] = await ethers.getSigners()
            console.log(await user.getBalance())

            console.log(await contract.getWETHAddress())
            // await contract.connect(user).swapNative({value: ethers.utils.parseEther("2")})

            
            // const [user0] = await ethers.getSigners()

            // const token = ERC20__factory.connect("0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39", user0)
            // const balance = await token.balanceOf(user0.address)

            // expect(balance).to.be.greaterThan(0)
    
        })
    })
})