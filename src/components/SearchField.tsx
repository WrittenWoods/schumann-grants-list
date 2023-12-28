import React, { useState, useEffect } from 'react';
import { SearchFields } from '../helpers/enums';
import Select, { StylesConfig } from 'react-select';
import CheckDrop from './CheckDrop';
import LocationMenu from './LocationMenu';

function SearchField( { fieldType, loadedData, userInputs, setUserInputs } ) {

  // State variables corresponding to user inputs
   
  const [minMonth, setMinMonth] = useState(userInputs.approvalDates.minMonth)
  const [maxMonth, setMaxMonth] = useState(userInputs.approvalDates.maxMonth)
  const [minYear, setMinYear] = useState(userInputs.approvalDates.minYear)
  const [maxYear, setMaxYear] = useState(userInputs.approvalDates.maxYear)
  const [minVal, setMinVal] = useState(userInputs.awardAmounts.minVal)
  const [maxVal, setMaxVal] = useState(userInputs.awardAmounts.maxVal)
  const [orgNames, setOrgNames] = useState([...userInputs.orgNames])
  const [orgCities, setOrgCities] = useState([...userInputs.orgCities])
  const [orgStates, setOrgStates] = useState([...userInputs.orgStates])
  const [grantTypes, setGrantTypes] = useState([...userInputs.grantTypes])
  const [fundingTypes, setFundingTypes] = useState([...userInputs.fundingTypes])
  const [programAreas, setProgramAreas] = useState([...userInputs.programAreas])
  const [strategies, setStrategies] = useState([...userInputs.strategies])
  const [donors, setDonors] = useState([...userInputs.donors])

  // Updates userInputs state whenever user interacts with the search UI

  useEffect(() => {
    setUserInputs({
      approvalDates: { minMonth: minMonth, maxMonth: maxMonth, minYear: minYear, maxYear: maxYear },
      awardAmounts: { minVal: minVal, maxVal: maxVal },
      orgNames: [...orgNames],
      orgCities: [...orgCities],
      orgStates: [...orgStates],
      grantTypes: [...grantTypes],
      fundingTypes: [...fundingTypes],
      programAreas: [...programAreas],
      strategies: [...strategies],
      donors: [...donors],
      keywords: { anyTerms: true, searchQueries: [] }
    })
    console.log(userInputs)
  }, [
    minMonth, 
    maxMonth,
    minYear,
    maxYear,
    minVal, 
    maxVal, 
    orgNames, 
    orgCities, 
    orgStates, 
    grantTypes, 
    fundingTypes, 
    programAreas, 
    strategies, 
    donors
  ])

  // uses the value of the fieldType props to render different parts of the search UI.

  function renderField(fieldType) {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    // Removes redundant options

    function uniqueOptions (arg) {
      let unique = []

      for (let i = 0; i < arg.length; i++) {
        if (!unique.includes(arg[i])) { unique.push(arg[i]) }
      }

      return unique
    }

    // Creates array of option elements corresponding to contents of an array

    function listOptions (arg) {

      let result = uniqueOptions(arg)

      return result.map ( (x, y) => (
        <option value={x} key={y}>{x}</option>
      ))
    }

    // Creates array of year option elements for approval date selector

    function yearOptions() {
      let result = []
      let currentYear = new Date().getFullYear()

      for (let i = 1900; i <= currentYear; i++) { result.push(i) }

      return result.map ( (x, y) => <option value={x} key={y} >{x}</option>)
    } 

    // Returns JSX for a search UI component depending on the fieldType props

    switch (fieldType) {

      case SearchFields.ApprovalDate:
        return (
          <div>
            <h3>Approval Date</h3>

            <span>Start</span>
            <select value={minMonth} onChange={(e) => setMinMonth(Number(e.target.value))} >{listOptions(months)}</select>
            <select value={minYear} onChange={(e) => setMinYear(Number(e.target.value))}  >{yearOptions()}</select>
            
            <span>End</span>
            <select value={maxMonth} onChange={(e) => setMinMonth(Number(e.target.value))} >{listOptions(months)}</select>
            <select value={maxYear} onChange={(e) => setMaxYear(Number(e.target.value))}  >{yearOptions()}</select>

          </div>
        )
        break;

      case SearchFields.Amount:
        return (
          <div>
            <h3>Minimum Value</h3>
            <input value={minVal} onChange={(e) => setMinVal(e.target.value)} />
            <h3>Maximum Value</h3>
            <input value={maxVal} onChange={(e) => setMaxVal(e.target.value)} />
          </div>
        )      
        break;  

      case SearchFields.Organization:
        return (
          <div>
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
          <div>
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
          <div>
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
          <div>
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
          <div>
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
          <div>
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
          <div>
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
          <div>
            <h3>Keyword Search</h3>
            <input />
          </div>
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
