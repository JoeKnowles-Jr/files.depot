import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import History from '../../history';

class Signout extends PureComponent {

    componentDidMount() {
        this.props.signoutUser();
        History.push('/');
    }

    render() {
        return (
            <div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <div>Sorry to see you go ...</div>
            </div>
        )
    }
}

export default connect(null, actions)(Signout);
