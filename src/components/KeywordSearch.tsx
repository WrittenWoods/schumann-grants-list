import React, { useState, useEffect } from 'react';

function KeywordSearch({ userInputs, setSearchQueries }) {

  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="KeywordSearch">
        <input 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    setSearchQueries([...userInputs.searchQueries, searchTerm])
                    setSearchTerm("")
                }
            }}
        />
        <ul>
            {userInputs.searchQueries.map(
                 (x, y) => (
                    <li key={y}>
                        {x} 
                        <button onClick={(e) => setSearchQueries([...userInputs.searchQueries].filter((i) => i !== x))} >x</button>
                    </li> 
            ))}
        </ul>
    </div>
  );
}

export default KeywordSearch;
