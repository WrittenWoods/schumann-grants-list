import React, { useState } from 'react';
import './App.css';
import { IconClasses } from '../helpers/enums';

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

    sublist(IconClasses.iconOrg, userInputs.orgNames)
    sublist(IconClasses.iconLocation, userInputs.orgCities)
    sublist(IconClasses.iconLocation, userInputs.orgStates)
    sublist(IconClasses.iconGrantType, userInputs.grantTypes)
    sublist(IconClasses.iconFundingType, userInputs.fundingTypes)
    sublist(IconClasses.iconProgramArea, userInputs.programAreas)
    sublist(IconClasses.iconStrategy, userInputs.strategies)
    sublist(IconClasses.iconDonor, userInputs.donors)
    sublist(IconClasses.iconKeyword, userInputs.searchQueries)

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
