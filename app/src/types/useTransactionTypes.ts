import { ContractFunction } from "ethers"

export type TxStatus = "nonexist" | "created" | "denied" | "submitted" | "done" | "failed"
export type PerformType = <T extends ContractFunction>(transaction: T, ...args: Parameters<T>) => Promise<void>