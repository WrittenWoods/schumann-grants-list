import React, { useState, useEffect } from 'react';
import './App.css';

function CheckDrop({ fieldName, results, setMethod, options }) {
  
  const [openList, setOpenList] = useState(!fieldName)
  const [orgSearch, setOrgSearch] = useState("")

  function handleCheck(arg) {
    if (results.includes(arg)) {
      let index = results.indexOf(arg)
      let newResults = [...results]
      newResults.splice(index, 1)
      setMethod(newResults)
    } else {
      setMethod([...results, arg])
    }
  }

  function filterOptions() {
    if (fieldName === "Organization") {
      let filteredOrgs = options
      if (orgSearch) { 
        filteredOrgs = filteredOrgs.filter(
          function (str) { return str.toLowerCase().includes(orgSearch.toLowerCase()) } 
        ) 
      }    
      return filteredOrgs
    } else {
      return options
    }
  }

  function renderOrgSearch() {
    if (fieldName === "Organization" && openList) {
      return (
        <input value={orgSearch} onChange={(e) => setOrgSearch(e.target.value)} />
      )
    }
  }

  function renderList() {

    if (openList) {
      return (
        <ul className="CheckDrop">
         { 
          filterOptions().sort().map( (x, y) => 
            <li key={y} >
              <input 
                type="checkbox" 
                checked={results.includes(x)}
                onChange={e => handleCheck(x)}
              >  
              </input>
              <span>{x}</span>
            </li> 
          )
         }
        </ul>
      )
    } else {
      <></>
    }
  }

  return (
    <>
    <div className="db__search-field-head">
      { fieldName && 
        <>
          <h6>{fieldName}</h6>
          <button onClick={e => setOpenList(!openList)}>{ openList ? "-" : "+" }</button>
        </>
      }
      </div>
      {renderOrgSearch()}
      
      {renderList()}
    </>
  );
}

export default CheckDrop;
