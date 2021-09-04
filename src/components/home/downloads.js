import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as actions from '../../actions';
import FileItem from '../file/file.item';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class Downloads extends React.PureComponent {

    componentDidMount() {
        this.props.getContentFiles();
        this.props.getUploadFiles();
        this.props.getFiles();
    }

    render() {

        const showFiles = () => {
            return (
                <div>
                    {this.props.files && this.props.files.map(f => {
                        return <FileItem file={f} key={f._id} />
                    })}
                </div>
            );
        };

        return (
            <DownloadsWrapper>
                {showFiles()}
            </DownloadsWrapper>
        );
    }
};

const DownloadsWrapper = styled.div`
    width: 95%;
    padding: 1rem;
    margin: 0 auto;
    max-height: 60vh;
    overflow-y: scroll;
    border: 1px solid blue;
    text-align: left;
    .popup {
        width: 80%;
    }
`;

const mapStateToProps = (state) => {
    return {
        content: state.files.content,
        uploads: state.files.uploads,
        files: state.files.files,
        showConfirm: ''
    }
}

export default connect(mapStateToProps, actions)(Downloads);