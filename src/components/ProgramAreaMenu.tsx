import React, { useState, useEffect } from 'react';
import './App.css';
import CheckDrop from './CheckDrop';

const ProgramAreaMenu = ({userInputs, loadedData, setProgramAreas}) => {
    const [openProgramArea, setOpenProgramArea] = useState(false)
    
  return (
    <div className="db__ProgramAreaMenu">
      <div className="db__search-field-head">
      <h6>Program Area</h6>
      <button onClick={e => setOpenProgramArea(!openProgramArea)}>{ openProgramArea ? "-" : "+" }</button>
      </div>
      { 
        openProgramArea ? 
        <>
            <h6 className="db__search-field-sub-header">Current (2023 - present)</h6>
                <CheckDrop 
                    fieldName={""}
                    results={userInputs.programAreas}
                    setMethod={setProgramAreas}
                    options={loadedData.uniqueOptions?.programArea.filter(pa => pa.finalYear >= 2023).map((pa) => pa.name)}
                />
            <h6 className="db__search-field-sub-header">Historic (1979 - 2022)</h6>
                <CheckDrop 
                    fieldName={""}
                    results={userInputs.programAreas}
                    setMethod={setProgramAreas}
                    options={loadedData.uniqueOptions?.programArea.filter(pa => pa.finalYear < 2023).map((pa) => pa.name)}
                />
            </>
        : <></>
      }
    </div>  
  );
}

export default ProgramAreaMenu;