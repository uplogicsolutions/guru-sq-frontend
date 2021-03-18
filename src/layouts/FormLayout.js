import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { FlexboxGrid, Col, Grid, Row } from 'rsuite';
import Logo from 'assets/gurusq.png';

const FormLayout = ({ children }) => (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '10px' }}>
        <img className="p-5" src={Logo} width="250px" />
        <FlexboxGrid justify="center" align="middle" style={{ background: 'white', width: '100%', flexGrow: 1 }}>
            <FlexboxGrid.Item componentClass={Col} colspan={20} sm={20} xs={20} md={8}>
                {children}
            </FlexboxGrid.Item>
        </FlexboxGrid>
    </div>
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