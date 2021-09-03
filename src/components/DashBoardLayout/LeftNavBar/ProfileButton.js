// import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import classes from './ProfileButton.module.css';
import { Avatar } from '@material-ui/core';

const ProfileButton = (Props) => {

    return (
        <div className={classes.container}>
          <Avatar alt={Props.value} src="#"/>
          <div className={classes.userName}>{Props.value}</div>    
        </div>
    ) 
}

export default ProfileButton;