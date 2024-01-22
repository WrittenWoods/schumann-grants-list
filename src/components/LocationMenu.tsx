import React, { useState, useEffect } from 'react';

function LocationMenu({ userInputs, cityOptions, stateOptions, setOrgStates, setOrgCities }) {

  const [openStates, setOpenStates] = useState(false)
  const [openCities, setOpenCities] = useState(false)
  const [selectedStates, setSelectedStates] = useState([...userInputs.orgStates])
  const [selectedCities, setSelectedCities] = useState([...userInputs.orgCities])
  const [stateSearch, setStateSearch] = useState("")
  const [citySearch, setCitySearch] = useState("")

  useEffect(() => {
    setOrgStates([...selectedStates])
  }, [selectedStates])

  useEffect(() => {
    setOrgCities([...selectedCities])
  }, [selectedCities])

  function handleCheck(arg, stateArray, setMethod) {
    if (stateArray.includes(arg)) {
      let index = stateArray.indexOf(arg)
      let newResults = [...stateArray]
      newResults.splice(index, 1)
      setMethod(newResults)
    } else {
      setMethod([...stateArray, arg])
    }
  }

  function stateList() {

    if (openStates) {
      let filteredStates = stateOptions
      if (stateSearch) { 
        filteredStates = stateOptions.filter(
          function (str) { return str.toLowerCase().includes(stateSearch.toLowerCase()) } 
        ) 
      }
      return (
        filteredStates.map( (x, y) => 
          <li key={y} >
            <input 
              type="checkbox" 
              checked={selectedStates.includes(x)}
              onChange={e => handleCheck(x, selectedStates, setSelectedStates)}
            >  
            </input>
            <span>{x}</span>
          </li> 
        )
      )
    } else {
      <></>
    }
  }

  function cityList() {

    if (openCities) {
      let filteredCities = cityOptions
      if (citySearch) { 
        filteredCities = cityOptions.filter(
          function (str) { return str.toLowerCase().includes(citySearch.toLowerCase()) } 
        ) 
      }
      return (
        filteredCities.map( (x, y) => 
          <li key={y} >
            <input 
              type="checkbox" 
              checked={selectedCities.includes(x)}
              onChange={e => handleCheck(x, selectedCities, setSelectedCities)}
            >  
            </input>
            <span>{x}</span>
          </li> 
        )
      )
    } else {
      <></>
    }
  }

  return (
    <div className="db__LocationMenu">
      <div className="db__search-field-head">
      <h6>City/State</h6>
      </div>
      <h6>State</h6>
      <input value={stateSearch} onChange={(e) => setStateSearch(e.target.value)} />
      <button onClick={e => setOpenStates(!openStates)}>{ openStates ? "+" : "-" }</button>
      <ul className="CheckDrop">{stateList()}</ul>
      <h6>City</h6>
      <input value={citySearch} onChange={(e) => setCitySearch(e.target.value)} />
      <button onClick={e => setOpenCities(!openCities)}>{ openCities ? "+" : "-" }</button>
      <ul className="CheckDrop">{cityList()}</ul>
    </div>
  );
}

export default LocationMenu;
