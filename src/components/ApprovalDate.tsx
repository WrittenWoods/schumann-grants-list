import React, { useState } from 'react';
import './App.css';
import { uniqueOptions } from '../helpers/uniqueOptions';

function ApprovalDate({ userInputs, setMinMonth, setMaxMonth, setMinYear, setMaxYear }) {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    // Creates array of option elements corresponding to contents of an array

    function listOptions(arg) {

      let result = uniqueOptions(arg)

      return result.map ( (x, y) => (
        <option value={x} key={y}>{x}</option>
      ))
    }

    // Creates array of year option elements for approval date selector

    function yearOptions() {
      let result = []
      let currentYear = new Date().getFullYear()

      for (let i = 1900; i <= currentYear; i++) { result.push(i) }

      return result.map ( (x, y) => <option value={x} key={y} >{x}</option>)
    } 

    return (
    <>
        <div className="db__search-field-head">
        <h6>Approval Date</h6>
        </div>
        <span>Start</span>
        <select value={months[userInputs.minMonth - 1]} onChange={(e) => setMinMonth(months.indexOf(e.target.value) + 1)} >{listOptions(months)}</select>
        <select value={userInputs.minYear} onChange={(e) => setMinYear(Number(e.target.value))}  >{yearOptions()}</select>

        <span>End</span>
        <select value={months[userInputs.maxMonth - 1]} onChange={(e) => setMaxMonth(months.indexOf(e.target.value) + 1)} >{listOptions(months)}</select>
        <select value={userInputs.maxYear} onChange={(e) => setMaxYear(Number(e.target.value))}  >{yearOptions()}</select>
    </>
    );
}

export default ApprovalDate;
