import React, { useState } from 'react';
import classes from './Login.module.css';
import InputField from './InputField';
import {connect } from 'react-redux';
import {sagaLoginRequest} from '../../store/actions/LogginActions';

const Login = (props) => {

    const [loginData, setloginData] = useState({
        email: "",
        password: ""
    });

    const parentSignUpData = (childData, parameter) => {

        switch (parameter) {
            case "email": {
                setloginData({
                    ...loginData,
                    email: childData
                })
                break;
            }
            case "password": {
                setloginData({
                    ...loginData,
                    password: childData
                })
                break;
            }
            default : {
                break;
            }
        }
        //console.log(loginData);
    }


    const onSubmitHandler = (event) => {
        event.preventDefault();
        props.sagaLoginRequest(loginData);
    }



    const changePageHandler = (event) => {
        console.log(props.printIt)
        props.pageChanged(event.target.textContent);
    }

    return (
        <div className={classes.outerCounter}>
            <h1>LOG IN</h1>
            <form className={classes.form}>
                <InputField lebelValue="Email Id" type="email" updateDate={parentSignUpData} parameter="email" />
                <InputField lebelValue="Password" type="password" updateDate={parentSignUpData} parameter="password" />
                <button type="submit" onClick={onSubmitHandler} >SUBMIT</button>
                <div className={classes.insideDiv}>
                    <h2 onClick={changePageHandler}>SignUp</h2>
                </div>            
            </form>

        </div>
    )
}

const mapStateToProps = (state , ownProps) => {
    return {
        ...ownProps,
        printIt : state
    }
}

const mapDispatchWithProps = (dispatch) => {
    return {
        sagaLoginRequest : (data) => dispatch(sagaLoginRequest(data))
    }
}

export default connect(mapStateToProps , mapDispatchWithProps)(Login);