import { BigNumber } from "ethers"

type CoinGeckoId = "matic-network" | "chainlink"
type Currency = "usd"
type Price = Record<Currency, number>
type CoinGeckoApiReponse = Record<CoinGeckoId, Price>

export default async function getPrice(){
    const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=matic-network%2Cchainlink&vs_currencies=usd")
    const json = await res.json() as CoinGeckoApiReponse
    const maticPriceUSD = json["matic-network"].usd
    const linkPriceUSD = json["chainlink"].usd

    const linkPriceMATIC = Number(`${linkPriceUSD/maticPriceUSD}`.slice(0, 5)) * 1000


    return BigNumber.from(10).pow(15).mul(linkPriceMATIC)

}