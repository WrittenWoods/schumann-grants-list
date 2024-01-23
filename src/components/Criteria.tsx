import React, { useState } from 'react';
import './App.css';
import { iconClasses } from '../helpers/generalOptions';

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

    sublist(iconClasses.iconOrg, userInputs.orgNames)
    sublist(iconClasses.iconLocation, userInputs.orgCities)
    sublist(iconClasses.iconLocation, userInputs.orgStates)
    sublist(iconClasses.iconGrantType, userInputs.grantTypes)
    sublist(iconClasses.iconFundingType, userInputs.fundingTypes)
    sublist(iconClasses.iconProgramArea, userInputs.programAreas)
    sublist(iconClasses.iconStrategy, userInputs.strategies)
    sublist(iconClasses.iconDonor, userInputs.donors)
    sublist(iconClasses.iconKeyword, userInputs.searchQueries)

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
