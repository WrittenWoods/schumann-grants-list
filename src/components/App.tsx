import React, { useState, useEffect } from 'react';
import './App.css';
import Results from "./Results";
import SearchUI from "./SearchUI";
import Criteria from "./Criteria";
import { starterData } from "../starterData";
import { generateTallies } from '../helpers/generateTallies';
import { dateCompare } from '../helpers/dateCompare';
import { SearchFields, SortableColumns } from '../helpers/enums';
import { uniqueOptions } from '../helpers/uniqueOptions';
import SearchField from './SearchField';
import { fetchData, gapiLoaded} from '../helpers/fetchData';

type ProcessedData = {
  data:Array<any>
  uniqueOptions:{[key:string]:Object}
}

function App() {
 
   // sheetData refers to spreadsheet data loaded via Google Sheets API
  const [sheetData, setSheetData] = useState<Array<any>>()
  // processedData is the sheet data, post-processed to precalculate the uniqueOptions lists
  const [processedData, setProcessedData] = useState<ProcessedData>()
  // initial inputs loaded from starterData
  const [ starterInputs, setStarterInputs ] = useState()
  
  const [userInputs, setUserInputs] = useState()
  const [filteredResults, setFilteredResults] = useState()
  const [tallies, setTallies] = useState()
  
  const [ sortedColumn, setSortedColumn ] = useState<{column:string, reversed:boolean}>({column: SortableColumns.ApprovalDate, reversed:true})

  const [ initMinValue, setInitMinValue ] = useState<string>()
  const [ initMaxValue, setInitMaxValue ] = useState<string>()

  const [ sortedAttributes, setSortedAttributes ] = useState<Array<string>>(sortColumnsArray(sortedColumn.column))


   // hook for loading google api for sheets access [not sure if this is a good place to put this]
   useEffect(() => {

     const script = document.createElement('script');

     script.id = 'google-api-script';
     script.src = "https://apis.google.com/js/api.js";
     script.async = true;
     script.addEventListener('load', () => gapiLoaded(async () => {
      setSheetData(await fetchData())
     }));
     document.body.appendChild(script);
     //gapiLoaded();

     return () => {
        document.body.removeChild(script);
      }
  }, []);

   // 
  // userInputs refers to search criteria added by user via UI.
  useEffect(() => {
    if ( starterInputs ) {
      setInitMinValue(starterInputs.minVal)
      setInitMaxValue(starterInputs.maxVal)
    }
  }, [starterInputs])

  useEffect(() => {
    if ( sheetData?.length ) {
      setStarterInputs(generateStarterInputs(sheetData, starterData.userInputs))
      setUserInputs(starterData.userInputs)

      let procData = { data: [...sheetData], uniqueOptions: {
        grantType: uniqueOptions(sheetData.map( (x) => x.grantType )),
        orgCity: uniqueOptions(sheetData.map( (x) => x.orgCity )),
        orgState: uniqueOptions(sheetData.map( (x) => x.orgState )),
        orgName: uniqueOptions(sheetData.map( (x) => x.orgName )),
        fundingType: uniqueOptions(sheetData.map( (x) => x.fundingType )),
        programArea: uniqueOptions(sheetData.map( (x) => x.programArea )).map((pa) => { return { name: pa, finalYear: 1900 }}),
        strategy: uniqueOptions(sheetData.map( (x) => x.strategy ).concat(sheetData.map( (x) => x.strategy2 ))),
        donor: uniqueOptions(sheetData.map( (x) => x.donor ))
      }}

      procData.uniqueOptions.programArea.map((pa) => 
        // Find final year of each program
        pa.finalYear = sheetData.reduce((accum:number, current) => (pa.name == current.programArea ? Math.max(accum, current.year) : accum), 1900)
      )

      setProcessedData(procData);
    }
  }, [sheetData])

  useEffect(() => {
    setSortedAttributes(sortColumnsArray(sortedColumn.column))
  }, [sortedColumn])

  useEffect(() => {
    filteredResults && setFilteredResults(sortResults(filteredResults.slice()))
  }, [ sortedAttributes ])

  useEffect(() => {
    filteredResults && setTallies(generateTallies(filteredResults, userInputs))
  }, [filteredResults] )

  useEffect(() => {
    if ( processedData ) {
      userInputs && setFilteredResults(sortResults(filterGrants(processedData.data, userInputs)))
      generateTallies(processedData.data, userInputs)
    }
  }, [processedData, userInputs] )

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

 
  // The SearchUI component represents user interaction with the interface.
  // The Criteria component represents user inputs displayed back to the user.
  // The Results component uses userInputs to filter and display loadedData.

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
            { tallies && 
              <>
                <h2>Search database</h2>
                <h3>
                  <span className="highlight">{tallies.resultsNum} </span>
                  {tallies.resultsNum === "1" ? 'result' : 'results'} for
                  <br/>
                  <span className="highlight">{tallies.granteesNum} </span>
                  {tallies.granteesNum === "1" ? 'grantee' : 'grantees'} totaling 
                  <br/>
                  <span className="highlight font-large"> ${tallies.grantsTotal}</span>
                </h3>
              </>
            }
            {processedData && userInputs && <SearchField userInputs={userInputs} loadedData={processedData.data} fieldType={SearchFields.ApprovalDate} defaults={{...starterInputs}} setUserInputs={setUserInputs} />}
          </div>
          { userInputs && userInputs && <Criteria userInputs={userInputs} setUserInputs={setUserInputs} defaults={{...starterInputs}}/> }
        </div>
      </div>

      <div className="db__results_queries">
        <div className="db__results_queries_inner">
          
          { filteredResults ? 
            <div className="db__results">
              <Results 
                sortedColumn={sortedColumn}
                setSortedColumn={setSortedColumn}
                userInputs={userInputs}
                filteredResults={filteredResults}
              />
            </div>
            :
            <div className="db__results">
              <div className="db__results-waiting">Loading data...</div>
            </div>
          }

          { processedData && userInputs && 
            <div className="db__queries">
              <h3>Refine Search</h3>
              <SearchUI
                userInputs={userInputs}
                setUserInputs={setUserInputs}
                loadedData={processedData}
                defaults={{minVal: initMinValue, maxVal: initMaxValue}}
              />
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;