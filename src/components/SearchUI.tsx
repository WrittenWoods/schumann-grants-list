import React, { useState } from 'react';
import './App.css';
import SearchField from "./SearchField";
import { SearchFields } from '../helpers/enums';

function SearchUI( {userInputs, setUserInputs, loadedData} ) {

  // An array of all values of the SearchFields enum. 
  // Used to generate each part of the SearchUI.

  const searchFieldsList = [
    SearchFields.ApprovalDate, 
    SearchFields.Amount, 
    SearchFields.Organization, 
    SearchFields.Location, 
    SearchFields.GrantType, 
    SearchFields.FundingType, 
    SearchFields.ProgramArea, 
    SearchFields.Strategy, 
    SearchFields.Donor, 
    SearchFields.KeywordSearch
  ]

  // Iterates over searchFieldsList to render the UI for various search criteria.

  return (
    <div className="db__queries_inner">
      {searchFieldsList.map( (fieldType, n) =>
        <SearchField 
          fieldType={fieldType} 
          loadedData={loadedData}
          userInputs={userInputs}
          setUserInputs={setUserInputs}
          key={n}
        />
      )}
    </div>
  );
}

export default SearchUI;
