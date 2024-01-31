import React, { useState, useEffect } from 'react';
import './App.css';

function LocationMenu({ userInputs, cityOptions, stateOptions, setOrgStates, setOrgCities }) {

  const [openCitiesStates, setOpenCitiesStates] = useState(false)
  const [openStates, setOpenStates] = useState(false)
  const [openCities, setOpenCities] = useState(false)
  const [stateSearch, setStateSearch] = useState("")
  const [stateSearchLength, setStateSearchLength] = useState<number>(0)
  const [citySearch, setCitySearch] = useState("")
  const [citySearchLength, setCitySearchLength] = useState<number>(0)

  function handleCheck(arg:string, stateArray:Array<string>, setMethod:Function) {
    if (stateArray.includes(arg)) {
      let index = stateArray.indexOf(arg)
      let newResults = [...stateArray]
      newResults.splice(index, 1)
      setMethod(newResults)
    } else {
      let newResults = [...stateArray, arg]
      setMethod(newResults)
    }
  }

  function stateList() {

    if (openStates) {
      let filteredStates = stateOptions
      if (stateSearch) { 
        filteredStates = stateOptions.filter(
          function (str:string) { return str.toLowerCase().includes(stateSearch.toLowerCase()) } 
        ) 
      }
      return (
        filteredStates.sort().map( (x:string, y:number) => 
          <li key={y} >
            <input 
              type="checkbox" 
              checked={userInputs.orgStates.includes(x)}
              onChange={e => handleCheck(x, userInputs.orgStates, (states:Array<string>) => setOrgStates(states))}
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
          function (str:string) { return str.toLowerCase().includes(citySearch.toLowerCase()) } 
        )
      }
      return (
        filteredCities.sort().map( (x:string, y:number) => 
          <li key={y} >
            <input 
              type="checkbox" 
              checked={userInputs.orgCities.includes(x)}
              onChange={e => handleCheck(x, userInputs.orgCities, (cities:Array<string>) => setOrgCities(cities))}
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
      <h5>City/State</h5>
      <button onClick={e => setOpenCitiesStates(!openCitiesStates)}>{ openCitiesStates ? "-" : "+" }</button>
      </div>
      { 
        openCitiesStates ? 
        <>
        <div className="db__search-field-sub-section">
            <div className="db__search-field-sub-header">
              <h6>State</h6> </div>
              <input value={stateSearch} maxLength={25} onChange={(e) => {
                e !== undefined ? setStateSearchLength(e.target.value.length) : setStateSearchLength(0)
                setStateSearch(e.target.value)
              }} />
              { stateSearchLength === 25 && <span className='db__char-limit'>Character limit maximum reached</span> }
              <button onClick={e => setOpenStates(!openStates)}>{ openStates ? "-" : "+" }</button>
              <ul className="CheckDrop">{stateList()}</ul>
            <div className="db__search-field-sub-header">
              <h6>City</h6></div>
              <input value={citySearch} maxLength={25} onChange={(e) => {
                e !== undefined ? setCitySearchLength(e.target.value.length) : setCitySearchLength(0)
                setCitySearch(e.target.value)
              }} />              
              { citySearchLength === 25 && <span className='db__char-limit'>Character limit maximum reached</span> }
              <button onClick={e => setOpenCities(!openCities)}>{ openCities ? "-" : "+" }</button>
              <ul className="CheckDrop">{cityList()}</ul>
          </div>
        </>
        : <></>
      }
    </div>  
  );
}

export default LocationMenu;
