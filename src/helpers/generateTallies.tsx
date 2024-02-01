import { uniqueOptions } from "./uniqueOptions"

export function generateTallies(results, inputs) {
  
    const options = {  maximumFractionDigits: 2  }   
    const numformat = (value:number, decimals:number) => Intl.NumberFormat("en-US", { maximumFractionDigits: decimals } ).format(value)

    let resultsNum = results.length
    let granteesNum = uniqueOptions(results.map((x) => x.orgName)).length
    let grantsTotal = results.map((x) => x.amount).reduce(
        (accumulator, currentValue) => {
        return accumulator + currentValue
      },0
    );

    return {
        resultsNum: numformat(resultsNum, 2),
        granteesNum: numformat(granteesNum, 2),
        grantsTotal: grantsTotal >= 1000000 ? `${numformat(grantsTotal/1000000, 3)} M` : numformat(Math.round(grantsTotal), 2)
    }
}