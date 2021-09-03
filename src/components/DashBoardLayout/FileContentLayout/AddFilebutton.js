import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import classes from './AddFilebutton.module.css';
import { connect } from 'react-redux';
import { sagaFetchFileActionRequest } from '../../../store/actions/FetchMyFilesInfoAction'
import { uploadFileUtility } from '../../../utility/fileUtility/uploadFilesUtility.js'


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

function SimpleModal(props) {


  console.log(props.filesInfo)
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
      fileName: event.target.files[0].name,
      fileType: event.target.files[0].type,
      fileSize: event.target.files[0].size / (1000 * 1000),
      fileSelected: true
    })


  }


  const onSubmitHandler = () => {
    const formData = new FormData();

    let fileversion = 0;
    const requiredFileName = fileName.fileName;
    for (let i = 0; i < props.filesInfo.length; i++) {
      if (requiredFileName === props.filesInfo[i].fileName) {
        if (fileversion < Number(props.filesInfo[i].fileVersion)) {
          fileversion = Number(props.filesInfo[i].fileVersion);
        }
      }
    }


    console.log(fileversion);

    formData.append(
      "file",
      fileName.uploadedfile,
      fileName.fileName
    );

    console.log(formData);


      uploadFileUtility(props.userId , fileversion , formData , getuploadFileResponse);

    handleClose();
  }

  const getuploadFileResponse = (responseStatus) =>{
    if(responseStatus === "success") {
      props.loadMyFIles(props.userId);
    }
    else {
      console.log("file upload action failuer");
    }
  }



  const body = (
    <div style={modalStyle} className={classe.paper}>
      <h2>File Uploader</h2>
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
      <AddCircleRoundedIcon className={classes.iconSize} onClick={handleOpen} />
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
    myFiles: state.fetchMyFileInfo.data
  }
}


const mapActionsToProps = (dispatch) => {

  return {
    loadMyFIles: (data) => dispatch(sagaFetchFileActionRequest(data))
  }
}


export default connect(mapStateToProps, mapActionsToProps)(SimpleModal);