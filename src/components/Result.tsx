import React from 'react';
import './App.css';
import { IconClasses, Months } from '../helpers/enums';
import { GrantRecord } from '../helpers/types';

function Result({ individualGrant }:{ individualGrant:GrantRecord }) {

  const options = {  maximumFractionDigits: 2  }   
  const numformat = Intl.NumberFormat("en-US",options).format

  function dateString(individualGrant:GrantRecord) {
    return `${Months[individualGrant.month - 1]} ${individualGrant.year}`
  }

  function matchedCriteria(individualGrant:GrantRecord) {
    let displayedTags = []

    displayedTags.push({ name: 'Location', text: individualGrant.orgCity + ', ' + individualGrant.orgState, icon: IconClasses.iconLocation })
    displayedTags.push({ name: 'Grant Type', text: individualGrant.grantType, icon: IconClasses.iconGrantType }) 
    displayedTags.push({ name: 'Funding Type', text: individualGrant.fundingType, icon: IconClasses.iconFundingType }) 
    displayedTags.push({ name: 'Program Area', text: individualGrant.programArea, icon: IconClasses.iconProgramArea }) 
    displayedTags.push({ name: 'Strategy', text: individualGrant.strategy, icon: IconClasses.iconStrategy }) 
    displayedTags.push({ name: 'Strategy', text: individualGrant.strategy2, icon: IconClasses.iconStrategy }) 
    displayedTags.push({ name: 'Donor', text: individualGrant.donor, icon: IconClasses.iconDonor }) 

    displayedTags = displayedTags.filter( (x) => x.text.trim().length )

    return (
      <div className="db__grant-info-tags"> 
        {displayedTags.map( (x, y) => (
          <div className="db__grant-info-tag" key={y}>
            <div className="db__grant-info-tag-icon" title={x.name}><i className={x.icon}></i></div>
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
        {matchedCriteria(individualGrant)}
      </div>

      <div className="db__grant-date">
        {dateString(individualGrant)}
      </div>
    </article>
  );
}

export default Result;