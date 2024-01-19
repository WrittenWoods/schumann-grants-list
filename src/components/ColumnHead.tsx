import React, { useState, useEffect } from 'react';

function ColumnHead({ name, filteredResults, setFilteredResults, sortFunction }) {

  const [reversed, setReversed] = useState(true)

  function handleSortButton() {
    let newResults = filteredResults.sort(sortFunction)
    if (!reversed) { newResults = newResults.reverse() }
    setFilteredResults([...newResults])
    setReversed(!reversed)
  }

  return (
    <td>
      {name}
      <button onClick={e => handleSortButton()}>{ reversed ? "⌃" : "⌄" }</button>
    </td>
  );
}

export default ColumnHead;