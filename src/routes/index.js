import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import App from '../components/app/app';
// import RequireAuth from '../components/auth/require_auth';
import Auth from '../pages/Auth';
import Home from '../pages/Home';

const Routes = () => {
    return (
        <App>
            <RouteWrapper>
                <Route exact path="/" render={props => <Home {...props} />} />
                <Route exact path="/auth" component={Auth} />
                <Route exact path="/test" render={props => <Auth {...props} />} />
            </RouteWrapper>
        </App>
    );
};

const RouteWrapper = styled.div`

`;

export default Routes;
