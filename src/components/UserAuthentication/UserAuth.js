import React, {useState} from 'react';
import classes from './UserAuth.module.css';
import SignUp from './SignUp';
import Login from './Login';


const UserAuth = () => {

    
    const [currentPage , setCurrentPage] = useState({
        switchPage : "SignUp"
    }) 

    const doPageChangedHandler = (changedPage) => {
        setCurrentPage({
            ...currentPage,
            switchPage : changedPage
        })
    
    // console.log(currentPage);
    }





    return (
        
        currentPage.switchPage === "SignUp" ? 
           <div className={classes.backgroundDesign}>
            <SignUp pageChanged={doPageChangedHandler}/>  
        </div> 
        :
        <div className={classes.backgroundDesign}>
            <Login pageChanged={doPageChangedHandler}/>   
        </div> 
    )
}

export default UserAuth;