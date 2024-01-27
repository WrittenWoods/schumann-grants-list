import React, { useEffect } from 'react';
import './App.css';
import { uniqueOptions } from '../helpers/uniqueOptions';

function PaginationBar({ filteredResults, currPageStart, setCurrPageStart, currPageEnd, setCurrPageEnd }) {

const resultsMax = 10;

    useEffect(() => {
        setCurrPageStart(0)
        setCurrPageEnd(filteredResults.length > resultsMax ? resultsMax : filteredResults.length)
    }, [filteredResults] )

    // handles click of previous button for pagination

    function paginatePrev() {
        if (currPageStart > 0) {
            if (currPageStart - resultsMax > 0) {
                setCurrPageEnd(currPageStart)
                setCurrPageStart(currPageStart - resultsMax)
            } else {
                setCurrPageStart(0)
                setCurrPageEnd(resultsMax)
            }
        }
    }

    // handles click of previous button for pagination

    function paginateNext() {
        if (currPageEnd < filteredResults.length) {
            setCurrPageStart(currPageStart+resultsMax)
            currPageEnd + resultsMax < filteredResults.length ? setCurrPageEnd(currPageEnd+resultsMax) : setCurrPageEnd(filteredResults.length)
        }
    }

    function handlePaginationButton(buttonPageStart) {
        if (buttonPageStart !== "...") {
            setCurrPageStart(buttonPageStart)
            setCurrPageEnd(buttonPageStart + resultsMax <= filteredResults.length ? buttonPageStart + resultsMax : filteredResults.length)
        }
    }

    function renderPaginationButtons(pageStart) {
        let result = []
        let resultsCount = 0
        result.push("0")
        if (pageStart > resultsMax * 3) { result.push("...") }
        while (resultsCount <= pageStart + resultsMax * 2 && resultsCount < filteredResults.length) {

            if (resultsCount < pageStart && (resultsCount + resultsMax * 2) >= pageStart) {
                result.push(resultsCount.toString())
            }
            if (resultsCount === pageStart) {
                result.push(resultsCount.toString())
            }
            if (resultsCount > pageStart && (resultsCount - resultsMax * 2) <= pageStart) {
                result.push(resultsCount.toString())
            }
            
            resultsCount += resultsMax
        }
        if ((pageStart + resultsMax * 3) < filteredResults.length) { result.push("...") }
        result.push((Math.floor(filteredResults.length / resultsMax) * resultsMax).toString())

        result = uniqueOptions(result, "...")

        return result.map( (x, y) => {
            return (
                <button 
                    key={y}
                    onClick={() => handlePaginationButton(Number(x))}
                    className={x === pageStart ? "db__pagination-button db__pagination-current" : "db__pagination-button"}
                >
                    {x === "..." ? "..." : Math.floor(Number(x)/resultsMax) + 1}
                </button>
            ) 
        })
    }

  return (
    <>
        <div className="db__results-pagination">
            <div className="db__pagination-previous" >
                <button onClick={paginatePrev}>previous</button>
            </div>

            <div className='db__pagination-pages'>
                {renderPaginationButtons(currPageStart)}
            </div>

            <div className="db__pagination-next">
                <button onClick={paginateNext}>next</button>
            </div>
        </div>
    </>
  );
        
}

export default PaginationBar;