import React, { useState, useEffect } from 'react';
import './App.css';
import ColumnHead from './ColumnHead';
import { SortableColumns } from '../helpers/enums';

function Nav({ filteredResults, setFilteredResults }) {

    const [sortedColumn, setSortedColumn] = useState(SortableColumns.ApprovalDate)

    return (
        <>
            <ColumnHead 
                name={SortableColumns.Amount} 
                filteredResults={filteredResults} 
                setFilteredResults={setFilteredResults}
                sortedColumn={sortedColumn}
                setSortedColumn={setSortedColumn}
            /> 
            <ColumnHead 
                name={SortableColumns.Result} 
                filteredResults={filteredResults} 
                setFilteredResults={setFilteredResults}
                sortedColumn={sortedColumn}
                setSortedColumn={setSortedColumn}
            />
            <ColumnHead 
                name={SortableColumns.ApprovalDate} 
                filteredResults={filteredResults} 
                setFilteredResults={setFilteredResults}
                sortedColumn={sortedColumn}
                setSortedColumn={setSortedColumn}
            />             
        </>
    );
}

export default Nav;
