import React, { useState } from 'react';

function Result({ individualGrant }) {

  return (
    <article className="db__grant">
      <div className='db__grant-amount'>
        {"$" + individualGrant.amount}
      </div>

      <div className="db__grant-info">
        <h4>{individualGrant.orgName}</h4>
        <p>{individualGrant.description}</p>
        <div className="db__grant-info-tags">
          <div className="db__grant-info-tag">
            <span className="db__grant-info-tag-icon">[TAGICON]</span>
            <span className="db__grant-info-tag-text">[TAGTEXT]</span>
          </div>
        </div>
      </div>

      <div className="db__grant-date">
        {individualGrant.month + " / " + individualGrant.year}
      </div>
    </article>
  );
}

export default Result;
