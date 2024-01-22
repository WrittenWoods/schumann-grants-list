import React, { useState } from 'react';
import './App.css';

function Result({ individualGrant, userInputs }) {

  console.log(individualGrant)

  function matchedCriteria(individualGrant, userInputs) {
    let matched = []
    let toMatch = [
      individualGrant.orgName, 
      individualGrant.description, 
      individualGrant.donor, 
      individualGrant.fundingType, 
      individualGrant.grantType, 
      individualGrant.orgCity, 
      individualGrant.programArea, 
      individualGrant.strategy
    ]

    if (userInputs.orgNames.includes(individualGrant.orgName)) { 
      matched.push({ icon: 'Grantee', text: individualGrant.orgName }) 
    }

    if (userInputs.orgCities.includes(individualGrant.orgCity)) { 
      matched.push({ icon: 'City', text: individualGrant.orgCity }) 
    }

    if (userInputs.orgStates.includes(individualGrant.orgState)) { 
      matched.push({ icon: 'State', text: individualGrant.orgState }) 
    }

    if (userInputs.grantTypes.includes(individualGrant.grantType)) { 
      matched.push({ icon: 'Grant Type', text: individualGrant.grantType }) 
    }

    if (userInputs.fundingTypes.includes(individualGrant.fundingType)) { 
      matched.push({ icon: 'Funding Type', text: individualGrant.fundingType }) 
    }

    if (userInputs.programAreas.includes(individualGrant.programArea)) { 
      matched.push({ icon: 'Program Area', text: individualGrant.programArea }) 
    }

    if (userInputs.strategies.includes(individualGrant.strategy)) { 
      matched.push({ icon: 'Strategy', text: individualGrant.strategy }) 
    }

    if (userInputs.donors.includes(individualGrant.donor)) { 
      matched.push({ icon: 'Donor', text: individualGrant.donor }) 
    }

    for (let i = 0; i < userInputs.searchQueries.length; i++) {
      if (toMatch.some( (s) => s.toLowerCase().includes(userInputs.searchQueries[i].toLowerCase()) )) {
        matched.push({ icon: 'Keyword', text: userInputs.searchQueries[i] })
      }
    }

    return (
      <div className="db__grant-info-tags">
        {matched.map( (x, y) => (
          <div className="db__grant-info-tag" key={y}>
            <span className="db__grant-info-tag-icon">{x.icon + ": "}</span>
            <span className="db__grant-info-tag-text">{x.text}</span>
          </div>
        ))}
      </div>
    )
    
  }

  return (
    <article className="db__grant">
      <div className='db__grant-amount'>
        {"$" + individualGrant.amount}
      </div>

      <div className="db__grant-info">
        <h4>{individualGrant.orgName}</h4>
        <p>{individualGrant.description}</p>
        {matchedCriteria(individualGrant, userInputs)}
      </div>

      <div className="db__grant-date">
        {individualGrant.month + " / " + individualGrant.year}
      </div>
    </article>
  );
}

export default Result;