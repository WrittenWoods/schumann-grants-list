/* 

-The component in which the search results are all displayed.
-Will display a collection of individual Result components.
-Will initially display the entire list of grants as a scrollable list, barring performance issues.
-Will inherit criteria from the Criteria component and use to refine list.

*/

import React, { useState } from 'react';
import Result from './Result';

function Results( { loadedData, userInputs } ) {

  // The functions below are named according to which properties of the userInputs object they identify.
  // If the function returns true at an index of loadedData, the result at that index is displayed.

  function dateMatch(data, inputDates) {
    let grantYear = data.year
    let grantMonth = data.month

    if (inputDates.minYear === grantYear) {
      if (grantMonth >= inputDates.minMonth) { return true }
    } else if (inputDates.maxYear === grantYear) {
      if (grantMonth <= inputDates.maxMonth) { return true }
    } else if (inputDates.minYear < grantYear && grantYear < inputDates.maxYear) {
      return true
    }

    return false

  }

  function amountMatch(amount, minVal, maxVal) {
    return amount >= minVal && amount <= maxVal
  }

  function locationMatch(data, input) {
    let cityMatch = data.orgCity.toLowerCase() === input.orgCity.toLowerCase()
    let stateMatch = data.orgState.toLowerCase() === input.orgState.toLowerCase()
    
    if (input.orgCity === "") {
      return stateMatch
    } else if (input.orgState === "") {
      return cityMatch
    } else {
      return cityMatch && stateMatch
    }
  }

  function keywordMatch(data, inputs) {
    let anyTerms = inputs.keywords.anyTerms
    let queries = inputs.keywords.searchQueries
    let toMatch = [data.orgName, data.description, data.donor, data.fundingType, data.grantType, data.orgCity, data.programArea, data.strategy]
    let matchedAny = false
    let matchedAll = true

    if (queries.length === 0) { return false }

    for (let i = 0; i < queries.length; i++) {
      if (toMatch.filter( (s) => s.toLowerCase().match(queries[i]).toLowerCase() ).length > 0) {
        matchedAny = true
      } else {
        matchedAll = false
      }
    }

    return anyTerms ? matchedAny : matchedAll

  }

  // Checks a particular grant for correspondence with userInputs.

  function grantMatch(data, inputs) {
    let match = 
      dateMatch(data, inputs.approvalDates)
      || amountMatch(data.amount, inputs.awardAmounts.minVal, inputs.awardAmounts.maxVal) 
      || inputs.orgNames.includes(data.orgName)
      || locationMatch(data, inputs.orgLocation)
      || inputs.grantTypes.includes(data.grantType)
      || inputs.fundingTypes.includes(data.fundingType)
      || inputs.programAreas.includes(data.programArea)
      || inputs.grantTypes.includes(data.grantType)
      || inputs.strategies.includes(data.strategy)
      || inputs.fundDonors.includes(data.fundDonor)
      || keywordMatch(data, inputs)

    return match
  }

  // Iterates through loadedData array to check for matches with userInputs.

  function filterGrants(data, inputs) {
    let filteredResults = []

    for (let i = 0; i < data.length; i++) {

      if (grantMatch(data[i], inputs)) {
        filteredResults.push(data[i])
      }

    }

    return filteredResults

  }

  // Uses the array generated from the filterGrants function to render Result components.

  return (
    <div className="Results">
      {filterGrants(loadedData, userInputs).map( (individualGrant, n) =>
        <Result 
          individualGrant={individualGrant}
          key={n}
        />
      )}
    </div>
  );
}

export default Results;
