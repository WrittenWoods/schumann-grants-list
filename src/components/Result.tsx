import React, { useState } from 'react';
import './App.css';
import '../helpers/generalOptions.ts';



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






    displayedTags.push({ name: 'Location', text: individualGrant.orgCity + ', ' + individualGrant.orgState, icon: iconLocation })
    displayedTags.push({ name: 'Grant Type', text: individualGrant.grantType, icon: iconGrantType }) 
    displayedTags.push({ name: 'Funding Type', text: individualGrant.fundingType, icon: iconFundingType }) 
    displayedTags.push({ name: 'Program Area', text: individualGrant.programArea, icon: iconProgramArea }) 
    displayedTags.push({ name: 'Strategy', text: individualGrant.strategy, icon: iconStrategy }) 
    displayedTags.push({ name: 'Donor', text: individualGrant.donor, icon: iconDonor }) 




    return (
      <div className="db__grant-info-tags">
        {displayedTags.map( (x, y, i) => (
          <div className="db__grant-info-tag" key={y}>
            <div className="db__grant-info-tag-icon" alt={x.name}><i class={x.icon}></i></div>
            <div className="db__grant-info-tag-text">{x.text}</div>
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