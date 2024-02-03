import React from 'react';
import './App.css';
import ColumnHead from './ColumnHead';
import { SortableColumns } from '../helpers/enums';

function Nav({ sortedColumn, setSortedColumn }:{ sortedColumn:string, setSortedColumn:(columns:string, reversed:boolean) => void }) {

    return (
        <>
            <ColumnHead 
                name={SortableColumns.Amount} 
                sortedColumn={sortedColumn}
                setSortedColumn={setSortedColumn}
            /> 
            <ColumnHead 
                name={SortableColumns.Result} 
                sortedColumn={sortedColumn}
                setSortedColumn={setSortedColumn}
            />
            <ColumnHead 
                name={SortableColumns.ApprovalDate} 
                sortedColumn={sortedColumn}
                setSortedColumn={setSortedColumn}
            />             
        </>
    );
}

export default Nav;
