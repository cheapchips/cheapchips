import { expect } from "chai";
import { ethers } from "hardhat";
import { LinkStation, ERC20__factory} from "../typechain-types";

describe("Swap test", () => {

    let contract:LinkStation

    describe("Init", () => {
        it("Swap contract deployment", async() => {
            const LinkStation = await ethers.getContractFactory("LinkStation")
            contract = await LinkStation.deploy()
        })
    })


    describe("Actions", () => {
        it("Swap native to LINK (ERC677)", async() => {
            
            const user = await ethers.getImpersonatedSigner("0x742d13F0b2A19C823bdd362b16305e4704b97A38")

            const tx = await contract.connect(user).swapNative({value: ethers.utils.parseEther("10.0")})
            await tx.wait()

            const token = await ERC20__factory.connect("0xb0897686c545045aFc77CF20eC7A532E3120E0F1", user)
            expect(await token.balanceOf(user.address)).to.be.greaterThan(0)
    
        })
    })
})
