import React, { useState } from 'react';

function Result({ individualGrant }) {

  return (
    <div className="Result">
        <span>{individualGrant.orgName}</span>
        <span>{individualGrant.amount}</span>
        <span>{individualGrant.donor}</span>
        <span>{individualGrant.fundingType}</span>
        <span>{individualGrant.grantType}</span>
    </div>
  );
}

export default Result;
