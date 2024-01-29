import React, { useState } from 'react';
import './App.css';
import { IconClasses, Months } from '../helpers/enums';

function CriteriaBlock({iconClass, label, removeCritera}:{iconClass:string, label:string, removeCritera?:Function}) {
  return (
    <div className="db__grant-info-tag">
      <div className="db__grant-info-tag-icon"><i className={iconClass}></i></div>
      <div className="db__grant-info-tag-text">{label}</div>
      { removeCritera && <button className="db__grant-info-remove" alt="Remove Filter" onClick={() => removeCritera(label) }><i className="fa-solid fa-xmark"></i></button> }
    </div>
  )
}
function Criteria({userInputs, setUserInputs, defaults }:{userInputs:any, setUserInputs:Function, defaults:any}) {

  const options = {  maximumFractionDigits: 2  }   
  const numformat = Intl.NumberFormat("en-US",options).format

  function listCriteria() {

    const result = []

    
    if ( userInputs.minVal && userInputs.minVal != defaults.minVal ) {
      result.push(
        <CriteriaBlock 
          key={0} 
          iconClass={IconClasses.iconAmount} 
          label={`${'Min: $' + numformat(Number(userInputs.minVal))}`} 
          removeCritera={() => setUserInputs({ ...userInputs, minVal: defaults.minVal })}
        />
      )
    }
    
    if ( userInputs.maxVal && userInputs.maxVal != defaults.maxVal ) {
      result.push(
        <CriteriaBlock 
          key={1} 
          iconClass={IconClasses.iconAmount} 
          label={`${'Max: $' + numformat(Number(userInputs.maxVal))}`} 
          removeCritera={() => setUserInputs({ ...userInputs, maxVal: defaults.maxVal })}
        />
      )
    }

    if ( userInputs.minMonth !== defaults.minMonth || userInputs.minYear !== defaults.minYear ) {
      result.push(
        <CriteriaBlock 
          key={1}  
          iconClass={IconClasses.iconDate} 
          label={`Start: ${Months[userInputs.minMonth - 1]} ${userInputs.minYear}`} 
          removeCritera={() => setUserInputs({ ...userInputs, minMonth: defaults.minMonth, minYear: defaults.minYear })}
        />
      )
    }

    if ( userInputs.maxMonth !== defaults.maxMonth || userInputs.maxYear !== defaults.maxYear ) {
      result.push(
        <CriteriaBlock 
          key={1}  
          iconClass={IconClasses.iconDate} 
          label={`End: ${Months[userInputs.maxMonth - 1]} ${userInputs.maxYear}`} 
          removeCritera={() => setUserInputs({ ...userInputs, maxMonth: defaults.maxMonth, maxYear: defaults.maxYear })}
        />
      )
    }
    function sublist(icon, inputArray, remove?:Function) {
      for (let i = 0; i < inputArray.length; i++) {
        result.push(
          <CriteriaBlock 
            key={`${icon}-${i+2}`} 
            iconClass={icon} 
            label={inputArray[i]}
            removeCritera={remove}
          />
        )
      }
    }

    function removeItem(items:Array<string>, toRemove:string):Array<string> {   
      if (items.includes(toRemove)) {
        let index = items.indexOf(toRemove)
        let newItems = [...items]
        newItems.splice(index, 1)
        return newItems
      } else {
        return items
      }
    }

    sublist(IconClasses.iconOrg, userInputs.orgNames, (name:string) => setUserInputs({ ...userInputs, orgNames: removeItem(userInputs.orgNames, name)}))
    sublist(IconClasses.iconLocation, userInputs.orgCities, (name:string) => setUserInputs({ ...userInputs, orgCities: removeItem(userInputs.orgCities, name)}))
    sublist(IconClasses.iconLocation, userInputs.orgStates, (name:string) => setUserInputs({ ...userInputs, orgStates: removeItem(userInputs.orgStates, name)}))
    sublist(IconClasses.iconGrantType, userInputs.grantTypes, (name:string) => setUserInputs({ ...userInputs, grantTypes: removeItem(userInputs.grantTypes, name)}))
    sublist(IconClasses.iconFundingType, userInputs.fundingTypes, (name:string) => setUserInputs({ ...userInputs, fundingTypes: removeItem(userInputs.fundingTypes, name)}))
    sublist(IconClasses.iconProgramArea, userInputs.programAreas, (name:string) => setUserInputs({ ...userInputs, programAreas: removeItem(userInputs.programAreas, name)}))
    sublist(IconClasses.iconStrategy, userInputs.strategies, (name:string) => setUserInputs({ ...userInputs, strategies: removeItem(userInputs.strategies, name)}))
    sublist(IconClasses.iconDonor, userInputs.donors, (name:string) => setUserInputs({ ...userInputs, donors: removeItem(userInputs.donors, name)}))
    sublist(IconClasses.iconKeyword, userInputs.searchQueries, (name:string) => setUserInputs({ ...userInputs, searchQueries: removeItem(userInputs.searchQueries, name)}))

    return result
  }

  const criteria = listCriteria();
  return (
    <div className="db__summary_filters">      
      <h4>Filters Applied</h4>
      <div className="db__grant-info-tags">   
        { criteria?.length > 0 ?    
          <>
            <button className="db__clear-filters" onClick={() => setUserInputs(defaults)}><span>Clear All Filters</span><i className="fa-solid fa-xmark"></i></button>
            {listCriteria()}
          </>
          : 
          <>
          <div className="db__nofilters">
          No filters currently selected
          </div>
          </>
        } 
      </div>
    </div>
  );
}

export default Criteria;
