import React, { useState, useEffect } from 'react';
import './App.css';
import Results from "./Results";
import SearchUI from "./SearchUI";
import Criteria from "./Criteria";
import { starterData } from "../starterData";

function App() {

  // loadedData refers to spreadsheet data fetched from API.
  // userInputs refers to search criteria added by user via UI.

  const [loadedData, setLoadedData] = useState(starterData.loadedData)
  const [userInputs, setUserInputs] = useState(starterData.userInputs)

  useEffect(() => {
    console.log(userInputs)
  }, [userInputs] )

  // The SearchUI component represents user interaction with the interface.
  // The Criteria component represents user inputs displayed back to the user.
  // The Results component uses userInputs to filter and display loadedData.

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <SearchUI
        userInputs={userInputs}
        setUserInputs={setUserInputs}
        loadedData={loadedData}
      />
      <Criteria userInputs={userInputs} />
      <Results 
        loadedData={loadedData}
        userInputs={userInputs}
      />
    </div>
  );
}

export default App;
