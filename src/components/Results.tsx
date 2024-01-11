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
    let aboveMin = false, belowMax = false

    if (Number(minVal) || minVal === "0") { aboveMin = (amount >= Number(minVal)) }
    if (Number(maxVal) || maxVal === "0") { belowMax = (amount <= Number(maxVal)) }
      
    if (minVal.length === 0 || maxVal.length === 0) {
      return aboveMin || belowMax
    } else {
      return aboveMin && belowMax
    }
  }

  function locationMatch(data, inputs) {
    let city = data.orgCity
    let state = data.orgState
    let cityMatch = false
    let stateMatch = false

    if (inputs.orgCities.includes(city)) {
      cityMatch = true
    }

    if (inputs.orgStates.includes(state)) {
      stateMatch = true
    }

    if (inputs.orgStates.length === 0 || inputs.orgCities.length === 0) {
      return cityMatch || stateMatch
    } else {
      return cityMatch && stateMatch
    }

  }

  function keywordMatch(data, inputs) {
    let anyTerms = inputs.anyTerms
    let queries = inputs.searchQueries
    let toMatch = [data.orgName, data.description, data.donor, data.fundingType, data.grantType, data.orgCity, data.programArea, data.strategy]
    let matchedAny = false
    let matchedAll = true

    if (queries.length === 0) { return false }

    for (let i = 0; i < queries.length; i++) {
      if (toMatch.some( (s) => s.toLowerCase() === queries[i].toLowerCase() )) {
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
      amountMatch(data.amount, inputs.minVal, inputs.maxVal) 
      || inputs.orgNames.includes(data.orgName)
      || locationMatch(data, inputs)
      || inputs.grantTypes.includes(data.grantType)
      || inputs.fundingTypes.includes(data.fundingType)
      || inputs.programAreas.includes(data.programArea)
      || inputs.grantTypes.includes(data.grantType)
      || inputs.strategies.includes(data.strategy)
      || inputs.donors.includes(data.donor)
      || keywordMatch(data, inputs)

    // if (!dateMatch(data, inputs)) { match = false }

    console.log(match)
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

    if (filteredResults === undefined || filteredResults.length === 0) {
      filteredResults = [...data]
    }

    return filteredResults

  }

  // Uses the array generated from the filterGrants function to render Result components.

  return (
    <table>
    <tbody className="Results">
      {filterGrants(loadedData, userInputs).map( (individualGrant, n) =>
        <Result 
          individualGrant={individualGrant}
          key={n}
        />
      )}
    </tbody>
    </table>
  );
}

export default Results;
