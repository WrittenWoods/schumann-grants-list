import React, { useState } from 'react';

function Result({ individualGrant }) {

// const infotags = [
// {individualGrant.donor},
// {individualGrant.fundingType},
// {individualGrant.grantType},
// {individualGrant.strategy}
//   ];








  return (
    // <tr className="Result">
    //     <td>{individualGrant.orgName}</td>
    //     <td>{individualGrant.month + " / " + individualGrant.year}</td>
    //     <td>{individualGrant.orgCity + ", " + individualGrant.orgState}</td>
    //     <td>{"$" + individualGrant.amount}</td>
    //     <td>{individualGrant.donor}</td>
    //     <td>{individualGrant.fundingType}</td>
    //     <td>{individualGrant.grantType}</td>
    //     <td>{individualGrant.strategy}</td>
    // </tr>



    <article class="db__grant" id="[GRANT ID]">
        <div class="db__grant-amount">
          {"$" + individualGrant.amount}
        </div>
        <div class="db__grant-info">
          <h4>{individualGrant.orgName}</h4>
          <p>{individualGrant.description}</p>

          <div class="db__grant-info-tags">



{/*
            <div class="db__grant-info-tag">
              <span class="db__grant-info-tag-icon">[TAG ICON]</span>
              <span class="db__grant-info-tag-text">[TAG TEXT]</span>
            </div>
*/}

        


       
        
        


          </div>
        </div>
        <div class="db__grant-date">
          {individualGrant.month + " / " + individualGrant.year}
        </div>
    </article>



    
     





  );
}

export default Result;
