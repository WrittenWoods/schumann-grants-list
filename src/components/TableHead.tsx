import React, { useState, useEffect } from 'react';
import ColumnHead from './ColumnHead';

function TableHead({ filteredResults, setFilteredResults }) {

    function stringCompare(a, b) {
        let compare = a.orgName.localeCompare(b.orgName)

        if (compare === 0) { compare = dateCompare(a,b) }
        if (compare === 0) { compare = amountCompare(a,b) }
        if (compare === 0) {
            let stateCompare = a.orgState.localeCompare(b.orgState)
            compare = stateCompare === 0 ? a.orgCity.localeCompare(b.orgCity) : stateCompare
        } 
        if (compare === 0) { compare = a.programArea.localeCompare(b.programArea) }
        if (compare === 0) { compare = a.fundingType.localeCompare(b.fundingType) }
        if (compare === 0) { compare = a.donor.localeCompare(b.donor) }
        if (compare === 0) { compare = a.grantType.localeCompare(b.grantType) }
        if (compare === 0) { compare = a.strategy.localeCompare(b.strategy) }

        return compare
    }

    function dateCompare(a, b) {
        let yearCompare = Math.sign(a.year - b.year)
        return yearCompare === 0 ? Math.sign(a.month - b.month) : yearCompare
    }

    function amountCompare(a, b) {
        return Math.sign(a.amount - b.amount)
    }

    return (
    <thead>
        <tr className="Result">
            <ColumnHead 
                name={"Grantee"} 
                filteredResults={filteredResults} 
                setFilteredResults={setFilteredResults}
                sortFunction={stringCompare} 
            />
            <ColumnHead 
                name={"Approval Date"} 
                filteredResults={filteredResults} 
                setFilteredResults={setFilteredResults}
                sortFunction={dateCompare} 
            />
            <td>Location</td> 
            <ColumnHead 
                name={"Amount"} 
                filteredResults={filteredResults} 
                setFilteredResults={setFilteredResults}
                sortFunction={amountCompare} 
            />             
            <td>Donor</td>
            <td>Funding Type</td>          
            <td>Grant Type</td>    
            <td>Strategy</td>     
        </tr>
    </thead>
    );
}

export default TableHead;
