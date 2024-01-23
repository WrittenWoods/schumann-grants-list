import React, { useState } from 'react';
import './App.css';
import '../helpers/generalOptions.ts';


function Criteria({userInputs}) {

  function listCriteria() {

    const result = []

    function sublist(icon, inputArray) {
      for (let i = 0; i < inputArray.length; i++) {
        result.push(
          <div className="db__grant-info-tag" key={i}>
            <div className="db__grant-info-tag-icon"><i className={icon}></i></div>
            <div className="db__grant-info-tag-text">{inputArray[i]}</div>
          </div>
        )
      }
    }

    sublist(iconOrg, userInputs.orgNames)
    sublist(iconLocation, userInputs.orgCities)
    sublist(iconLocation, userInputs.orgStates)
    sublist(iconGrantType, userInputs.grantTypes)
    sublist(iconFundingType, userInputs.fundingTypes)
    sublist(iconProgramArea, userInputs.programAreas)
    sublist(iconStrategy, userInputs.strategies)
    sublist(iconDonor, userInputs.donors)
    sublist(iconKeyword, userInputs.searchQueries)

    if (result.length === 0) {
      return (
      <div className="db__grant-info-tag" key={0}>
        <div className="db__grant-info-tag-icon">None</div>
        <div className="db__grant-info-tag-text"></div>
      </div>
      )
    } else {
      return result
    }
  }

  return (
    <div className="db__summary_filters">      
      <h4>Filters applied:</h4>
      <div className="db__grant-info-tags">      
        {listCriteria()}
      </div>
    </div>
  );
}

export default Criteria;
