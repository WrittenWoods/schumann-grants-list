import React, { useState, useEffect } from 'react';
import './App.css';

function KeywordSearch({ userInputs, setSearchQueries, setAnyTerms }) {

  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="KeywordSearch">
{/*         <label>
          <input 
            type="radio" 
            name="anyTerms" 
            value={!userInputs.anyTerms}
            onChange={(e) => setAnyTerms(false)}
          />
          All terms
        </label>
        <label>
          <input 
            type="radio" 
            name="anyTerms" 
            value={userInputs.anyTerms}
            onChange={(e) => setAnyTerms(true)}
          />
          Any terms
        </label> */}
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
