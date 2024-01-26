import React, { useState, useEffect } from 'react';
import './App.css';
import { SortStatus } from '../helpers/enums';

function ColumnHead({ name, isSorted, setSortedColumn }:{name:string, isSorted: boolean, setSortedColumn:(column:string, reversed:boolean) => void}) {
  const [ reversed, setReversed ] = useState<boolean>(false);

  useEffect(() => {
    setReversed( isSorted ? false : true)
  }, [isSorted]);


  function stringCompare(a:any, b:any) {
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

  function dateCompare(a:any, b:any) {
      let yearCompare = Math.sign(a.year - b.year)
      return yearCompare === 0 ? Math.sign(a.month - b.month) : yearCompare
  }

  function amountCompare(a:any, b:any) {
      return Math.sign(a.amount - b.amount)
  }

  function renderSortButton() {
    if (isSorted) {
      return (
        // <button onClick={e => handleSortButton()}>
        <>
          { reversed ? <i className={SortStatus.ArrowDown}></i> : <i className={SortStatus.ArrowUp}></i> }
        </>
      )
    }
  }


  function handleSortButton() {
    let rev = !reversed
    setSortedColumn({column: name, reversed: rev});
    setReversed(rev)
  }

  function activeSortClass() {
    return (isSorted ? 'db__results-sorted-inactive' : 'db__results-sorted-active')  
  }

  function sortDirection() {
    return (!isSorted 
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