import React, { useState } from 'react';

function Criteria({userInputs}) {

  function listCriteria() {

    const result = []

    function sublist(name, inputArray) {
      for (let i = 0; i < inputArray.length; i++) {
        result.push(<li>{name}: {inputArray[i]}</li>)
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
      return <li>None</li>
    } else {
      return result
    }
  }

  return (
    <div className="Criteria">
      <h3>Filters:</h3>
      <ul>
        {listCriteria()}
      </ul>
    </div>
  );
}

export default Criteria;
