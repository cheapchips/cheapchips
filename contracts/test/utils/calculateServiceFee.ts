import { BigNumber } from "ethers"

export default function calculateServiceFee(){
    const expectedGasCost = BigNumber.from(10).pow(16).mul(15)
    const expectedLinkCost = BigNumber.from(10).pow(15).mul(742)
    return expectedGasCost.add(expectedLinkCost).div(5)
}