import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import classes from './AddFilebutton.module.css';
import { connect } from 'react-redux';
import { sagaFetchFileActionRequest } from '../../../store/actions/FetchMyFilesInfoAction'
import { sagaFetchSharedFileActionRequest } from '../../../store/actions/fetchSharedFileActions';
import UpdateIcon from '@material-ui/icons/Update';
import { updateSharedFileUtility } from '../../../utility/fileUtility/updateSharedFileItility';


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
    width: 500,
    height: 500,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function UpdateSharedFileButton(props) {


  console.log(props)

  const classe = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const [fileName, setFileName] = useState({
    uploadedfile: null,
    fileName: '',
    fileType: 'UnKnown',
    fileSize: 0,
    fileSelected: false
  })

  const onChangeHandler = (event) => {

    console.log(props.filesInfo)

    setFileName({
      ...fileName,
      uploadedfile: event.target.files[0],
      fileName: props.filesInfo.fileName,
      fileType: event.target.files[0].type,
      fileSize: event.target.files[0].size / (1000 * 1000),
      fileSelected: true
    })


  }


  const onSubmitHandler = () => {
    const formData = new FormData();
    let repoOwner = props.fileOwnerId;
    let fileversion = 0;
    const requiredFileName = fileName.fileName;
    for (let i = 0; i < props.filesInfo.length; i++) {
      if (requiredFileName === props.filesInfo[i].fileName) {
        if (fileversion < Number(props.filesInfo[i].fileVersion)) {
          fileversion = Number(props.filesInfo[i].fileVersion);
        }
      }
    }

    console.log(fileName)

    console.log(fileversion);

    formData.append(
      "file",
      fileName.uploadedfile,
      fileName.fileName
    );

    console.log(formData);


      updateSharedFileUtility(repoOwner , fileversion ,props.userId , formData , getuploadFileResponse);

    handleClose();
  }

  const getuploadFileResponse = (responseStatus) =>{
    if(responseStatus === "success") {
      props.loadSharedFiles(props.userId);
    }
    else {
      alert("file upload action failure");
    }
  }



  const body = (
    <div style={modalStyle} className={classe.paper}>
      <h2>updated File Version</h2>
      <input type='file' onChange={onChangeHandler} ></input>
      <br />
      {fileName.fileSelected === true ? <div>
        <h3>File Name is : {fileName.fileName}</h3>
        <h3>File Type is : {fileName.fileType}</h3>
        <h3>File Size is : {fileName.fileSize + "MB"}</h3>
      </div> : <h3>select a file</h3>}
      <br />
      <button onClick={onSubmitHandler}>upload The File</button>
    </div>
  );

  return (
    <div className={classes.titlebox}>
      <UpdateIcon onClick={handleOpen} />
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
    myFiles: state.fetchMyFileInfo.data,
    sharedFiles : state.fetchSharedFileInfo.data
  }
}


const mapActionsToProps = (dispatch) => {

  return {
    loadMyFIles: (data) => dispatch(sagaFetchFileActionRequest(data)),
    loadSharedFiles : (userId) => dispatch(sagaFetchSharedFileActionRequest(userId))
  }
}


export default connect(mapStateToProps, mapActionsToProps)(UpdateSharedFileButton);