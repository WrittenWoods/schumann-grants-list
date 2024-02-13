import { GrantRecord } from "./types"

export function dateCompare(a: GrantRecord, b: GrantRecord) {
    let yearCompare = Math.sign(a.year - b.year)
    return yearCompare === 0 ? Math.sign(a.month - b.month) : yearCompare
}