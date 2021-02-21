import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {FlexboxGrid, Col, Grid} from 'rsuite';

const FormLayout = ({ children }) => (
    <FlexboxGrid justify="center" align="middle" style={{background:'lightgray', minHeight:'100vh'}}>
        <FlexboxGrid.Item componentClass={Col} colspan={20} sm={20} xs={20} md={10}>
            {children}
        </FlexboxGrid.Item>
    </FlexboxGrid>
);

const FormLayoutRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (
            <FormLayout>
                <Component {...matchProps} />
            </FormLayout>
        )} />
    )
};

export default FormLayoutRoute;  