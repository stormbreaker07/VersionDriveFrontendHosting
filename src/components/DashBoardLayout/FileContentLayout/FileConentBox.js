import React,{useState} from 'react';
import classes from './FileContentBox.module.css';
import FolderOpenTwoToneIcon from '@material-ui/icons/FolderOpenTwoTone';



const FileBox = (props) => {

    const [openfolder , setOpenFolder] = useState( {
        status : false
    })

    const clickHandler = (event) => {
        setOpenFolder({
            ...openfolder,
            status : true
        })
        props.getFolderId(props.fileDesc.data.fileName)
        //console.log(similarFilesInFolder)
    }
    
    let similarFilesInFolder = [];
    for(let i=0;i<props.allFilesInfo.files.length;i++) {
        //console.log(props.fileDesc)
        if(props.allFilesInfo.files[i].fileName === props.fileDesc.data.fileName) {
        similarFilesInFolder.push(props.allFilesInfo.files[i]);
        }
    }

    
    return (
        <div  onClick={clickHandler}>
            <div className={classes.boxSize} type="button">
                <div className={classes.columnPattern}>
                    <FolderOpenTwoToneIcon className={classes.FileIcon} />
                    <div className={classes.rowPattern}>
                        <h3> {props.fileDesc.data.fileName}</h3>
                        {/* <MoreVertRoundedIcon className={classes.MoreVerticalIcon}/> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FileBox;

