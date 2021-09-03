import React, { useState } from 'react';
import classes from './SignUp.module.css';
import InputField from './InputField';
const axios = require('axios');


const registerRequestHandler = async (registeringUserData , responseOperation) => {
     
    const headers = new Headers();
    headers.append('content-type' , 'application/json');
    headers.append('Accept', 'text/plain;charset=UTF-8');
    await axios({
        method : 'post',
        url : 'http://localhost:8080/register',
        data : registeringUserData ,
        headers : headers
    })
        .then((response) => {
           responseOperation(response.data); 
        })
        .catch((err) => {
            responseOperation(err.data);
           });


}


const SignUp = (props) => {

    const [signUpData, setSignUpData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const [errorMessage , setErrorMessage] = useState({
        firstName : "",
        lastName : "",
        email : "",
        password : "length = 8 to 15 characters,contain at least one lowercase,one uppercase,one numeric digit,and one special character"
    })

    const responseOperation = (data) => {
        
        if(data === "user successfully registered") {
            props.pageChanged('Login');
        }
        else {
            setErrorMessage({
                ...errorMessage,
                email : "Already existing email id"
            }) 
        }
    }
    
    
    
    const parentSignUpData = (childData, parameter) => {

        switch (parameter) {
            case "firstName": {
                setSignUpData({
                    ...signUpData,
                    firstName: childData
                })
                break;
            }
            case "lastName": {
                setSignUpData({
                    ...signUpData,
                    lastName: childData
                })
                break;
            }
            case "email": {
                setSignUpData({
                    ...signUpData,
                    email: childData
                })
                break;
            }
            case "password": {
                setSignUpData({
                    ...signUpData,
                    password: childData
                })
                break;
            }
            default : {
                break;
            }
        }
        // console.log(signUpData);
    }


    //on clicking submit button 
    const onSubmitHandler = (event) => {
        event.preventDefault();
        checkInputCorrectness();
    }

    //check if all the input values are correct
    const checkInputCorrectness = () => {
        const password = signUpData.password;
        if(password.length === 0) {
            setErrorMessage(
                {
                    ...errorMessage,
                    password:"length should be 8 to 15 characters,contain at least one lowercase,one uppercase,one numeric digit,and one special character"
                }
            )
            return;
        }
        let status = false;
        let passw=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        if(password.match(passw)) 
        { 
            setErrorMessage(
                {
                    ...errorMessage,
                    password:"Valid Password"
                }
            )
            status = true;
        }
        else
        { 
            setErrorMessage({
                ...errorMessage,
                password:"InValid Password" 
            }) 
            status = false;
        }

        if(status) {
        registerRequestHandler(signUpData ,responseOperation);
        }

    }

    // this function migrate us from signup to login page
    const changePageHandler = (event) => {
        // console.log(event.target.textContent);
        props.pageChanged(event.target.textContent);
    }


    return (
        
       <div className={classes.outerCounter}>
            <h1>SIGN UP</h1>
            <form className={classes.form}>
                <InputField lebelValue="First Name" type="text" updateDate={parentSignUpData} parameter="firstName" />
                <p>{errorMessage.firstName}</p>
                <InputField lebelValue="Last Name" type="text" updateDate={parentSignUpData} parameter="lastName" />
                <p>{errorMessage.lastName}</p>
                <InputField lebelValue="Email Id" type="email" updateDate={parentSignUpData} parameter="email" />
                <p>{errorMessage.email}</p>
                <InputField lebelValue="Password" type="password" updateDate={parentSignUpData} parameter="password" />
                <p>{errorMessage.password}</p>
                <button type="submit" onClick={onSubmitHandler} >SUBMIT</button>
                <div className={classes.insideDiv}>
                    <h2 onClick={changePageHandler}>Login</h2>
                    </div>            
            </form>

        </div>
    )
}



export default SignUp;