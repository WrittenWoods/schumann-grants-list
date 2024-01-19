import React, { useState, useEffect } from 'react';
import ColumnHead from './ColumnHead';

function TableHead({ filteredResults, setFilteredResults }) {

    function nameCompare(a, b) {
        return a.orgName.localeCompare(b.orgName)
    }

    function dateCompare(a, b) {
        let yearCompare = Math.sign(a.year - b.year)
        return yearCompare === 0 ? Math.sign(a.month - b.month) : yearCompare
    }
    
    function locationCompare(a, b) {
        let stateCompare = a.orgState.localeCompare(b.orgState)
        return stateCompare === 0 ? a.orgCity.localeCompare(b.orgCity) : stateCompare
    }

    function amountCompare(a, b) {
        return Math.sign(a.amount - b.amount)
    }

    function donorCompare(a, b) {
        return a.donor.localeCompare(b.donor)
    }

    function fundingTypeCompare(a, b) {
        return a.fundingType.localeCompare(b.fundingType)
    }

    function grantTypeCompare(a, b) {
        return a.grantType.localeCompare(b.grantType)
    }

    function strategyCompare(a, b) {
        return a.strategy.localeCompare(b.strategy)
    }

    return (
    <thead>
        <tr className="Result">
            <ColumnHead 
                name={"Grantee"} 
                filteredResults={filteredResults} 
                setFilteredResults={setFilteredResults}
                sortFunction={nameCompare} 
            />
            <ColumnHead 
                name={"Date"} 
                filteredResults={filteredResults} 
                setFilteredResults={setFilteredResults}
                sortFunction={dateCompare} 
            />
            <ColumnHead 
                name={"Location"} 
                filteredResults={filteredResults} 
                setFilteredResults={setFilteredResults}
                sortFunction={locationCompare} 
            />            
            <ColumnHead 
                name={"Amount"} 
                filteredResults={filteredResults} 
                setFilteredResults={setFilteredResults}
                sortFunction={amountCompare} 
            />             
            <ColumnHead 
                name={"Donor"} 
                filteredResults={filteredResults} 
                setFilteredResults={setFilteredResults}
                sortFunction={donorCompare} 
            /> 
            <ColumnHead 
                name={"Funding Type"} 
                filteredResults={filteredResults} 
                setFilteredResults={setFilteredResults}
                sortFunction={fundingTypeCompare} 
            />             
            <ColumnHead 
                name={"Grant Type"} 
                filteredResults={filteredResults} 
                setFilteredResults={setFilteredResults}
                sortFunction={grantTypeCompare} 
            />     
            <ColumnHead 
                name={"Strategy"} 
                filteredResults={filteredResults} 
                setFilteredResults={setFilteredResults}
                sortFunction={strategyCompare} 
            />     
        </tr>
    </thead>
    );
}

export default TableHead;
