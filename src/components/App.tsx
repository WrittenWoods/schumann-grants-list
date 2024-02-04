import React, { useState, useEffect } from 'react';
import './App.css';
import Results from "./Results";
import SearchUI from "./SearchUI";
import Criteria from "./Criteria";
import { starterData } from "../starterData";
import { generateTallies } from '../helpers/generateTallies';
import { SearchFields, SortableColumns } from '../helpers/enums';
import { uniqueOptions } from '../helpers/uniqueOptions';
import SearchField from './SearchField';
import { fetchData, gapiLoaded} from '../helpers/fetchData';
import { Column, GrantRecord, Inputs, ProcessedData, Tallies } from '../helpers/types';


function App() {
 
   // sheetData refers to spreadsheet data loaded via Google Sheets API
  const [sheetData, setSheetData] = useState<Array<GrantRecord>>()
  // processedData is the sheet data, post-processed to precalculate the uniqueOptions lists
  const [processedData, setProcessedData] = useState<ProcessedData>()
  // initial inputs loaded from starterData
  const [ starterInputs, setStarterInputs ] = useState<Inputs>()
  
  const [userInputs, setUserInputs] = useState<Inputs>()
  const [filteredResults, setFilteredResults] = useState<Array<GrantRecord>>()
  const [tallies, setTallies] = useState<Tallies>()
  
  const [ sortedColumn, setSortedColumn ] = useState<Column>({column: SortableColumns.ApprovalDate, reversed:true})
  const [ sortAttributes, setSortAttributes ] = useState<Array<Column>>([
    {column: SortableColumns.ApprovalDate, reversed: true},
    {column: SortableColumns.Result, reversed: false},
    {column: SortableColumns.Amount, reversed: true}
  ]);

  const [ initMinValue, setInitMinValue ] = useState<string>()
  const [ initMaxValue, setInitMaxValue ] = useState<string>()

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
    let newSortAttributes = sortAttributes.slice()
    newSortAttributes = newSortAttributes.filter((col) => col.column !== sortedColumn.column)
    newSortAttributes.splice(0, 0, sortedColumn)
    setSortAttributes(newSortAttributes)
  }, [sortedColumn])

  useEffect(() => {
    filteredResults && setFilteredResults(sortResults(filteredResults.slice()))
  }, [ sortAttributes ])

  useEffect(() => {
    filteredResults && setTallies(generateTallies(filteredResults))
  }, [filteredResults] )

  useEffect(() => {
    if ( processedData ) {
      userInputs && setFilteredResults(sortResults(filterGrants(processedData.data, userInputs)))
      generateTallies(processedData.data)
    }
  }, [processedData, userInputs] )

  function compareValue(val1:any, val2:any, reversed:boolean) {
    return val1 < val2 ? (reversed ? 1 : -1) : val1 > val2 ? ( reversed ? -1 : 1 ) : 0
  }

  function sortResults(results:Array<any>) {
    let newResults = results
    // for (let i = 0; i < sortFunctions.length; i++) { newResults = newResults.sort(sortFunctions[i]) }
    newResults.sort((a:any, b:any) => {
      let sortResults = sortAttributes.map((col:Column) => {
        switch (col.column) {
          case SortableColumns.Amount:
            return compareValue(a.amount, b.amount, col.reversed)
          case SortableColumns.ApprovalDate:
            return compareValue(`${a.year}${`${a.month}`.padStart(2, '0')}`, `${b.year}${`${b.month}`.padStart(2, '0')}`, col.reversed)
          case SortableColumns.Result:
            return compareValue(a.orgName, b.orgName, col.reversed)
        }
      })

      return sortResults.reduce((accum, current) => accum == 0 ? current : accum, 0)
    })
    return newResults
  }
 
  // The SearchUI component represents user interaction with the interface.
  // The Criteria component represents user inputs displayed back to the user.
  // The Results component uses userInputs to filter and display loadedData.

  function dateMatch(data:GrantRecord, inputDates:Inputs) {
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

  function amountMatch(amount:number, minVal:string, maxVal:string) {
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

  function locationMatch(data:GrantRecord, inputs:Inputs) {
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

  function keywordMatch(data:GrantRecord, inputs:Inputs) {
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

  function inputMatch(inputArray:Array<any>, arg:string) {
    if (inputArray === undefined || inputArray.length === 0) { return true }
    return inputArray.includes(arg.trim())
  }

  // Checks a particular grant for correspondence with userInputs.

  function grantMatch(data:GrantRecord, inputs:Inputs) {
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

  function filterGrants(data:Array<GrantRecord>, inputs:Inputs) {
    let filteredResults = [...data]
    filteredResults = filteredResults.filter((x) => grantMatch(x, inputs))
    return filteredResults
  }

  function generateStarterInputs(loadedData:Array<GrantRecord>, userInputs:Inputs) {
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
            {
              processedData && userInputs && starterInputs && 
              <SearchField userInputs={userInputs} loadedData={processedData} fieldType={SearchFields.ApprovalDate} defaults={{...starterInputs}} setUserInputs={setUserInputs} />
            }
          </div>
          { 
            userInputs && userInputs && starterInputs && 
            <Criteria userInputs={userInputs} setUserInputs={setUserInputs} defaults={{...starterInputs}}/> 
          }
        </div>
      </div>

      <div className="db__results_queries">
        <div className="db__results_queries_inner">
          
          { filteredResults && userInputs ? 
            <div className="db__results">
              <Results 
                sortedColumn={sortedColumn}
                setSortedColumn={setSortedColumn}
                filteredResults={filteredResults}
              />
            </div>
            :
            <div className="db__results">
              <div className="db__results-waiting">Loading data...</div>
            </div>
          }

          { processedData && userInputs && starterInputs && 
            <div className="db__queries">
              <h3>Refine Search</h3>
              <SearchUI
                userInputs={userInputs}
                setUserInputs={setUserInputs}
                loadedData={processedData}
                defaults={starterInputs}
              />
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;