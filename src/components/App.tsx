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
  const [userInputs, setUserInputs] = useState(starterData.userInputs)
  const [filteredResults, setFilteredResults] = useState(starterData.loadedData.sort(dateCompare).reverse())
  const [tallies, setTallies] = useState(generateTallies(loadedData, userInputs))

  useEffect(() => {
    setTallies(generateTallies(filteredResults, userInputs))
  }, [filteredResults] )
 
  // The SearchUI component represents user interaction with the interface.
  // The Criteria component represents user inputs displayed back to the user.
  // The Results component uses userInputs to filter and display loadedData.

  return (
    <div className="App">
      <header className="App-header">
      </header>

      <div className="db__results_summary"> 
        <div className="db__results_summary_inner">
          <div className="db__summary_output">
            <h2>Search database</h2>
            <h3>{tallies.resultsNum} results for {tallies.granteesNum} grantees totaling ${tallies.grantsTotal}</h3>
            <p>{userInputs.minMonth}/{userInputs.minYear} - {userInputs.maxMonth}/{userInputs.maxYear}</p>
          </div>
          <Criteria userInputs={userInputs} />
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
            <h2>Refine Search</h2>
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