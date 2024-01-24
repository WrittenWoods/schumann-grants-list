import React, { useState, useEffect } from 'react';
import './App.css';
import { SortableColumns, SortStatus } from '../helpers/enums';

function ColumnHead({ name, filteredResults, setFilteredResults, sortedColumn, setSortedColumn }) {

  const [reversed, setReversed] = useState(true)

  const sortFunctions = sortFunctionsArray(name)

  function sortFunctionsArray(name) {
    if (name === SortableColumns.Amount) { return [dateCompare, stringCompare, amountCompare] }
    if (name === SortableColumns.Result) { return [amountCompare, dateCompare, stringCompare] }
    return [amountCompare, stringCompare, dateCompare]
  }

  function stringCompare(a, b) {
    let compare = a.orgName.localeCompare(b.orgName)

    if (compare === 0) {
        let stateCompare = a.orgState.localeCompare(b.orgState)
        compare = stateCompare === 0 ? a.orgCity.localeCompare(b.orgCity) : stateCompare
    } 
    if (compare === 0) { compare = a.programArea.localeCompare(b.programArea) }
    if (compare === 0) { compare = a.fundingType.localeCompare(b.fundingType) }
    if (compare === 0) { compare = a.donor.localeCompare(b.donor) }
    if (compare === 0) { compare = a.grantType.localeCompare(b.grantType) }
    if (compare === 0) { compare = a.strategy.localeCompare(b.strategy) }

    return compare
  }

  function dateCompare(a, b) {
      let yearCompare = Math.sign(a.year - b.year)
      return yearCompare === 0 ? Math.sign(a.month - b.month) : yearCompare
  }

  function amountCompare(a, b) {
      return Math.sign(a.amount - b.amount)
  }

  function renderSortButton() {
    if (sortedColumn === name) {
      return (
        // <button onClick={e => handleSortButton()}>
        <>
          { reversed ? <i className={SortStatus.ArrowDown}></i> : <i className={SortStatus.ArrowUp}></i> }
        </>
      )
    }
  }

  function handleSortButton() {
    let newResults = filteredResults
    setReversed(!reversed)
    for (let i = 0; i < sortFunctions.length; i++) { newResults = newResults.sort(sortFunctions[i]) }
    if (!reversed) { newResults = newResults.reverse() }
    setFilteredResults([...newResults])
    setSortedColumn(name)
  }

  function activeSortClass() {
    return (sortedColumn !== name ? 'db__results-sorted-inactive' : 'db__results-sorted-active')  
  }

  function sortDirection() {
    return (sortedColumn !== name 
        ? ''
        : reversed ? 'db__results-sorted-ascending' : 'db__results-sorted-descending'
    ) 
  }
  return (
    <div className='db__results-sort'>
    <button className={`db__results-sort ${activeSortClass()} ${sortDirection()}`} onClick={e => handleSortButton()}>
      <h6>{name}</h6>
      {renderSortButton()}
    </button>
    </div>
  );
        
}

export default ColumnHead;