import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import classes from './PreviewFileModal.module.css';
import {connect} from 'react-redux';
import {sagaFetchFileActionRequest} from '../../../store/actions/FetchMyFilesInfoAction'
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import FileViewer from './FileViewer';


function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 800,
    height: 700,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function PreviewFileModal(props) {
  const classe = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 

  const onSubmitHandler = () => {
      handleClose();  
  }
  console.log(props.fileInfo)

  const body = (
    <div style={modalStyle} className={classe.paper}>
      <h2>View File</h2>
      <FileViewer fileInfo={props.fileInfo}/>
      <button onClick={onSubmitHandler}>Close</button>
    </div>
  );

  return (
    <div className={classes.titlebox}>
      <VisibilityRoundedIcon className={classes.iconSize} onClick={handleOpen} />
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

const mapStateToProps = (state , ownProps) => {
    return {
      ...ownProps,
      userId : state.Auth.data.id,
      myFiles : state.fetchMyFileInfo.data
    }
}


const mapActionsToProps = (dispatch) => {

  return {
    loadMyFIles : (data) => dispatch(sagaFetchFileActionRequest(data))
  }
}


export default connect(mapStateToProps,mapActionsToProps)(PreviewFileModal);