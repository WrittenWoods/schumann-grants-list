import React, { useEffect } from 'react';
import './App.css';
import { uniqueOptions } from '../helpers/uniqueOptions';
import { GrantRecord } from '../helpers/types';

function PaginationBar(
    { filteredResults, currPageStart, setCurrPageStart, currPageEnd, setCurrPageEnd }:
    { 
        filteredResults:Array<GrantRecord>, 
        currPageStart:number, 
        setCurrPageStart:(page:number) => void, 
        currPageEnd:number, 
        setCurrPageEnd:(page:number) => void
    }
) {
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

    function handlePaginationButton(buttonPageStart:number) {
        if (buttonPageStart !== "...") {
            setCurrPageStart(buttonPageStart)
            setCurrPageEnd(buttonPageStart + resultsMax <= filteredResults.length ? buttonPageStart + resultsMax : filteredResults.length)
        }
    }

    function renderPageButton(x:string, y:number, pageStart:number) {
        if (x === "...") {
            return (
                <button 
                    key={y}
                    className={"db__pagination-spacer"}
                    >
                ...
                </button>
            )
        } else {
            return (
                <button 
                    key={y}
                    onClick={() => handlePaginationButton(Number(x))}
                    className={Number(x) === pageStart ? "db__pagination-button db__pagination-current" : "db__pagination-button"}
                    >
                    {Math.floor(Number(x)/resultsMax) + 1}
                </button>
            )
        }
    }

    function renderPaginationButtons(pageStart:number) {
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
            return (renderPageButton(x, y, pageStart))
        })
    }

  return (
    <>
        <div className="db__results-pagination">
            {currPageStart !== 0 && 
            <div className="db__pagination-previous" >
                <button onClick={paginatePrev}>previous</button>
            </div>}

            <div className='db__pagination-pages'>
                {renderPaginationButtons(currPageStart)}
            </div>

            {currPageEnd !== filteredResults.length && 
            <div className="db__pagination-next">
                <button onClick={paginateNext}>next</button>
            </div>}
        </div>
    </>
  );
        
}

export default PaginationBar;