import React, { useState, useEffect } from 'react';
import './App.css';

function ColumnHead({ name, filteredResults, setFilteredResults, sortFunctions }) {

  const [reversed, setReversed] = useState(true)

  function handleSortButton() {
    let newResults = filteredResults
    for (let i = 0; i < sortFunctions.length; i++) { newResults = newResults.sort(sortFunctions[i]) }
    if (!reversed) { newResults = newResults.reverse() }
    setFilteredResults([...newResults])
    setReversed(!reversed)
  }

  return (
    <div className='db__results-sort'>
      <h6>{name}</h6>
      <button onClick={e => handleSortButton()}>
         { reversed ? <i class="fa-solid fa-arrow-down"></i> : <i class="fa-solid fa-arrow-up"></i> }
      </button>
    </div>
  );
        
}

export default ColumnHead;