import axios from 'axios';
import { filesUrl } from './action.urls';
import {
    FETCH_CONTENT,
    FETCH_UPLOADS,
    FETCH_FILES,
    UPLOAD_RESULT,
    ADD_FILE_SUCCESS,
    ADD_FILE_ERROR
} from './types';

export const getContentFiles = () => {
    return (dispatch) => {
        axios.get(`${filesUrl}/content`)
            .then(response => {
                dispatch({ type: FETCH_CONTENT, payload: { content: response.data } });
            })
            .catch(err => console.log(err));
    };
};

export const getUploadFiles = () => {
    return (dispatch) => {
        axios.get(`${filesUrl}/uploads`)
            .then(response => {
                dispatch({ type: FETCH_UPLOADS, payload: { uploads: response.data } });
            })
            .catch(err => console.log(err));
    };
};

export const getFiles = () => {
    return (dispatch) => {
        axios.get(`${filesUrl}`)
            .then(response => {
                dispatch({ type: FETCH_FILES, payload: { files: response.data } });
            })
            .catch(err => console.log(err));
    };
};

export const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return (dispatch) => {
        axios.post(`${filesUrl}/upload`, formData)
            .then(response => {
                dispatch({ type: UPLOAD_RESULT, payload: { uploadedFile: response } });
            })
            .catch(err => {
                dispatch({ type: UPLOAD_RESULT, payload: { uploadedFile: err } });
            });
    };
};

export const addFile = (file) => {
    return (dispatch) => {
        axios.post(`${filesUrl}`, file)
            .then(response => {
                dispatch({ type: ADD_FILE_SUCCESS, payload: { addedFile: response.data.file } });
            })
            .catch(err => {
                dispatch({ type: ADD_FILE_ERROR, payload: { addedFile: err } });
            });
    }
};

