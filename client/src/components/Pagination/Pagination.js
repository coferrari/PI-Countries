import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCountries, filterRegion } from '../../actions/'

const Pagination = () => {

    const totalCountries = useSelector(state => state.countCountries);

    const totalPages = []
    
    for (let i = 1; i < Math.ceil(totalCountries/10)+1; i++) {
        totalPages.push(i)
    }

    const dispatch = useDispatch();
    
    return (
        <>
            <div style={{ display: "flex" }}>
                {totalPages && totalPages.map(page => 
                <button key={page} onClick={()=> dispatch(filterRegion('Europe', page-1))}>{page}</button>
                )}
            </div>
            <br/><br/>
        </>
    );
}

export default Pagination;
{/* <button key={page} onClick={()=> dispatch(getCountries(page))}>{page}</button> */}