import React from 'react';
import { useSelector } from 'react-redux';


const Activity = () => {

    const {loading, activities, allActivities} = useSelector(state => state);

    return (
        <>
        {activities}
        </>
    );
}
 
export default Activity;