import React, { useState } from 'react';
import './App.css';

function Criteria({userInputs}) {

  function listCriteria() {

    const result = []

    function sublist(name, inputArray) {
      for (let i = 0; i < inputArray.length; i++) {
        result.push(
          <div className="db__grant-info-tag" key={i}>
            <span className="db__grant-info-tag-icon">{name}: </span>
            <span className="db__grant-info-tag-text">{inputArray[i]}</span>
          </div>
        )
      }
    }

    sublist("Grantee", userInputs.orgNames)
    sublist("City", userInputs.orgCities)
    sublist("State", userInputs.orgStates)
    sublist("Grant Type", userInputs.grantTypes)
    sublist("Funding Type", userInputs.fundingTypes)
    sublist("Program Area", userInputs.programAreas)
    sublist("Strategy", userInputs.strategies)
    sublist("Donor", userInputs.donors)
    sublist("Keyword", userInputs.searchQueries)

    if (result.length === 0) {
      return (
      <div className="db__grant-info-tag" key={0}>
        <span className="db__grant-info-tag-icon">None</span>
        <span className="db__grant-info-tag-text"></span>
      </div>
      )
    } else {
      return result
    }
  }

  return (
    <div className="db__summary_filters">      
      <h3>Filters applied:</h3>
      <div className="db__grant-info-tags">      
        {listCriteria()}
      </div>
    </div>
  );
}

export default Criteria;
