import React, { useState, useEffect } from 'react';
import './App.css';
import Results from "./Results";
import SearchUI from "./SearchUI";
import Criteria from "./Criteria";
import { starterData } from "../starterData";
import { generateTallies } from '../helpers/generateTallies';
import { dateCompare } from '../helpers/dateCompare';

function App() {

  // loadedData refers to spreadsheet data fetched from API.
  // userInputs refers to search criteria added by user via UI.

  const [loadedData, setLoadedData] = useState(starterData.loadedData)
  const starterInputs = generateStarterInputs(loadedData, starterData.userInputs)

  const [userInputs, setUserInputs] = useState(starterInputs)
  const [filteredResults, setFilteredResults] = useState(starterData.loadedData.sort(dateCompare).reverse())
  const [tallies, setTallies] = useState(generateTallies(loadedData, userInputs))

  const [ initMinValue, setInitMinValue ] = useState<string>(starterInputs.minVal)
  const [ initMaxValue, setInitMaxValue ] = useState<string>(starterInputs.maxVal)

  useEffect(() => {
  }, [loadedData])

  const MONTHS = ["January", "February", "March",  "April", "May", "June",  "July", "August", "September", "October", "November", "December"]
  useEffect(() => {
    setTallies(generateTallies(filteredResults, userInputs))
  }, [filteredResults] )
 
  // The SearchUI component represents user interaction with the interface.
  // The Criteria component represents user inputs displayed back to the user.
  // The Results component uses userInputs to filter and display loadedData.

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
            <h3><span class="highlight">{tallies.resultsNum}</span> results for <span class="highlight">{tallies.granteesNum}</span> grantees totaling <br/><span class="highlight font-large">${tallies.grantsTotal}</span></h3>
            <p>{MONTHS[Math.min(Math.max(0, userInputs.minMonth - 1), 11)]} {userInputs.minYear} - {MONTHS[Math.min(Math.max(1, userInputs.maxMonth - 0), 11)]} {userInputs.maxYear}</p>
          </div>
          <Criteria userInputs={userInputs} setUserInputs={setUserInputs} defaults={{minVal: initMinValue, maxVal: initMaxValue}}/>
        </div>
      </div>

      <div className="db__results_queries">
        <div className="db__results_queries_inner">
          <div className="db__results">
            <Results 
              loadedData={loadedData}
              userInputs={userInputs}
              filteredResults={filteredResults}
              setFilteredResults={setFilteredResults}
              tallies={tallies}
            />
          </div>

          <div className="db__queries">
            <h3>Refine Search</h3>
            <SearchUI
              userInputs={userInputs}
              setUserInputs={setUserInputs}
              loadedData={loadedData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;