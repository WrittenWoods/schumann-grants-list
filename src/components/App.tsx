import React, { useState, useEffect } from 'react';
import './App.css';
import Results from "./Results";
import SearchUI from "./SearchUI";
import Criteria from "./Criteria";
import { starterData } from "../starterData";
import { generateTallies } from '../helpers/generateTallies';
import { dateCompare } from '../helpers/dateCompare';
import { SortableColumns } from '../helpers/enums';

function App() {

  // loadedData refers to spreadsheet data fetched from API.
  // userInputs refers to search criteria added by user via UI.

  const [loadedData, setLoadedData] = useState(starterData.loadedData)
  const starterInputs = generateStarterInputs(loadedData, starterData.userInputs)

  const [userInputs, setUserInputs] = useState(starterInputs)
  const [filteredResults, setFilteredResults] = useState(starterData.loadedData.sort(dateCompare).reverse())
  const [tallies, setTallies] = useState(generateTallies(loadedData, userInputs))
  
  const [ sortedColumn, setSortedColumn ] = useState<{column:string, reversed:boolean}>({column: SortableColumns.ApprovalDate, reversed:true})

  const [ initMinValue, setInitMinValue ] = useState<string>(starterInputs.minVal)
  const [ initMaxValue, setInitMaxValue ] = useState<string>(starterInputs.maxVal)

  const [ sortedAttributes, setSortedAttributes ] = useState<Array<string>>(sortColumnsArray(sortedColumn.column))

  function sortColumnsArray(name:string) {
    switch ( name ) {
      case ( SortableColumns.Amount ): return ['amount','orgName','year','month']
      case ( SortableColumns.Result ): return ['orgName','year','month','amount']
      default: return ['year','month','orgName','amount']
    }
  }

  function sortKey(record:any, columns:Array<string>) {
    return columns.map((col) => {
        switch (col) {
        // pad amounts so they sort properly
        case 'amount': return `${record[col]*100}`.padStart(12, '0')
        // pad the month to two characters
        case 'month': return `${record[col]}`.padStart(2, '0')
        // otherwise just return it
        default: return record[col]
        }}
    ).join('');
  }

  function sortResults(results:Array<any>) {
    let newResults = results
    // for (let i = 0; i < sortFunctions.length; i++) { newResults = newResults.sort(sortFunctions[i]) }
    newResults.sort((a:any, b:any) => sortKey(a, sortedAttributes) >= sortKey(b, sortedAttributes) ? 1 : -1)
    if (sortedColumn.reversed) { newResults = newResults.reverse() }
    return newResults
  }

  useEffect(() => {
    setSortedAttributes(sortColumnsArray(sortedColumn.column))
  }, [sortedColumn])

  useEffect(() => {
      setFilteredResults(sortResults(filteredResults.slice()))
  }, [ sortedAttributes ])

  const MONTHS = ["January", "February", "March",  "April", "May", "June",  "July", "August", "September", "October", "November", "December"]

  useEffect(() => {
    setTallies(generateTallies(filteredResults, userInputs))
  }, [filteredResults] )
 
  // The SearchUI component represents user interaction with the interface.
  // The Criteria component represents user inputs displayed back to the user.
  // The Results component uses userInputs to filter and display loadedData.

  useEffect(() => {
    setFilteredResults(sortResults(filterGrants(loadedData, userInputs)))
  }, [userInputs] )

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
    let toMatch = [data.orgName, data.description, data.donor, data.fundingType, data.grantType, data.orgCity, data.programArea, data.strategy, data.strategy2]
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
    return inputArray.includes(arg.trim())
  }

  // Checks a particular grant for correspondence with userInputs.

  function grantMatch(data, inputs) {
    let match = 
      dateMatch(data, inputs)
      && amountMatch(data.amount, inputs.minVal, inputs.maxVal)
      && inputMatch(inputs.orgNames, data.orgName)
      && locationMatch(data, inputs)
      && inputMatch(inputs.grantTypes, data.grantType)
      && inputMatch(inputs.fundingTypes, data.fundingType) 
      && inputMatch(inputs.programAreas, data.programArea) 
      && (inputMatch(inputs.strategies, data.strategy) || (inputMatch(inputs.strategies, data.strategy2)))
      && inputMatch(inputs.donors, data.donor)
      && keywordMatch(data, inputs)

    return match
  }

  // Iterates through loadedData array to check for matches with userInputs.

  function filterGrants(data, inputs) {
    let filteredResults = [...data]
    filteredResults = filteredResults.filter((x) => grantMatch(x, inputs))
    return filteredResults
  }

  function generateStarterInputs(loadedData, userInputs) {
    // console.log(loadedData.map( (x) => x.amount ))
    let starterInputs = { ...userInputs }
    starterInputs.minVal = "0"
    starterInputs.maxVal = Math.max(...loadedData.map( (x) => x.amount )).toString()

    return starterInputs
  }

  return (
    <div className="App">
      <header className="App-header">
      </header>

      <div className="db__results_summary"> 
        <div className="db__results_summary_inner">
          <div className="db__summary_output">
            <h2>Search database</h2>
            <h3><span className="highlight">{tallies.resultsNum}</span> {tallies.resultsNum === "1" ? 'result' : 'results'} for <span className="highlight">{tallies.granteesNum}</span> {tallies.granteesNum === "1" ? 'grantee' : 'grantees'} totaling <br/><span className="highlight font-large">${tallies.grantsTotal}</span></h3>
            <p>{MONTHS[Math.min(Math.max(0, userInputs.minMonth - 1), 11)]} {userInputs.minYear} - {MONTHS[Math.min(Math.max(1, userInputs.maxMonth - 0), 11)]} {userInputs.maxYear}</p>
          </div>
          <Criteria userInputs={userInputs} setUserInputs={setUserInputs} defaults={{...starterInputs}}/>
        </div>
      </div>

      <div className="db__results_queries">
        <div className="db__results_queries_inner">
          <div className="db__results">
            <Results 
              sortedColumn={sortedColumn}
              setSortedColumn={setSortedColumn}
              userInputs={userInputs}
              filteredResults={filteredResults}
            />
          </div>

          <div className="db__queries">
            <h3>Refine Search</h3>
            <SearchUI
              userInputs={userInputs}
              setUserInputs={setUserInputs}
              loadedData={loadedData}
              defaults={{minVal: initMinValue, maxVal: initMaxValue}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;