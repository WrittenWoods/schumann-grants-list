import React, { useState, useEffect } from 'react';

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
        { reversed ? "⌃" : "⌄" }
      </button>
    </div>
  );
        
}

export default ColumnHead;