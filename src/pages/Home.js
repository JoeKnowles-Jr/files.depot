import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import styled from 'styled-components';
import History from '../history';
import Downloads from '../components/home/downloads';
import Uploads from '../components/home/uploads';

class Home extends PureComponent {

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (!token) {
            History.push('/auth');
        }
        this.props.getContentFiles();
        this.props.getUploadFiles();
        this.props.getFiles();
    }

    render() {

        return (
            <HomeWrapper>
                <Down>
                    <h2>Download</h2>
                    <Downloads
                        user={this.props.user}
                        getContent={this.props.getContentFiles}
                        getUploads={this.props.getUploads}
                        getFiles={this.props.getFiles}
                    ></Downloads>
                </Down>
                <Up>
                    <h2>Upload</h2>
                    <Uploads uploadFile={this.props.uploadFile} uploadedFile={this.props.uploadedFile}></Uploads>
                </Up>
            </HomeWrapper>
        );
    }
}

const Side = styled.div`
    display: flex;
    align-items: stretch;
    justify-content: center;
    flex-direction: column;
    text-align: center;
`;

const Up = styled(Side)`
    border-right: 1px solid black;
`;

const Down = styled(Side)`
    border-left: 1px solid black;
`;

const HomeWrapper = styled.div`
    width: 100%;
    position: relative;
    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 60% 40%;
    }
`;

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        uploadedFile: state.files.uploadedFile
    }
}

export default connect(mapStateToProps, actions)(Home);
