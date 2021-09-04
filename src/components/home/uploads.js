import React from 'react';
import styled from 'styled-components';
import FilesDragAndDrop from './FilesDragAndDrop';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Uploads = ({ uploadFile, uploadedFile }) => {
    const [selectedFile, setSelectedFile] = React.useState("");
    const [comment, setComment] = React.useState("");
    const [password, setPassword] = React.useState("");

    React.useEffect(() => {
        if (uploadedFile === 'success') {
            addFile();
        }
    }, [uploadedFile]);

    // const approve = (fileName) => {
    //     confirmAlert({
    //         title: 'Confirm to approve',
    //         message: 'Is this wise?.',
    //         buttons: [
    //             {
    //                 label: 'Confirm',
    //                 onClick: () => this.addFile(fileName)
    //             },
    //             {
    //                 label: 'Cancel',
    //                 onClick: () => { }
    //             }
    //         ]
    //     });
    // };

    const addFile = () => {
        console.log("addFile");
        this.props.addFile({
            fileName: selectedFile,
            addedBy: this.props.user._id
        });
    }

    const saveComment = () => {

    };

    const handleDelete = (e) => {
        setSelectedFile("");
    };

    const onFileChange = (e) => {
        setSelectedFile(e.target.value);
    };

    const onCommentChange = (e) => {
        setComment(e.target.value);
    };

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const noFileSelected = () => {
        confirmAlert({
            title: 'No file selected!',
            message: 'Nothing to upload',
            buttons: [
                {
                    label: 'OK',
                    onClick: () => {}
                }
            ]
        });
    };

    const requestComment = () => {
        confirmAlert({
            title: `No comment for ${selectedFile.split('\\')[2]}`,
            message: 'Would you like to add one?',
            childrenElement: () => <div>
                <textarea onChange={onCommentChange} placeholder='Add comment...'></textarea>
                <input onChange={onPasswordChange} placeholder='Add Password'></input>
            </div>,
            buttons: [
                {
                    label: 'Continue',
                    onClick: () => uploadFile(selectedFile)
                }
            ]
        });
    };

    const handleUpload = () => {
        if (selectedFile) {
            if (!comment) {
                requestComment();
                
            }
        } else {
            noFileSelected();
        }
    };

    const renderPicker = () => {
        return (
            <div>
                <Picker className={`${selectedFile ? 'selected' : ''}`}><input onChange={onFileChange} name='file' id='file' type='file'></input></Picker>
                <div>
                    <textarea
                        className={`${comment ? 'selected' : ''}`}
                        onChange={onCommentChange}
                        value={comment}
                        placeholder='Comment...'>                        
                    </textarea>
                </div>
                <div>
                    <input
                        className={`${password ? 'selected' : ''}`}
                        onChange={onPasswordChange}
                        value={password}
                        type='password'
                        placeholder='Add Password'>                        
                    </input>
                </div>
                <div>
                    <button onClick={handleUpload}>Make It So</button>
                </div>
            </div>
        );
    };

    return (
        <UploadsWrapper>
            <WideScreen>
                <FilesDragAndDrop uploaded={false} onSelect={onFileChange}>
                    {!selectedFile && <em>Drop me a file here!</em>}
                    {selectedFile && (
                        <div>
                            <em className='hasUploaded'>{selectedFile.split('\\')[2]} was selected!
                                <button id='v' onClick={handleDelete}>x</button></em>
                        </div>
                    )}
                    <span
                        role='img'
                        aria-label='emoji'
                        className='area__icon'
                    >
                        &#128526;
                    </span>
                    {renderPicker()}
                </FilesDragAndDrop>
            </WideScreen>
            <NarrowScreen>
                {renderPicker()}
            </NarrowScreen>
        </UploadsWrapper>
    );
};

const Picker = styled.div`
    margin-bottom: 1rem;
`;

const WideScreen = styled.div`
    display: none;
    @media (min-width: 768px) {
        display: block;
    }
`;

const NarrowScreen = styled.div`
    width: 100%;
    display: none;
    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: space-around;
    }
`;

const UploadsWrapper = styled.div`
    width: 95%;
    padding: 1rem;
    margin: 0 auto;
    border: 1px solid blue;
    .selected {
        border: 1px solid green;
    }
    @media (min-width: 768px) {
        height: 60vh;
    }
`;

export default Uploads;