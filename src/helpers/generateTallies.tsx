import { uniqueOptions } from "./uniqueOptions"

export function generateTallies(results, inputs) {
    let resultsNum = results.length
    let granteesNum = uniqueOptions(results.map((x) => x.orgName)).length
    let grantsTotal = results.map((x) => x.amount).reduce(
        (accumulator, currentValue) => {
        return accumulator + currentValue
      },0
    );

    return {
        resultsNum: resultsNum,
        granteesNum: granteesNum,
        grantsTotal: grantsTotal
    }
}