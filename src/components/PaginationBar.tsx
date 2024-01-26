import React, { useEffect } from 'react';
import './App.css';

function PaginationBar({ filteredResults, pageStart, setPageStart, pageEnd, setPageEnd }) {

const resultsMax = 10;

    useEffect(() => {
        setPageStart(0)
        setPageEnd(filteredResults.length > resultsMax ? resultsMax : filteredResults.length)
    }, [filteredResults] )
    // handles click of previous button for pagination

    function paginatePrev() {
        if (pageStart > 0) {
            if (pageStart - resultsMax > 0) {
                setPageEnd(pageStart)
                setPageStart(pageStart - resultsMax)
            } else {
                setPageStart(0)
                setPageEnd(resultsMax)
            }
        }
    }

    // handles click of previous button for pagination

    function paginateNext() {
        if (pageEnd < filteredResults.length) {
            setPageStart(pageStart+resultsMax)
            pageEnd + resultsMax < filteredResults.length ? setPageEnd(pageEnd+resultsMax) : setPageEnd(filteredResults.length)
        }
    }

  return (
    <>
        <div className="db__results-pagination">
        <button onClick={paginatePrev}>previous</button>
        <span> Results {pageStart + 1} to {pageEnd} of {filteredResults.length} </span>
        <button onClick={paginateNext}>next</button>
        </div>
    </>
  );
        
}

export default PaginationBar;