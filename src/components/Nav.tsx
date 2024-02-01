import React from 'react';
import './App.css';
import ColumnHead from './ColumnHead';
import { SortableColumns } from '../helpers/enums';
import { Column } from '../helpers/types';

function Nav({ sortedColumn, setSortedColumn }:{ sortedColumn:Column, setSortedColumn:(col:Column) => void }) {

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
