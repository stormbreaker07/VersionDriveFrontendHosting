import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { MY_FILES } from '../../../store/staticVariable';
import PreviewFileModal from './PreviewFileButton';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import {sageDeleteFileMiddleware} from '../../../store/actions/DeleteFIleAction'
import ShareFileModal from './ShareFileModal';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



function FileVersionTable(props) {


  const classes = useStyles();

  const filesInfo = props.filesList;
  console.log(filesInfo)

  const downloadFileHandler = (fileId) => {
   
    if (props.currentFileLocation === MY_FILES) {
      window.open(`http://localhost:8080/files/${props.user.id}/download/${fileId}/${props.user.id}`);
    }
  }


  const deleteFileHandler = (fileId) => {
    console.log(props.user.id , fileId);
    props.deleteFileMiddleware(props.user.id , fileId);
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>File Name</TableCell>
            <TableCell align="right">Version</TableCell>
            <TableCell align="right">Preview</TableCell>
            <TableCell align="right">Download</TableCell>
            <TableCell align="right">Delete</TableCell>
            <TableCell align="right">Share</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filesInfo.map((row) => (
            <TableRow key={row.file_id}>
              <TableCell component="th" scope="row">
                {row.fileName}
              </TableCell>
              <TableCell align="right">{row.fileVersion}</TableCell>
              <TableCell align="right"><PreviewFileModal fileInfo={row}/></TableCell>
              <TableCell align="right">
                <GetAppRoundedIcon onClick={() => downloadFileHandler(row.file_id)} />              
              </TableCell>
              <TableCell align="right"><DeleteRoundedIcon  onClick={() => {deleteFileHandler(row.file_id)}}/></TableCell>
              <TableCell align="right"><ShareFileModal fileInfo={row}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table >
    </TableContainer >
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    user: state.Auth.data,
    currentFileLocation: state.currentFiles.location
  }
}


const mapActionToProps = (dispatch) => {
  return {
    deleteFileMiddleware : (userId , fileId) => dispatch(sageDeleteFileMiddleware(userId , fileId)),
  }
}

export default connect(mapStateToProps, mapActionToProps)(FileVersionTable);


































 // console.log(event);
    // console.log(event.target.value);
    // let fileName ='';
    // for(let i =0;i<filesInfo.length;i++) {
    //   if(event.target.value == filesInfo[i].file_id) {
    //     fileName = filesInfo[i].fileName;
    //   }
    // }
    // console.log(fileName);