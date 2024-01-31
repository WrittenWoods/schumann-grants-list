import React, { useState, useEffect } from 'react';
import './App.css';
import { SearchFields } from '../helpers/enums';
import { uniqueOptions } from '../helpers/uniqueOptions';
import Select, { StylesConfig } from 'react-select';
import CheckDrop from './CheckDrop';
import LocationMenu from './LocationMenu';
import KeywordSearch from './KeywordSearch';
import ApprovalDate from './ApprovalDate';
import CurrencyInput, { formatValue } from 'react-currency-input-field';
import ProgramAreaMenu from './ProgramAreaMenu';

function SearchField( { fieldType, loadedData, userInputs, setUserInputs, defaults = {} } ) {

  const [ openAmount, setOpenAmount ] = useState<boolean>(false);
  const [ minValLength, setMinValLength ] = useState<number>(0);
  const [ maxValLength, setMaxValLength ] = useState<number>(0);

  // State variables corresponding to user inputs
   
  function setMinMonth(value) { setUserInputs({ ...userInputs, minMonth: value })};
  function setMaxMonth(value) { setUserInputs({ ...userInputs, maxMonth: value })};
  function setMinYear(value) { setUserInputs({ ...userInputs, minYear: value })};
  function setMaxYear(value) { setUserInputs({ ...userInputs, maxYear: value })};
  function setMinVal(value) { setUserInputs({ ...userInputs, minVal: value })};
  function setMaxVal(value) { setUserInputs({ ...userInputs, maxVal: value })};

  function setOrgNames(value) { setUserInputs({ ...userInputs, orgNames: value })};
  function setOrgCities(value) { setUserInputs({ ...userInputs, orgCities: value })};
  function setOrgStates(value) { setUserInputs({ ...userInputs, orgStates: value })};
  function setGrantTypes(value) { setUserInputs({ ...userInputs, grantTypes: value })};
  function setFundingTypes(value) { setUserInputs({ ...userInputs, fundingTypes: value })};
  function setProgramAreas(value) { setUserInputs({ ...userInputs, programAreas: value })};
  function setStrategies(value) { setUserInputs({ ...userInputs, strategies: value })};
  function setDonors(value) { setUserInputs({ ...userInputs, donors: value })};
  function setAnyTerms(value) { setUserInputs({ ...userInputs, anyTerms: value })};
  function setSearchQueries(value) { setUserInputs({ ...userInputs, searchQueries: value })};

  // uses the value of the fieldType props to render different parts of the search UI.

  function renderField(fieldType) {

    // Returns JSX for a search UI component depending on the fieldType props

    switch (fieldType) {

      case SearchFields.ApprovalDate:
        return (
          <div className="db__search-field-inner">
            <ApprovalDate 
              defaults={defaults}
              userInputs={userInputs}
              setMinMonth={setMinMonth}
              setMaxMonth={setMaxMonth}
              setMinYear={setMinYear}
              setMaxYear={setMaxYear}
            />
          </div>
        )
        break;

      case SearchFields.Amount:
        return (
          <div className="db__search-field-inner">
            <div className="db__search-field-head">
            <h5>Amount</h5>
            <button onClick={e => setOpenAmount(!openAmount)}>{ openAmount ? "-" : "+" }</button>
            </div>
            { openAmount && 
              <>
                <div className="db__search-field-sub-section">
                  <div className="db__search-field-sub-header">
                    <h6>Minimum Value</h6></div>
                    <CurrencyInput 
                      value={userInputs.minVal != defaults.minVal ? userInputs.minVal : ''}
                      defaultValue={userInputs.minVal != defaults.minVal ? userInputs.minVal : ''} 
                      placeholder={formatValue({value: defaults.minVal, prefix: '$', groupSeparator: ',', decimalSeparator: '.'})} 
                      prefix={'$'} 
                      maxLength={10}
                      onValueChange={(value) => {
                        value !== undefined ? setMinValLength(value.length) : setMinValLength(0)
                        setMinVal(value || defaults.minVal)
                      }}                     
                    />
                    { minValLength === 10 && <span className='db__char-limit' >Character limit maximum reached</span> }
                  <div className="db__search-field-sub-header">
                    <h6>Maximum Value</h6></div>
                    <CurrencyInput 
                      value={userInputs.maxVal != defaults.maxVal ? userInputs.maxVal : ''}
                      defaultValue={userInputs.maxVal != defaults.maxVal ? userInputs.maxVal : ''} 
                      prefix={'$'} 
                      maxLength={10}
                      placeholder={formatValue({value: defaults.maxVal, prefix: '$', groupSeparator: ',', decimalSeparator: '.'})} 
                      onValueChange={(value) => {
                        value !== undefined ? setMaxValLength(value.length) : setMaxValLength(0)
                        setMaxVal(value || defaults.maxVal)
                      }} 
                    />
                    { maxValLength === 10 && <span className='db__char-limit'>Character limit maximum reached</span> }
                </div>
              </>
            }
          </div>
        )      
        break;  

      case SearchFields.Organization:
        return (
          <div className="db__search-field-inner">
            <CheckDrop 
              fieldName={"Organization"}
              results={userInputs.orgNames}
              setMethod={setOrgNames}
              options={loadedData.uniqueOptions?.orgName}
            />
          </div>
        )
        break;

      case SearchFields.Location:
        return (
          <div className="db__search-field-inner">
            <LocationMenu
              userInputs={userInputs}
              cityOptions={loadedData.uniqueOptions?.orgCity}
              stateOptions={loadedData.uniqueOptions?.orgState}
              setOrgCities={setOrgCities}
              setOrgStates={setOrgStates}
            />
          </div>
        )
        break;

      case SearchFields.GrantType:
        return (
          <div className="db__search-field-inner">
            <CheckDrop 
              fieldName={"Grant Type"}
              results={userInputs.grantTypes}
              setMethod={setGrantTypes}
              options={loadedData.uniqueOptions?.grantType}
            />
          </div>      
        )
        break;

      case SearchFields.FundingType:
        return (
          <div className="db__search-field-inner">
            <CheckDrop 
              fieldName={"Funding Types"}
              results={userInputs.fundingTypes}
              setMethod={setFundingTypes}
              options={loadedData.uniqueOptions?.fundingType}
            />
          </div>
        )
        break;

      case SearchFields.ProgramArea:
        return (
          <div className="db__search-field-inner">
            <ProgramAreaMenu
              userInputs={userInputs}
              loadedData={loadedData}
              setProgramAreas={setProgramAreas}
              />
          </div>
        )
        break;

      case SearchFields.Strategy:
        return (
          <div className="db__search-field-inner">
            <CheckDrop 
              fieldName={"Strategy"}
              results={userInputs.strategies}
              setMethod={setStrategies}
              options={loadedData.uniqueOptions?.strategy}
            />
          </div>
        )
        break;

      case SearchFields.Donor:
        return (
          <div className="db__search-field-inner">
            <CheckDrop 
              fieldName={"Donor"}
              results={userInputs.donors}
              setMethod={setDonors}
              options={loadedData.uniqueOptions?.donor}
            />
          </div>
        )
        break;

      case SearchFields.KeywordSearch:
        return (
          <div className="db__search-field-inner">
            <h5>Keyword Search</h5>
            <KeywordSearch 
              userInputs={userInputs}
              setSearchQueries={setSearchQueries}
              setAnyTerms={setAnyTerms}
            />
          </div>
        )
        break;

      default:
        break;
    }
  }

  return (
    <div className="db__search-field">
      {renderField(fieldType)}
    </div>
  );
}

export default SearchField;
