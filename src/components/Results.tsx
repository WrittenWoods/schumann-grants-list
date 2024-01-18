/* 

-The component in which the search results are all displayed.
-Will display a collection of individual Result components.
-Will initially display the entire list of grants as a scrollable list, barring performance issues.
-Will inherit criteria from the Criteria component and use to refine list.

*/

import React, { useState, useEffect } from 'react';
import Result from './Result';
import { generateTallies } from '../helpers/generateTallies';

function Results( { loadedData, userInputs, filteredResults, setFilteredResults } ) {

  const [pagination, setPagination] = useState([0, 10, filteredResults.length])
  const [displayed, setDisplayed] = useState(filteredResults.slice(pagination[0], pagination[1]))

  // The functions below are named according to which properties of the userInputs object they identify.
  // If the function returns true at an index of loadedData, the result at that index is displayed.

  useEffect(() => {
    setFilteredResults(filterGrants(loadedData, userInputs))
  }, [userInputs] )

  useEffect(() => {
    setDisplayed(filteredResults.slice(pagination[0], pagination[1]))
  }, [pagination] )

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

    if (minVal.trim() === "" && maxVal.trim() === "") { return true }
    if (Number(minVal) || minVal === "0") { aboveMin = (amount >= Number(minVal)) }
    if (Number(maxVal) || maxVal === "0") { belowMax = (amount <= Number(maxVal)) }
      
    if (minVal.trim() === "" || maxVal.trim() === "") {
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

    if (inputs.orgStates.length === 0 && inputs.orgCities.length === 0) {
      return true
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

    if (queries.length === 0) { return true }

    for (let i = 0; i < queries.length; i++) {
      if (toMatch.some( (s) => s.toLowerCase().includes(queries[i].toLowerCase()) )) {
        matchedAny = true
      } else {
        matchedAll = false
      }
    }

    return anyTerms ? matchedAny : matchedAll

  }

  function inputMatch(inputArray, arg) {
    if (inputArray === undefined || inputArray.length === 0) { return true }
    return inputArray.includes(arg)
  }

  // Checks a particular grant for correspondence with userInputs.

  function grantMatch(data, inputs) {
    let match = 
      dateMatch(data, inputs)
      && amountMatch(data.amount, inputs.minVal, inputs.maxVal)
      && inputMatch(inputs.orgNames, data.orgName)
      && locationMatch(data, inputs)
      && inputMatch(inputs.grantTypes, data.grantType) // inputs.grantTypes.includes(data.grantType)
      && inputMatch(inputs.fundingTypes, data.fundingType) // inputs.fundingTypes.includes(data.fundingType)
      && inputMatch(inputs.programAreas, data.programArea) // inputs.programAreas.includes(data.programArea)
      && inputMatch(inputs.strategies, data.strategy) // inputs.strategies.includes(data.strategy)
      && inputMatch(inputs.donors, data.donor) // inputs.donors.includes(data.donor)
      && keywordMatch(data, inputs)

    return match
  }

  // Iterates through loadedData array to check for matches with userInputs.

  function filterGrants(data, inputs) {
    let filteredResults = [...data]
    filteredResults = filteredResults.filter((x) => grantMatch(x, inputs))
    return filteredResults
  }

  // handles click of previous button for pagination

  function paginatePrev() {
    let pageStart = pagination[0]
    let pageEnd = pagination[1]
    let pageSize = pageEnd - pageStart
    if (pageStart - pageSize >= 0) {
      pageStart = pageStart - pageSize
      pageEnd = pageEnd - pageSize
      setPagination([pageStart, pageEnd, filteredResults.length])
    }
  }

  // handles click of previous button for pagination

  function paginateNext() {
    let pageStart = pagination[0]
    let pageEnd = pagination[1]
    let pageSize = pageEnd - pageStart
    if (pageStart <= filteredResults.length - pageSize) {
      pageStart = pageStart + pageSize
      pageEnd = pageEnd + pageSize
      setPagination([pageStart, pageEnd, filteredResults.length])
    }
  }

  // Uses the array generated from the filterGrants function to render Result components.

  return (
    <>
{/*      <button onClick={paginatePrev} >previous</button>
      <span> Results {pagination[0]} to {pagination[1]} of {pagination[2]} </span>
      <button onClick={paginateNext} >next</button>
      <table>
      <tbody className="Results">
        {displayed.map( (individualGrant, n) =>
          <Result 
            individualGrant={individualGrant}
            key={n}
          />
        )}
      </tbody>
      </table>*/}



      <nav class="db__results-nav">
        <div class="db__results-sort">
          <h6>Amount</h6>
        </div>
        <div class="db__results-sort">
          <h6>Results</h6>
        </div>
        <div class="db__results-sort">
          <h6>Approval Date</h6>
          <div class="db__svg db__sort-arrow">
            <img class="db__sort-arrow-up" src="../assets/svg/arrow-down.svg"/>
          </div>
        </div>
      </nav>

       {displayed.map( (individualGrant, n) =>
          <Result 
            individualGrant={individualGrant}
            key={n}
          />
        )}


      







      <button onClick={paginatePrev} >previous</button>
      <span> Results {pagination[0]} to {pagination[1]} of {pagination[2]} </span>
      <button onClick={paginateNext} >next</button>





    </>
  );
}

export default Results;
