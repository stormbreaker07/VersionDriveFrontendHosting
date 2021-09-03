import React from 'react';
import Button from './LeftNavbarButton';
import classes from './NavBar.module.css'
import Profile from './ProfileButton';
import { connect } from 'react-redux';


const NavBar = (props) => {


    const name = props.userFirstName + " " + props.userLastName;
    const currentName = name.charAt(0).toUpperCase() + name.slice(1);
    
    return (
        <div className={classes.navbar}>
            <Profile value={currentName} />
            <Button value="My Files" />
            <div className={classes.underLine}></div>
            <Button value="Shared Files" />
            <div className={classes.underLine}></div>
            <Button value="Storage Used" />
            <div className={classes.underLine}></div>

        </div>
    )
}

const mapStateToProps = (state , ownProps) => {
    return {
        ...ownProps,
        userFirstName : state.Auth.data.firstName,
        userLastName : state.Auth.data.lastName
    }

}


export default connect(mapStateToProps ,null)(NavBar);