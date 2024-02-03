import React from 'react';
import './App.css';
import { uniqueOptions } from '../helpers/uniqueOptions';
import { Months } from '../helpers/enums';
import { Inputs } from '../helpers/types';

function ApprovalDate(
    { userInputs, setMinMonth, setMaxMonth, setMinYear, setMaxYear, defaults }:
    { 
      userInputs:Inputs, 
      setMinMonth:(val:number) => void, 
      setMaxMonth:(val:number) => void, 
      setMinYear:(val:number) => void, 
      setMaxYear:(val:number) => void, 
      defaults:Inputs
    }
  ) {

    // Creates array of option elements corresponding to contents of an array

    function listOptions(arg:Array<string>) {

      let result = uniqueOptions(arg)

      return result.map ( (x, y) => (
        <option value={x} key={y}>{x}</option>
      ))
    }

    // Creates array of year option elements for approval date selector

    function yearOptions() {
      let result = []
      let currentYear = new Date().getFullYear()

      for (let i = 1979; i <= currentYear; i++) { result.push(i) }

      return result.map ( (x, y) => <option value={x} key={y} >{x}</option>)
    } 

    return (
    <>
      <div className="db__search-field-head">
        <h6>Approval Date</h6>
      </div>
      <div className="db__approval-date">
        <div className="db__approval-date-start">
          <select 
            className={ userInputs.minMonth == defaults.minMonth ? 'db__filter-default-value' : ''} 
            value={Months[userInputs.minMonth - 1]} 
            onChange={(e) => setMinMonth(Months.indexOf(e.target.value) + 1)} >
              {listOptions(Months)}
          </select>
          <select 
            className={ userInputs.minYear == defaults.minYear ? 'db__filter-default-value' : ''} 
            value={userInputs.minYear} 
            onChange={(e) => setMinYear(Number(e.target.value))}  >
              {yearOptions()}
          </select>
        </div>
        <span> — </span>
        <div className="db__approval-date-end">
          <select 
            className={ userInputs.maxMonth == defaults.maxMonth ? 'db__filter-default-value' : ''}
            value={Months[userInputs.maxMonth - 1]} 
            onChange={(e) => setMaxMonth(Months.indexOf(e.target.value) + 1)} >
              {listOptions(Months)}
          </select>
          <select 
            className={ userInputs.maxYear == defaults.maxYear ? 'db__filter-default-value' : ''}
            value={userInputs.maxYear} 
            onChange={(e) => setMaxYear(Number(e.target.value))}>
              {yearOptions()}
          </select>
        </div>
      </div>
    </>
    );
}

export default ApprovalDate;
