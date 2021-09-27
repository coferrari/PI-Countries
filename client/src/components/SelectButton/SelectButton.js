import React from 'react';
import style from "./SelectButton.module.css";

const OrderButton = ({ el }) => {
    return (
        <>
            <option className={style.option} value={el}>{el}</option>
        </>
    );
}

export default OrderButton;

