import { connect } from "react-redux";
import {MY_FILES, SHARED_FILES} from '../../../store/staticVariable';


const FileViewer = (props) => {


    console.log(props.fileInfo)
    let fileContent = <div>loading</div>;
    let ownerId,userId,fileId,fileType;
    if(props.currentFiles === MY_FILES) {
        ownerId = props.userId.id;
        userId = props.userId.id;
        fileId = props.fileInfo.file_id;
        fileType = props.fileInfo.fileName.split(".")[1];
    }
    else if(props.currentFiles === SHARED_FILES) {
        ownerId = props.fileInfo.ownerId;
        userId = props.fileInfo.ownerId;  
        fileId = props.fileInfo.fileInfo.file_id;
        fileType = props.fileInfo.fileInfo.fileName.split(".")[1];     
    }

    console.log(`http://localhost:8080/files/${userId}/load/${fileId}/${ownerId}`);

    switch(fileType) {
        case ("jpg") : {
            
            fileContent = <img src={`http://localhost:8080/files/${userId}/load/${fileId}/${ownerId}`} alt={`${props.fileInfo.fileName}`} width="100%" height="100%"></img>;
            break;
        }
        case ("pdf") : {
            fileContent = <iframe src={`http://localhost:8080/files/${userId}/load/${fileId}/${ownerId}`} height="550px" width="100%" title="pdf"></iframe>;
            break;
        }
        case ("mp4") : {
            fileContent = <video poster="movie.jpg" width="700px" height="550px" controls source src={`http://localhost:8080/files/${userId}/load/${fileId}/${ownerId}`} type="video/mp4"></video>;
            break;
        }
        case ("mp3") : {
            fileContent = <audio controls source src={`http://localhost:8080/files/${userId}/load/${fileId}/${ownerId}`} type="audio/mpeg"></audio>
            break;
        }
        default : {
            fileContent = <h2>Upsupported File Format may be avialable for preview in future updates</h2>
        }
    }



    return (
        <div> 
            {fileContent}
        </div>
        
    )
}   

const mapStateToProps = (state , ownProps) => {
    return {
        ...ownProps,
        userId : state.Auth.data,
        currentFiles : state.currentFiles.location
    }
}

export default connect(mapStateToProps ,null)(FileViewer); 
