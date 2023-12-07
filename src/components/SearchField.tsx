import React, { useState } from 'react';
import { SearchFields } from '../helpers/enums';

function SearchField( { fieldType, loadedData, userInputs, setUserInputs } ) {

// uses the value of the fieldType props to render different parts of the search UI.

function renderField(fieldType) {
  switch (fieldType) {

    case SearchFields.ApprovalDate:
      return (
        <h1>Buh</h1>
      )
      break;

    case SearchFields.Amount:
      return (
        <h1>Buh</h1>
      )      
      break;  

    case SearchFields.Organization:
      return (
        <h1>Buh</h1>
      )
      break;

    case SearchFields.Location:
      return (
        <h1>Buh</h1>
      )
      break;

    case SearchFields.GrantType:
      return (
        <h1>Buh</h1>
      )
      break;

    case SearchFields.FundingType:
      return (
        <h1>Buh</h1>
      )
      break;

    case SearchFields.ProgramArea:
      return (
        <h1>Buh</h1>
      )
      break;

    case SearchFields.Strategy:
      return (
        <h1>Buh</h1>
      )
      break;

    case SearchFields.Donor:
      return (
        <h1>Buh</h1>
      )
      break;

    case SearchFields.KeywordSearch:
      return (
        <h1>Buh</h1>
      )
      break;

    default:
      break;
  }
}

  return (
    <div className="search-field">
      {renderField(fieldType)}
    </div>
  );
}

export default SearchField;
