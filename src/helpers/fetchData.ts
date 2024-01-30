
import React, { useEffect } from 'react';


const API_KEY = 'AIzaSyDPuYhvWkWAeY0PzYcACoH9IKZbQnxDayU';
const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
let gapiInited = false;


async function waitForGapiInitialized(maxAttempts, interval)
{
   let attempts = 0;
   let loadedjson = {};
   console.log(" waiting for gapi...");
   function check()
   {
   	   attempts++;
   	   if( gapiInited)
   	   {
           console.log( "gapi initialized");
           loadedjson = buildJSON();
   	   }
   	   else if (attempts < maxAttempts)
       {
           setTimeout(check, interval);
       }
       else
       {
       	   console.error(" gapi not intiialzied after maximum attempts");
       }
   }
   
   if (gapiInited)
   {
      return loadedjson;
   }
   else
   {
   	   check();
   }

}


export async function fetchData()  
{
    //useEffect(  () =>  {gapiLoaded(); }, [] );
   
     // need to wait until gapiInited = true
	 
    const fullJSON = waitForGapiInitialized(20, 250);  


    //const fullJSON = await buildJSON();
    return fullJSON;
}


       /**
       * Callback after api.js is loaded.
       */
      export function gapiLoaded() 
      {
      	//console.log(" gapi loading");
        gapi.load('client', initializeGapiClient);
      }

      /**
       * Callback after the API client is loaded. Loads the
       * discovery doc to initialize the API.
       */
      async function initializeGapiClient() 
      {
        await gapi.client.init({
          apiKey: API_KEY,
          discoveryDocs: [DISCOVERY_DOC],
        });
        gapiInited = true;
      }


      function processDateMonth( strdate)
      {
        const d = new Date(strdate+" 2020");
        return (d.getMonth()+1);

      }
      

      function processMoney( strmoney)
      {
        let noDollarsign = strmoney.replace("$", "");          
        let noCommas = noDollarsign.replaceAll(",", "");
           
        let noCents = noCommas;
        if (noCents.indexOf(".00") > -1)
        {
           noCents = noCents.substring(0, noCents.indexOf(".00")); 
        }
        return noCents;
      }


  const state_names = new Map([
             ["AL" ,"Alabama (AL)"], 
             ["AK", "Alaska (AK)"], 
             ["AZ", "Arizona (AZ)"], 
             ["AR", "Arkansas (AR)"],
             ["CA", "California (CA)"], ["CO", "Colorado (CO)"], ["CT", "Connecticut (CT)"], ["DE", "Delaware (DE)"],
             [ "FL", "Florida (FL)"], [ "GA", "Georgia (GA)"],["HI", "Hawaii (HI)"], ["ID", "Idaho (ID)"], 
             ["IL", "Illinois (IL)"],
            ["IN", "Indiana (IN)"], ["IA", "Iowa (IA)"],["KS", "Kansas (KS)"],["KY", "Kentucky (KY)"],["LA", "Louisiana (LA)"],
            [ "ME", "Maine (ME)"],["MD", "Maryland (MD)"],["MA", "Massachusetts (MA)"],["MI", "Michigan (MI)"],
            ["MN", "Minnesota (MN)"],["MS", "Mississippi (MS)"],["MO", "Missouri (MO)"],["MT", "Montana (MT)"],
            ["NE", "Nebraska (NE)"],["NV", "Nevada (NV)"],["NJ", "New Jersey (NJ)"],["NH", "New Hampshire (NH)"],
            ["NM", "New Mexico (NM)"],["NY", "New York (NY)"],["NC", "North Carolina (NC)"],["ND", "North Dakota (ND)"], 
            ["OH", "Ohio (OH)"],["OK", "Oklahoma (OK)"],["OR", "Oregon (OR)"],["PA", "Pennsylvania (PA)"],
            ["RI", "Rhode Island (RI)"],["SC", "South Carolina (SC)"],["SD", "South Dakota (SD)"],["TN", "Tennessee (TN)"],
            ["TX", "Texas (TX)"], ["UT","Utah (UT)"],["VT", "Vermont (VT)"],["VA", "Virginia (VA)"],["WA", "Washington (WA)"],
              ["WV", "West Virginia (WV)"],["WI", "Wisconsin (WI)"],["WY", "Wyoming (WY)"],["DC", "District of Columbia (DC)"] 
            ]);

     function process_states(strstate)
     { 
           let state = "Not Found";
           if(  state_names.has(strstate))
           {
               state = state_names.get(strstate);
           }
           return state;
     }

      const outputRowNames = ["orgName","orgCity","orgState","month","year",
                              "amount","grantType","description","programArea",
                              "fundingType","strategy","strategy2","donor"];
      

      const RowNamesOut = {
        orgName: 0,
        orgCity: 1,
        orgState: 2,
        month: 3,
        year: 4,
        amount: 5,
        grantType: 6,
        description: 7,
        programArea: 8,
        fundingType: 9,
        strategy: 10,
        strategy2: 11,
        donor: 12
      };

      function wrapDoubleQuotes(s)
      {
          return s.replace(/"/g, "\\\\\\\"");
      }

      function wrapNewlines(s)
      {
          return s.replace(/(?:\r\n|\r|\n)/g, "\\\\\\n");
      }

      function buildRowStructure( rowvalues)
      {
          const row_string = '{"' 
                 +outputRowNames[RowNamesOut.orgName]+'":"'+wrapDoubleQuotes(rowvalues[0])+'",'+
              '"'+outputRowNames[RowNamesOut.orgCity]+'":"'+rowvalues[1]+'",'+
              '"'+outputRowNames[RowNamesOut.orgState]+'":"'+process_states(rowvalues[2])+'",'+
              '"'+outputRowNames[RowNamesOut.month]+'":'+processDateMonth(rowvalues[3])+','+
              '"'+outputRowNames[RowNamesOut.year]+'":'+rowvalues[4]+','+
              '"'+outputRowNames[RowNamesOut.amount]+'":'+processMoney(rowvalues[5])+','+
              '"'+outputRowNames[RowNamesOut.grantType]+'":"'+rowvalues[6]+'",'+
              '"'+outputRowNames[RowNamesOut.description]+'":"'+
                          wrapNewlines(wrapDoubleQuotes(rowvalues[7]))+'",'+
              '"'+outputRowNames[RowNamesOut.programArea]+'":"'+rowvalues[8]+'",'+
              '"'+outputRowNames[RowNamesOut.fundingType]+'":"'+rowvalues[9]+'",'+
              '"'+outputRowNames[RowNamesOut.strategy]+'":"'+rowvalues[10]+'",'+
              '"'+outputRowNames[RowNamesOut.strategy2]+'":"'+rowvalues[11]+'",'+
              '"'+outputRowNames[RowNamesOut.donor]+'":"'+rowvalues[12]+'"'+
                         '}';
                                             
         return row_string;
      }

async function buildJSON()
      {
        let response;
        if( gapiInited) {console.log("gapi initialized")}  else { console.log("gapi not intiaizlized")}

        try 
        {
          response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '1gu6oYYLcPIBAiob7f-ShAwQn-VGIxlmD6qz5-k1RMX8',     
                 range: 'Sheet1',
          });
        } 
        catch (err) 
        {
          console.log(err);
          return;
        }
        const range = response.result;
        if (!range || !range.values || range.values.length == 0) 
        {
          console.log("no values found");
          return;
        }
              
        let all_lines = [];

        range.values.forEach(( vals, index) => 
           {
               if(index>0)
               {
                 all_lines.push( buildRowStructure(vals));
               }
           });

        const all_string = all_lines.join(",");
        const total_string = '[' + all_string + ']';

        console.log(total_string);
        const parsedJSON = JSON.parse(total_string);

        return parsedJSON;
      }



