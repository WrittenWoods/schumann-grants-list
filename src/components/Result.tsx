import React, { useState } from 'react';

function Result({ individualGrant }) {

  return (
    <tr className="Result">
        <td>{individualGrant.orgName}</td>
        <td>{individualGrant.month + " / " + individualGrant.year}</td>
        <td>{individualGrant.orgCity + ", " + individualGrant.orgState}</td>
        <td>{"$" + individualGrant.amount}</td>
        <td>{individualGrant.donor}</td>
        <td>{individualGrant.fundingType}</td>
        <td>{individualGrant.grantType}</td>
        <td>{individualGrant.strategy}</td>
    </tr>
  );
}

export default Result;
