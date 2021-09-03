import React from 'react';
import { useState } from 'react';
import classes from './InputField.module.css'

const InputField = (props) => {




    const initialState = {
        inputValue : ""
    }

    const [inputState,setInputState] = useState(initialState); 

    const changeHandler = (event) => {
        setInputState(
            {...inputState ,
            inputValue : event.target.value}
        )
        props.updateDate(event.target.value , props.parameter);
    }

    return (
        <div className={classes.outerBox}>
            <label>{props.lebelValue} : </label>
            <input type={props.type} onChange={changeHandler} ></input>
        </div>
        )

}

export default InputField;