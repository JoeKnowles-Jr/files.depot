import React from 'react';
import styled from 'styled-components';

export default function FilesDragAndDrop({ onSelect, children, count, formats, uploaded }) {
    const drag = React.useRef(null);
    const drop = React.useRef(null);
    const [dragging, setDragging] = React.useState(false);
    const [message, setMessage] = React.useState({
        show: false,
        text: null,
        type: null,
    });

    React.useEffect(() => {
        const dc = drop.current;
        if (dc) {
            dc.addEventListener('dragover', handleDragOver);
            dc.addEventListener('drop', handleDrop);
        }

        return () => {
            if (dc) {
                dc.removeEventListener('dragover', handleDragOver);
                dc.removeEventListener('drop', handleDrop);
            }
        };
    }, []);

    const showMessage = (text, type, timeout) => {
        setMessage({
            show: true,
            text,
            type,
        });

        setTimeout(() => setMessage({
            show: false,
            text: null,
            type: null,
        }), timeout);
    };

    React.useEffect(() => {
        const dc = drop.current;
        if (dc) {
            dc.addEventListener('dragover', handleDragOver);
            dc.addEventListener('drop', handleDrop);
            dc.addEventListener('dragenter', handleDragEnter);
            dc.addEventListener('dragleave', handleDragLeave);
        }

        return () => {
            if (dc) {
                dc.removeEventListener('dragover', handleDragOver);
                dc.removeEventListener('drop', handleDrop);
                dc.removeEventListener('dragenter', handleDragEnter);
                dc.removeEventListener('dragleave', handleDragLeave);
            }
        };
    }, []);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.target !== drag.current) {
            setDragging(true);
        }
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.target === drag.current) {
            setDragging(false);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        // this is required to convert FileList object to array
        const files = [...e.dataTransfer.files];

        if (uploaded) {
            showMessage('Delete the first one if you want to upload a different one.', 'error', 2000);
            return;
        }

        if (count && count < files.length) {
            showMessage(`Nope, only ${count} file${count !== 1 ? 's' : ''} can be uploaded at a time`, 'error', 2000);
            return;
        }

        if (formats && files.some((file) => !formats.some((format) => file.name.toLowerCase().endsWith(format.toLowerCase())))) {
            showMessage(`Nope, only the following file formats are acceptable: ${formats.join(', ')}`, 'error', 2000);
            return;
        }

        if (files && files.length) {
            showMessage('Yep, that\'s what I want', 'success', 1000);
            onSelect(files[0]);
        }
    };

    return (
        <FilesDragAndDropArea ref={drop} >
            {message.show && (
                <div
                    className={`FilesDragAndDrop__placeholder FilesDragAndDrop__placeholder--${message.type}`}
                >
                    {message.text}
                    <span
                        role='img'
                        aria-label='emoji'
                        className='area__icon'
                    >
                        {message.type === 'error' ? <span role='img' aria-label='icon'>&#128546;</span> : <span role='img' aria-label='icon'>&#128536;</span>}
                    </span>
                </div>
            )}
            {dragging && (
                <div
                    ref={drag}
                    className='FilesDragAndDrop__placeholder'
                >
                    Drop that file down low
                    <span
                        role='img'
                        aria-label='emoji'
                        className='area__icon'
                    >
                        &#128539;
                    </span>
                </div>
            )}
            {children}
        </FilesDragAndDropArea>
    );
}

const FilesDragAndDropArea = styled.div`
    position: relative;
    margin: 2rem auto;
    width: 45%;
    height: 40vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;
    font-size: 2rem;
    color: #555555;
    border: 2px dashed #c3c3c3;
    border-radius: 1rem;
    button {
        border-radius: 50%;
        margin-left: 2rem;
        margin-right: -0.7rem;
     }
    em {
        padding: 0.25rem 1rem;
        border-radius: 1rem;
        font-size: 1rem;
        background-color: #999;
    }
    .hasUploaded {
        background-color: #000;
        color: #00f;
    }
    .area__icon {
      font-size: 3rem;
      margin-top: 2rem;
    }
    .FilesDragAndDrop__placeholder {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column nowrap;
        background-color: #e7e7e7;
        border-radius: 1rem;
        color: #7f8e99;
        font-size: 2rem;
        /* opacity: .8; */
        text-align: center;
        line-height: 1.4;
        &.FilesDragAndDrop__placeholder--error {
            background-color: #f7e7e7;
            color: #cf8e99;
        }
        &.FilesDragAndDrop__placeholder--success {
            background-color: #e7f7e7;
            color: #8ecf99;
        }
    }
`;
