import { ContractFunction } from "ethers"

export type TxStatus = "nonexist" | "created" | "denied" | "submitted" | "done" | "failed"
export type PerformType<T extends ContractFunction> = (...args: Parameters<T>) => Promise<void>
export type TxHash = string | undefined