import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import PreviewFileModal from './PreviewFileButton';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import {sageDeleteFileMiddleware} from '../../../store/actions/DeleteFIleAction'
import { Fragment } from 'react';
import UpdateSharedFileButton from './UpdateSharedFileButton';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
    rightMargin : 10,
  },
});



function SharedFileVersionTable(props) {

  console.log(props)
  const classes = useStyles();

  const filesInfo = props.filesList;
  console.log(filesInfo)

  const downloadFileHandler = (ownerId,fileId) => {
    //onsole.log(`http://localhost:8080/files/${props.filesList[0].ownerId}/download/${fileId}/${props.filesList[0].ownerId}`)

      window.open(`http://localhost:8080/files/${ownerId}/download/${fileId}/${ownerId}`);
    
  }


  const deleteFileHandler = (fileId ,ownerId) => {
      console.log(fileId , ownerId)
    props.deleteFileMiddleware(ownerId , fileId);
  }

  const calculateDate = (timestamp) => {
    let d = new Date(timestamp);
    return (`${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`)
  }

  const tableBodyOption = (row) => {
    let x;   
    console.log(row)
    if(row.ownerId === props.user.id) {
      x = <Fragment>
        <TableCell align="right"><PreviewFileModal fileInfo={row}/></TableCell>
        <TableCell align="right">
          <GetAppRoundedIcon onClick={() => downloadFileHandler(row.ownerId , row.fileInfo.file_id)} />              
        </TableCell>
        <TableCell align="right"><UpdateSharedFileButton filesInfo={row.fileInfo} fileOwnerId={row.ownerId}/></TableCell>
        <TableCell align="right"><DeleteRoundedIcon  onClick={() => {deleteFileHandler(row.fileInfo.file_id,row.ownerId)}}/></TableCell>
        </Fragment>
    } 
    else {
    if(row.purpose === 'view') {
        x = 
        <Fragment>
        <TableCell align="right"><PreviewFileModal fileInfo={row}/></TableCell>
        <TableCell align="right">Not Permitted</TableCell>
        <TableCell align="right">Not Permitted</TableCell>
        <TableCell align="right">Not Permitted</TableCell>
        </Fragment>
    }
    else if(row.purpose === 'download') {
        x = <Fragment>
        <TableCell align="right"><PreviewFileModal fileInfo={row}/></TableCell>
        <TableCell align="right">
          <GetAppRoundedIcon onClick={() => downloadFileHandler(row.ownerId , row.fileInfo.file_id)} />              
        </TableCell>
        <TableCell align="right">Not Permitted</TableCell>
        <TableCell align="right">Not Permitted</TableCell>
        </Fragment>
    }
    else if(row.purpose === 'update') {
        x = <Fragment>
        <TableCell align="right"><PreviewFileModal fileInfo={row}/></TableCell>
        <TableCell align="right">
          <GetAppRoundedIcon onClick={() => downloadFileHandler(row.ownerId , row.fileInfo.file_id)} />              
        </TableCell>
        <TableCell align="right"><UpdateSharedFileButton filesInfo={row.fileInfo} fileOwnerId={row.ownerId} /></TableCell>
        <TableCell align="right">Not Permitted</TableCell>
        </Fragment>
    }
    else {
        x = <Fragment>
        <TableCell align="right"><PreviewFileModal fileInfo={row}/></TableCell>
        <TableCell align="right">
          <GetAppRoundedIcon onClick={() => downloadFileHandler(row.ownerId , row.fileInfo.file_id)} />              
        </TableCell>
        <TableCell align="right"><UpdateSharedFileButton filesInfo={row.fileInfo} fileOwnerId={row.ownerId} /></TableCell>
        <TableCell align="right"><DeleteRoundedIcon  onClick={() => {deleteFileHandler(row.fileInfo.file_id,row.ownerId)}}/></TableCell>
        </Fragment>
    }
  }
    return x;
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
            <TableCell align="right">Update</TableCell>
            <TableCell align="right">Delete</TableCell>
            <TableCell align="right">Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filesInfo.map((row) => {

            const result = tableBodyOption(row);
            return (<TableRow key={row.id}>
              <TableCell component="th" scope="row">{row.fileInfo.fileName}</TableCell>
              <TableCell align="right">{row.fileInfo.fileVersion}</TableCell>
                {result}
              <TableCell align="right">{calculateDate(row.fileInfo.timestamp)  }</TableCell>
            </TableRow>)
          })}
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

export default connect(mapStateToProps, mapActionToProps)(SharedFileVersionTable);


































 // console.log(event);
    // console.log(event.target.value);
    // let fileName ='';
    // for(let i =0;i<filesInfo.length;i++) {
    //   if(event.target.value == filesInfo[i].file_id) {
    //     fileName = filesInfo[i].fileName;
    //   }
    // }
    // console.log(fileName);