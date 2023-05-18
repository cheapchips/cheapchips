import { expect } from "chai";
import { ethers } from "hardhat";
import { ChipsSupplier, ERC20__factory} from "../typechain-types";
import helpers from "@nomicfoundation/hardhat-network-helpers"

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
            
            // const [user] = await ethers.getSigners()
            const user = await ethers.getImpersonatedSigner("0x742d13F0b2A19C823bdd362b16305e4704b97A38")
            console.log(await user.getBalance())

            // await user.sendTransaction({})

            // console.log(await contract.getPair())
            const tx = await contract.connect(user).swapNative({value: ethers.utils.parseEther("10.0")})
            const receipt = await tx.wait()

            

            
            const token = await ERC20__factory.connect("0xb0897686c545045aFc77CF20eC7A532E3120E0F1", user)
            // const allowance = await token.allowance(contract.address, "0xAA1DC356dc4B18f30C347798FD5379F3D77ABC5b")
            console.log(await token.balanceOf(contract.address))



            // console.log(await token.balanceOf(user.address))

            
            // const [user0] = await ethers.getSigners()

            // const token = ERC20__factory.connect("0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39", user0)
            // const balance = await token.balanceOf(user0.address)

            // expect(balance).to.be.greaterThan(0)
    
        })
    })
})

// after(async() => {
//     await helpers.reset();
// })
