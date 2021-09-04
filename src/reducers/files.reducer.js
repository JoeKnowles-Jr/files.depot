import {
    FETCH_CONTENT,
    FETCH_UPLOADS,
    FETCH_FILES,
    UPLOAD_RESULT,
    ADD_FILE_SUCCESS,
    ADD_FILE_ERROR
} from '../actions/types';

const initialState = {
    content: null,
    uploads: null,
    files: null,
    uploadedFile: null,
    addedFile: null
}

export const reducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_CONTENT:
            return { ...state, content: action.payload.content }
        case FETCH_UPLOADS:
            return { ...state, uploads: action.payload.uploads }
        case FETCH_FILES:
            return { ...state, files: action.payload.files }
        case UPLOAD_RESULT:
            return { ...state, uploadedFile: action.payload.uploadedFile }
        case ADD_FILE_SUCCESS:
            return { ...state, addState: action.payload.addState }
        case ADD_FILE_ERROR:
            return { ...state, addState: action.payload.addState }
        default:
            return state;
    }
};
