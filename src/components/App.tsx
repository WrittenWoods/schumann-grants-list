import React, { useState, useEffect } from 'react';
import './App.css';
import Results from "./Results";
import SearchUI from "./SearchUI";
import Criteria from "./Criteria";
import { starterData } from "../starterData";
import { generateTallies } from '../helpers/generateTallies';

function App() {

  // loadedData refers to spreadsheet data fetched from API.
  // userInputs refers to search criteria added by user via UI.

  const [loadedData, setLoadedData] = useState(starterData.loadedData)
  const [userInputs, setUserInputs] = useState(starterData.userInputs)
  const [filteredResults, setFilteredResults] = useState(starterData.loadedData)
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
      <h3>{tallies.resultsNum} results for {tallies.granteesNum} grantees totaling ${tallies.grantsTotal}</h3>
      <h3>{userInputs.minMonth}/{userInputs.minYear} to {userInputs.maxMonth}/{userInputs.maxYear}</h3>
      <Criteria userInputs={userInputs} />
      <SearchUI
        userInputs={userInputs}
        setUserInputs={setUserInputs}
        loadedData={loadedData}
      />
      <Results 
        loadedData={loadedData}
        userInputs={userInputs}
        filteredResults={filteredResults}
        setFilteredResults={setFilteredResults}
      />
    </div>
  );
}

export default App;
