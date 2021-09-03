import React from 'react';

const OrderButton = ({ el }) => {
    return (
        <>
            <option value={el}>{el}</option>
        </>
    );
}

export default OrderButton;