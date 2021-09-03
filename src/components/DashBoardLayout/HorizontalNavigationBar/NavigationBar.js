import React, { Fragment } from 'react';
import classes from './NavigationBar.module.css';
import logo from '../../../logo/logo3.png';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import NotificationsActiveRoundedIcon from '@material-ui/icons/NotificationsActiveRounded';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {connect} from 'react-redux';
import {userLoggedOutAction} from '../../../store/actions/LogginActions';

const NavigationBar = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const logoutHandler = () => {
        handleClose();
        props.logout();
    }

    return (
        <Fragment>
            <div className={classes.topBar}>
                <div className={classes.logo}>
                    <a href="#news">
                        <img src={logo} alt="background will be uploaded shortly" />
                    </a>
                </div>
                <DashboardRoundedIcon href="#news" className={classes.LeftIconButton} />
                <InfoRoundedIcon href="#news" className={classes.LeftIconButton} />
                <div className={classes.ProfileOuterBox} >
                    <Button onClick={handleClick}>
                        <AccountCircleRoundedIcon href="#news" className={classes.RightProfileIconButton} />
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                    </Menu>
                </div>
                <NotificationsActiveRoundedIcon href="#news" className={classes.RightIconButton} />
            </div>
        </Fragment>
    )
}

const mapStateToProps = (state ,ownProps) => {
    return {
        ...ownProps
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout : () => dispatch(userLoggedOutAction())
    }
} 


export default connect(mapStateToProps , mapDispatchToProps)(NavigationBar);




