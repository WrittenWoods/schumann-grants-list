/* 

-The component in which the search results are all displayed.
-Will display a collection of individual Result components.
-Will initially display the entire list of grants as a scrollable list, barring performance issues.
-Will inherit criteria from the Criteria component and use to refine list.

*/

import React, { useState } from 'react';
import './App.css';
import Result from './Result';
import Nav from './Nav';
import PaginationBar from './PaginationBar';
import { Column, GrantRecord } from '../helpers/types';

function Results( 
  { sortedColumn, setSortedColumn, filteredResults }:
  { sortedColumn:Column, setSortedColumn:(col:Column) => void, filteredResults:Array<GrantRecord> } 
) {

  const [currPageStart, setCurrPageStart] = useState(0)
  const [currPageEnd, setCurrPageEnd] = useState(10)

  // The functions below are named according to which properties of the userInputs object they identify.
  // If the function returns true at an index of loadedData, the result at that index is displayed.


  // Uses the array generated from the filterGrants function to render Result components.

  return (
    <>
      <nav className="db__results-nav">
        <Nav 
          sortedColumn={sortedColumn}
          setSortedColumn={setSortedColumn}
        />
      </nav>
      {[...filteredResults].slice(currPageStart, currPageEnd).map( (individualGrant, n) =>
        <Result 
          individualGrant={individualGrant}
          key={n}
        />
      )}
      <PaginationBar 
        filteredResults={filteredResults}
        currPageStart={currPageStart}
        setCurrPageStart={setCurrPageStart}
        currPageEnd={currPageEnd}
        setCurrPageEnd={setCurrPageEnd}
      />
    </>
  );
}

export default Results;
