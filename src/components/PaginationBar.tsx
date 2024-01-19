import React, { useEffect } from 'react';

function PaginationBar({ filteredResults, pageStart, setPageStart, pageEnd, setPageEnd }) {

    useEffect(() => {
        setPageStart(0)
        setPageEnd(filteredResults.length > 10 ? 10 : filteredResults.length)
    }, [filteredResults] )
    // handles click of previous button for pagination

    function paginatePrev() {
        if (pageStart > 0) {
            if (pageStart - 10 > 0) {
                setPageEnd(pageStart)
                setPageStart(pageStart - 10)
            } else {
                setPageStart(0)
                setPageEnd(10)
            }
        }
    }

    // handles click of previous button for pagination

    function paginateNext() {
        if (pageEnd < filteredResults.length) {
            setPageStart(pageStart+10)
            pageEnd + 10 < filteredResults.length ? setPageEnd(pageEnd+10) : setPageEnd(filteredResults.length)
        }
    }

  return (
    <>
        <button onClick={paginatePrev}>previous</button>
        <span> Results {pageStart} to {pageEnd} of {filteredResults.length} </span>
        <button onClick={paginateNext}>next</button>
    </>
  );
        
}

export default PaginationBar;