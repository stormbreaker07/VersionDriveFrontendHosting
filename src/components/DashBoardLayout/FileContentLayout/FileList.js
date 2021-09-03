
import FileBox from './FileConentBox';
import classes from './BoxInSingleRow.module.css';



const FileList = (props) => {

    let filesInfo = props.data.list;
    let allMyFiles;

    let set1 = new Set();
    let uniqueFiles = [];
    let siz = 0;
    for (let i = 0; i < filesInfo.length; i++) {
        if (i === 0) {
            set1.add(filesInfo[i].fileName);
            siz++;
            uniqueFiles.push(filesInfo[i]);
            continue;
        }

        set1.add(filesInfo[i].fileName);
        if (set1.size !== siz) {
            uniqueFiles.push(filesInfo[i]);
            siz = set1.size;
        }
    }
    

    const getFolderId = (name) => {
        props.clickHandler(name);
    }


    if (uniqueFiles.length === 0) {
        allMyFiles = <h2>Not shared a single file till now </h2>;
    }
    else {
        allMyFiles = uniqueFiles.map((data) =>
            <FileBox key={data.file_id}  fileDesc={{data: data}} allFilesInfo={{files : filesInfo}} getFolderId={getFolderId}/>
        );
    }



    return (
        <div className={classes.rowBoxContainer}>
            {allMyFiles}
        </div>
    )
}

export default FileList;