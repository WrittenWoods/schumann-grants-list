import React from 'react';
import './App.css';
import ColumnHead from './ColumnHead';
import { SortableColumns } from '../helpers/enums';

function Nav({ sortedColumn, setSortedColumn }:{ sortedColumn:string, setSortedColumn:(columns:string, reversed:boolean) => void }) {

    return (
        <>
            <ColumnHead 
                name={SortableColumns.Amount} 
                isSorted={sortedColumn == SortableColumns.Amount}
                setSortedColumn={setSortedColumn}
            /> 
            <ColumnHead 
                name={SortableColumns.Result} 
                isSorted={sortedColumn == SortableColumns.Result}
                setSortedColumn={setSortedColumn}
            />
            <ColumnHead 
                name={SortableColumns.ApprovalDate} 
                isSorted={sortedColumn == SortableColumns.ApprovalDate}
                setSortedColumn={setSortedColumn}
            />             
        </>
    );
}

export default Nav;
