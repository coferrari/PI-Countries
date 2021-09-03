import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SearchBar from '../SearchBar/SearchBar';
import SelectButton from '../SelectButton/SelectButton';
import { filterRegion, getCountries, orderCountries } from '../../actions/';
import { useHistory, useParams } from 'react-router';

const ButtonBar = () => {

    let regions = ['All Continents', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
    let activities = ['All Activities', 'Summer', 'Fall', 'Winter', 'Spring'];
    let alphaOrder = ['A to Z', 'Z to A'];
    let popOrder = ['Population Up', 'Population Down'];

    const [state, setState] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const {order} = useParams();
    console.log(order)


    const handleChange = (event) => {
        event.preventDefault();
        setState(event.target.value);
        return history.push(`/order/${event.target.value}`)
    }

    console.log('estado', state)
    // const handleChange = (event) => {
    //     event.preventDefault();
    //     setState(event.target.value);
    // }
    
    useEffect(() => {
        if (state === 'All Continents') {
            let page = 0
            dispatch(getCountries(page))
        }
        if (state === 'Africa' || state === 'Americas' || state === 'Asia' || state === 'Europe' || state === 'Oceania') {
            dispatch(filterRegion(state.replace(/ /g, ""), 0))
        }
        if (state === 'A to Z' || state === 'Z to A' || state === 'Population Up'|| state === 'Population Down') {
            dispatch(orderCountries(state.replace(/ /g, "")))
        }
    }, [state])

    return (
        <>
            <div style={{ backgroundColor: "blue" }}>
                <SearchBar />
                <select onChange={e => handleChange(e)}>
                    {regions.map(el =>
                        <SelectButton el={el} key={el} />
                    )}
                </select>
                <select onChange={e => handleChange(e)}>
                    {alphaOrder.map(el =>
                        <SelectButton el={el} key={el} />
                    )}
                </select>
                <select onChange={e => handleChange(e)}>
                    {popOrder.map(el =>
                        <SelectButton el={el} key={el} />
                    )}
                </select>
                <select>
                    {activities.map(el =>
                        <SelectButton el={el} key={el} />)}
                </select>
            </div>
        </>
    );
}

{/* <select>

{regions.map(region => 
    <option value={region}>{region}</option>
)}
</select> */}


export default ButtonBar;