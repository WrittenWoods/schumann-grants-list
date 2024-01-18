import { uniqueOptions } from "./uniqueOptions"

export function generateTallies(results, inputs) {

 
    const options = {  maximumFractionDigits: 2  }   
    const format = Intl.NumberFormat("en-US",options).format


    let resultsNum = results.length
    let granteesNum = uniqueOptions(results.map((x) => x.orgName)).length
    let grantsTotal = results.map((x) => x.amount).reduce(
        (accumulator, currentValue) => {
        return accumulator + currentValue
      },0
    );
 
    return {
        resultsNum: format(resultsNum),
        granteesNum: format(granteesNum),
        grantsTotal: format(grantsTotal)
    }
}




    
  