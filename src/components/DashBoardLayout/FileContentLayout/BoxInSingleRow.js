import { useState } from 'react';
import classes from './BoxInSingleRow.module.css';
import { connect } from 'react-redux';
import { MY_FILES , SHARED_FILES } from '../../../store/staticVariable';
import SimpleModal from './AddFilebutton';
import FileList from './FileList';
import ViewFolder from './ViewFolder';

const BoxInSingleRow = (props) => {

    // const currentLocation = useSelector((state) => state.currentFiles.location)

   // console.log(props.loadMyfiles);
   const changeFileListState = (name) => {

    setFileList({
        ...fileList,
        status : false,
        folderName : name
    })
}
   const [fileList , setFileList] = useState({
            status : true,
            folderName : ''    
       })
   
   const setFileListToDefault = () => {
    setFileList({
        ...fileList,
        status : true,
        folderName : ''
    })}

    let filesInfo = [];

    // console.log(props.currentFiles.location)    

    switch (props.currentFiles.location) {
        case (MY_FILES): {
            filesInfo = props.loadMyfiles;
            break;
        }
        case (SHARED_FILES): {
            const tempFiles = props.sharedfiles;
            for(let i = 0;i<tempFiles.length;i++) {
                filesInfo.push(tempFiles[i].fileInfo);
            } 
            console.log(filesInfo);

            // console.log(props.sharedfiles)
            break;
        }
        default: {
            filesInfo = props.loadfiles
        }
    }
   
    return (
        fileList.status === true ? 
        <div>
            <div className={classes.titlebox}>
            <h1 className={classes.h1}>{props.currentFiles.location}</h1>
            {props.currentFiles.location === MY_FILES ? <SimpleModal filesInfo={filesInfo}/> : <p />}
            </div>
            <FileList data={{list : filesInfo}} clickHandler={changeFileListState}/>
        </div>
        :
        <ViewFolder clickHandler={setFileListToDefault} data={filesInfo} folderName={fileList.folderName} />
    )
}


const mapStateToProps = (state, ownprops) => {
    return {
        ...ownprops,
        currentFiles: state.currentFiles,
        loadMyfiles: state.fetchMyFileInfo.data,
        sharedfiles: state.fetchSharedFileInfo.data,
        requestedFiles : state.fetchRequestedFileInfo
    }
}


export default connect(mapStateToProps, null)(BoxInSingleRow);