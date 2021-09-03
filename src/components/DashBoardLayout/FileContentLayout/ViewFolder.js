import React from 'react';
import FileVersionTable from './FileVersionList';
import classes from './ViewFolder.module.css';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import { connect } from 'react-redux';
import { MY_FILES } from '../../../store/staticVariable';
import SharedFileVersionTable from './SharedFileVersionTable';

const ViewFolder = (props) => {


    let files = props.data;
    // console.log(files);
    // console.log(props.folderName)
    // console.log(props.sharedFiles)

    let fileToShow = [];
    if (props.currentLocation.location === MY_FILES) {
        for (let i = 0; i < files.length; i++) {
            if(files[i].fileName === props.folderName) {
                fileToShow.push(files[i]);
            }
        }
    } 
    else {
        for(let i =0; i<files.length ;i++) {
            if(props.sharedFiles.data[i].fileInfo.fileName === props.folderName ) {
                fileToShow.push(props.sharedFiles.data[i]);
            }
        }
    }







    return (
        <div>
            <div className={classes.container1}>
                <h1 className={classes.box1}>{props.folderName}</h1>
                <CancelRoundedIcon onClick={() => props.clickHandler()} className={classes.iconSize} />
            </div>
            <div >
                <br /><br /><br />
                {props.currentLocation.location === MY_FILES ? <FileVersionTable filesList={fileToShow} /> :
                    <SharedFileVersionTable filesList={fileToShow} />
                }
            </div>
        </div>
    )
}


const mapStateToProps = (state, ownProps) => {
    return {
        ownProps,
        currentLocation: state.currentFiles,
        sharedFiles: state.fetchSharedFileInfo
    }
}


export default connect(mapStateToProps, null)(ViewFolder);