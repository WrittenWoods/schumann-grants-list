import React, { useState, useEffect } from 'react';
import './App.css';
import { SearchFields } from '../helpers/enums';
import Select, { StylesConfig } from 'react-select';
import CheckDrop from './CheckDrop';
import LocationMenu from './LocationMenu';
import KeywordSearch from './KeywordSearch';
import ApprovalDate from './ApprovalDate';
import { uniqueOptions } from '../helpers/uniqueOptions';

function SearchField( { fieldType, loadedData, userInputs, setUserInputs } ) {

  // State variables corresponding to user inputs
   
  const [minMonth, setMinMonth] = useState(userInputs.minMonth)
  const [maxMonth, setMaxMonth] = useState(userInputs.maxMonth)
  const [minYear, setMinYear] = useState(userInputs.minYear)
  const [maxYear, setMaxYear] = useState(userInputs.maxYear)
  const [minVal, setMinVal] = useState(userInputs.minVal)
  const [maxVal, setMaxVal] = useState(userInputs.maxVal)
  const [orgNames, setOrgNames] = useState([...userInputs.orgNames])
  const [orgCities, setOrgCities] = useState([...userInputs.orgCities])
  const [orgStates, setOrgStates] = useState([...userInputs.orgStates])
  const [grantTypes, setGrantTypes] = useState([...userInputs.grantTypes])
  const [fundingTypes, setFundingTypes] = useState([...userInputs.fundingTypes])
  const [programAreas, setProgramAreas] = useState([...userInputs.programAreas])
  const [strategies, setStrategies] = useState([...userInputs.strategies])
  const [donors, setDonors] = useState([...userInputs.donors])
  const [anyTerms, setAnyTerms] = useState(userInputs.anyTerms)
  const [searchQueries, setSearchQueries] = useState([...userInputs.searchQueries])

  // Updates userInputs state whenever user interacts with the search UI

  useEffect(() => {
    let newUserInputs = { ...userInputs }
    newUserInputs.minMonth = minMonth
    setUserInputs(newUserInputs)
  }, [minMonth] )

  useEffect(() => {
    let newUserInputs = { ...userInputs }
    newUserInputs.maxMonth = maxMonth
    setUserInputs(newUserInputs)
  }, [maxMonth] )

  useEffect(() => {
    let newUserInputs = { ...userInputs }
    newUserInputs.minYear = minYear
    setUserInputs(newUserInputs)
  }, [minYear] )

  useEffect(() => {
    let newUserInputs = { ...userInputs }
    newUserInputs.maxYear = maxYear
    setUserInputs(newUserInputs)
  }, [maxYear] )

  useEffect(() => {
    let newUserInputs = { ...userInputs }
    newUserInputs.orgNames = [...orgNames]
    setUserInputs(newUserInputs)
  }, [orgNames] )

  useEffect(() => {
    let newUserInputs = { ...userInputs }
    newUserInputs.orgCities = [...orgCities]
    setUserInputs(newUserInputs)
  }, [orgCities] )

  useEffect(() => {
    let newUserInputs = { ...userInputs }
    newUserInputs.orgStates = [...orgStates]
    setUserInputs(newUserInputs)
  }, [orgStates] )

  useEffect(() => {
    let newUserInputs = { ...userInputs }
    newUserInputs.grantTypes = [...grantTypes]
    setUserInputs(newUserInputs)
  }, [grantTypes] )

  useEffect(() => {
    let newUserInputs = { ...userInputs }
    newUserInputs.fundingTypes = [...fundingTypes]
    setUserInputs(newUserInputs)
  }, [fundingTypes] )

  useEffect(() => {
    let newUserInputs = { ...userInputs }
    newUserInputs.programAreas = [...programAreas]
    setUserInputs(newUserInputs)
  }, [programAreas] )

  useEffect(() => {
    let newUserInputs = { ...userInputs }
    newUserInputs.strategies = [...strategies]
    setUserInputs(newUserInputs)
  }, [strategies] )

  useEffect(() => {
    let newUserInputs = { ...userInputs }
    newUserInputs.donors = [...donors]
    setUserInputs(newUserInputs)
  }, [donors] )

  useEffect(() => {
    let newUserInputs = { ...userInputs }
    newUserInputs.minVal = minVal
    setUserInputs(newUserInputs)
  }, [minVal] )

  useEffect(() => {
    let newUserInputs = { ...userInputs }
    newUserInputs.maxVal = maxVal
    setUserInputs(newUserInputs)
  }, [maxVal] )

  useEffect(() => {
    let newUserInputs = { ...userInputs }
    newUserInputs.anyTerms = anyTerms
    setUserInputs(newUserInputs)
  }, [anyTerms] )

  useEffect(() => {
    let newUserInputs = { ...userInputs }
    newUserInputs.searchQueries = [...searchQueries]
    setUserInputs(newUserInputs)
  }, [searchQueries] )

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
          <h6>Amount</h6>
            <h6>Minimum Value</h6>
            <input value={minVal} onChange={(e) => setMinVal(e.target.value)} />
            <h6>Maximum Value</h6>
            <input value={maxVal} onChange={(e) => setMaxVal(e.target.value)} />
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
              options={uniqueOptions(loadedData.map( (x) => x.strategy ))}
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
