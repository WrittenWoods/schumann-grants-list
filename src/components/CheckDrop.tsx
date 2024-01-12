import React, { useState, useEffect } from 'react';

function CheckDrop({ fieldName, results, setMethod, options }) {
  
  const [openList, setOpenList] = useState(false)
  const [currentResults, setCurrentResults] = useState([...results])

  useEffect(() => {
    setMethod([...currentResults])
  }, [currentResults])

  function handleCheck(arg) {
    if (currentResults.includes(arg)) {
      let index = currentResults.indexOf(arg)
      let newResults = [...currentResults]
      newResults.splice(index, 1)
      setCurrentResults(newResults)
    } else {
      setCurrentResults([...currentResults, arg])
    }
  }

  function renderList() {

    if (openList) {
      return (
        options.map( (x, y) => 
          <li key={y} >
            <input 
              type="checkbox" 
              checked={currentResults.includes(x)}
              onChange={e => handleCheck(x)}
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
    <>
      <h3>{fieldName}</h3>
      <button onClick={e => setOpenList(!openList)}>{ openList ? "⌃" : "⌄" }</button>
      <ul className="CheckDrop">
        {renderList()}
      </ul>
    </>
  );
}

export default CheckDrop;
