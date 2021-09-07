import React from 'react';
import { useSelector } from 'react-redux';


const Activity = () => {

    const activities = useSelector(state => state.activities)

    console.log(activities)
    return (
        <>
        </>
    );
}
 
export default Activity;