import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import classes from './PreviewFileModal.module.css';
import { connect } from 'react-redux';
import { sagaFetchFileActionRequest } from '../../../store/actions/FetchMyFilesInfoAction';
import { sagaFetchSharedFileActionRequest } from '../../../store/actions/fetchSharedFileActions';

import ShareRoundedIcon from '@material-ui/icons/ShareRounded';
import SelectPermissionBar from './SelectPermissionBar';
import { verifyRecieversEmailService } from '../../../services/authServices/verifyRecieversEmailService';
import { fileSharingUtility } from '../../../utility/fileUtility/fileSharingutility';


function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 600,
        height: 500,
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));



function ShareFileModal(props) {


    const [disableShareButton , setDisableShareButton] = React.useState({
        disabled : true
    })


    const [sharingInfo , setSharingInfo] = React.useState( {
        email : '',
        permission : '',
        fileId : props.fileInfo.file_id,
        ownerId : props.userId,
    });

    const [emailStatus , setEmailStatus] = React.useState({status : ''})

    //console.log(sharingInfo)

 const getPermissionType = (data) => {
    setSharingInfo({
        ...sharingInfo,
        permission : data
    }); 
 }



    const classe = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setSharingInfo({
            email : '',
            permission : '',
            fileId : props.fileInfo.file_id,
            ownerId : props.userId,
        })
        setEmailStatus({
            status : ''
        })

        setOpen(false);
        
    };



    
    const onSubmitHandler = () => {
        //console.log("path")
        fileSharingUtility(sharingInfo , getFileSharingServiceResponse);
        handleClose();
    }

    const getFileSharingServiceResponse = (response) => {
        if(response === "Success") {
            alert("File Shared Successfully");
            props.loadMyFIles(props.userId);
            props.loadSharedFiles(props.userId);
        }
        else {
            alert("please try again !")
        }
    } 




    const getStatus = (status) =>{
      
        if(status.data === 'Verified') {
            //console.log(status)
            setDisableShareButton({
                disabled : false
            })
            document.getElementById("shareFileButton").disabled = false;
        }
        else {
            setDisableShareButton({disabled : true})
            document.getElementById("shareFileButton").disabled = true;
        }
      
        setEmailStatus({
            
            status : status.data
        })

        
        //console.log(status.data)
    }

    const getEmailVerficationStatus = () => {
       //console.log(sharingInfo.email)
       if(sharingInfo.email === props.userEmail) {
           console.log('cant do it');
           alert('You cant share your file to yourself !');
           return ;
        }
        verifyRecieversEmailService(sharingInfo.email , getStatus);
       
    
    }

    const getEmailId = (event) => {
        //console.log(event)
        setSharingInfo({
            ...sharingInfo,
            email : event.target.value
        })


        

    }


    const body = (
        <div style={modalStyle} className={classe.paper}>
            <label >Reciever's Email:</label>
            <input type="email" onChange={getEmailId}></input>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={getEmailVerficationStatus}>verify Email ID</button>
            <h4>{emailStatus.status}</h4>
            <h3>Points to consider before giving permission.</h3>
            <h5>1. View will give permission just to see the file.</h5>
            <h5>2. Download will give permission to view and download the file.</h5>
            <h5>3. Update will give permission to view , download and update the file.</h5>
            <h5>4. Delete will give permission to view , download , update and delete the file.</h5>
            <SelectPermissionBar getPermission={getPermissionType}/>
            <button id="shareFileButton"  disabled={disableShareButton.disabled} onClick={onSubmitHandler}>ShareFile</button> 
            <br></ br><br></ br><br></ br>
            <button onClick={handleClose}>Close</button>
        </div>
    );

    return (
        
        <div className={classes.titlebox}>
            <ShareRoundedIcon className={classes.iconSize} onClick={handleOpen} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        userId: state.Auth.data.id,
        userEmail : state.Auth.data.email,
        myFiles: state.fetchMyFileInfo.data
    }
}


const mapActionsToProps = (dispatch) => {

    return {
        loadMyFIles: (userId) => dispatch(sagaFetchFileActionRequest(userId)),
        loadSharedFiles : (userId) => dispatch(sagaFetchSharedFileActionRequest(userId))
    }
}


export default connect(mapStateToProps, mapActionsToProps)(ShareFileModal);