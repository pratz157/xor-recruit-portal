import React from 'react';

const FileUpload = (props) =>{

    return(
    <div className="input-group" style={{margin:'10px 0px'}}>
        <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroupFileAddon01">
            Upload
            </span>
        </div>
        <div className="custom-file">
            <input
            type="file"
            className="custom-file-input"
            id="inputGroupFile01"
            aria-describedby="inputGroupFileAddon01"
            onChange={(e)=>props.handleUpload(e)}
            />
            <label className="custom-file-label" htmlFor="inputGroupFile01">
            Choose file
            </label>
        </div>
    </div>
    )
}

export default FileUpload;