import React from 'react';
import styled from 'styled-components';

const FileItem = ({ file }) => {

    return (
        <FileItemWrapper>
            <div>
                <p>{file.fileName}</p>
                <span>Added by: {file.addedBy.firstName}</span>
            </div>
            <ButtonWrapper>
                <button>Download</button>
                <AdminButtons>
                    <button>Hide</button>
                    <button>X</button>
                </AdminButtons>
            </ButtonWrapper>
        </FileItemWrapper>
    );
};

const AdminButtons = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 0.5rem;
`;

const ButtonWrapper = styled.div`

`;

const FileItemWrapper = styled.div`
    border: 1px solid blue;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export default FileItem;

