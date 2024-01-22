import React, { useState } from 'react';
import './App.css';

function Result({ individualGrant, userInputs }) {

  const options = {  maximumFractionDigits: 2  }   
  const numformat = Intl.NumberFormat("en-US",options).format

  function dateString(individualGrant) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return `${months[individualGrant.month - 1] + ` ` + individualGrant.year}`
  }

  console.log(individualGrant.month + ' ' + individualGrant.year)
  console.log(dateString(individualGrant))

  function matchedCriteria(individualGrant, userInputs) {
    let displayedTags = []
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

    displayedTags.push({ icon: 'City', text: individualGrant.orgCity }) 
    displayedTags.push({ icon: 'State', text: individualGrant.orgState }) 
    displayedTags.push({ icon: 'Grant Type', text: individualGrant.grantType }) 
    displayedTags.push({ icon: 'Funding Type', text: individualGrant.fundingType }) 
    displayedTags.push({ icon: 'Program Area', text: individualGrant.programArea }) 
    displayedTags.push({ icon: 'Strategy', text: individualGrant.strategy }) 
    displayedTags.push({ icon: 'Donor', text: individualGrant.donor }) 

    return (
      <div className="db__grant-info-tags">
        {displayedTags.map( (x, y) => (
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
        {"$" + numformat(individualGrant.amount)}
      </div>

      <div className="db__grant-info">
        <h4>{individualGrant.orgName}</h4>
        <p>{individualGrant.description}</p>
        {matchedCriteria(individualGrant, userInputs)}
      </div>

      <div className="db__grant-date">
        {dateString(individualGrant)}
      </div>
    </article>
  );
}

export default Result;