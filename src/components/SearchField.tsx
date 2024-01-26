import React, { useState, useEffect } from 'react';
import './App.css';
import { SearchFields } from '../helpers/enums';
import Select, { StylesConfig } from 'react-select';
import CheckDrop from './CheckDrop';
import LocationMenu from './LocationMenu';
import KeywordSearch from './KeywordSearch';
import ApprovalDate from './ApprovalDate';
import { uniqueOptions } from '../helpers/uniqueOptions';
import CurrencyInput, { formatValue } from 'react-currency-input-field';

function SearchField( { fieldType, loadedData, userInputs, setUserInputs, defaults = {} } ) {

  const [ openAmount, setOpenAmount ] = useState<boolean>(false);
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
            <h6>Amount</h6>
            <button onClick={e => setOpenAmount(!openAmount)}>{ openAmount ? "-" : "+" }</button>
            </div>
            { openAmount && 
              <>
                <h6>Minimum Value</h6>
                <CurrencyInput 
                  value={userInputs.minVal != defaults.minVal ? userInputs.minVal : ''}
                  defaultValue={userInputs.minVal != defaults.minVal ? userInputs.minVal : ''} 
                  placeholder={formatValue({value: defaults.minVal, prefix: '$', groupSeparator: ',', decimalSeparator: '.'})} 
                  prefix={'$'} 
                  onValueChange={(value) => setMinVal(value || defaults.minVal)} 
                />
                <h6>Maximum Value</h6>
                <CurrencyInput 
                  value={userInputs.maxVal != defaults.maxVal ? userInputs.maxVal : ''}
                  defaultValue={userInputs.maxVal != defaults.maxVal ? userInputs.maxVal : ''} 
                  prefix={'$'} 
                  placeholder={formatValue({value: defaults.maxVal, prefix: '$', groupSeparator: ',', decimalSeparator: '.'})} 
                  onValueChange={(value) => setMaxVal(value || defaults.maxVal)} 
                />
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
              options={uniqueOptions(loadedData.map( (x) => x.orgName ))}
            />
          </div>
        )
        break;

      case SearchFields.Location:
        return (
          <div className="db__search-field-inner">
            <LocationMenu
              userInputs={userInputs}
              cityOptions={uniqueOptions(loadedData.map( (x) => x.orgCity ))}
              stateOptions={uniqueOptions(loadedData.map( (x) => x.orgState ))}
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
              options={uniqueOptions(loadedData.map( (x) => x.grantType ))}
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
              options={uniqueOptions(loadedData.map( (x) => x.fundingType ))}
            />
          </div>
        )
        break;

      case SearchFields.ProgramArea:
        return (
          <div className="db__search-field-inner">
            <CheckDrop 
              fieldName={"Program Area"}
              results={userInputs.programAreas}
              setMethod={setProgramAreas}
              options={uniqueOptions(loadedData.map( (x) => x.programArea ))}
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
              options={uniqueOptions(loadedData.map( (x) => x.strategy ).concat(loadedData.map( (x) => x.strategy2 )))}
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
              options={uniqueOptions(loadedData.map( (x) => x.donor ))}
            />
          </div>
        )
        break;

      case SearchFields.KeywordSearch:
        return (
          <div className="db__search-field-inner">
            <h6>Keyword Search</h6>
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
