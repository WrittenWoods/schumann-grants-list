import React, { useState } from 'react';
import './App.css';
import CheckDrop from './CheckDrop';
import { Inputs, ProcessedData } from '../helpers/types';

const ProgramAreaMenu = (
  {userInputs, loadedData, setProgramAreas}:
  {userInputs:Inputs, loadedData:ProcessedData, setProgramAreas:(areas:Array<string>) => void}
) => {
    const [openProgramArea, setOpenProgramArea] = useState(false)
    
  return (
    <div className="db__ProgramAreaMenu">
      <div className="db__search-field-head">
      <h5>Program Area</h5>
      <button onClick={e => setOpenProgramArea(!openProgramArea)}>{ openProgramArea ? "-" : "+" }</button>
      </div>
      { 
        openProgramArea ? 
        <>
        <div className="db__search-field-sub-section">
            <div className="db__search-field-sub-header"><h6>Current (2022 - present)</h6></div>
                <CheckDrop 
                    fieldName={""}
                    results={userInputs.programAreas}
                    setMethod={setProgramAreas}
                    options={loadedData.uniqueOptions?.programArea.filter((x) => x.finalYear >= 2022).map( (x) => x.name )}

                />
            <div className="db__search-field-sub-header"><h6>Historic (1979 - 2021)</h6></div>
                <CheckDrop 
                    fieldName={""}
                    results={userInputs.programAreas}
                    setMethod={setProgramAreas}
                    options={loadedData.uniqueOptions?.programArea.filter((x) => x.finalYear < 2022).map( (x) => x.name )}
                />
                </div>
            </>
        : <></>
      }
    </div>  
  );
}

export default ProgramAreaMenu;