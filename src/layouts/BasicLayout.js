import React, { Component } from 'react';
import { Route } from 'react-router-dom';

const BasicLayout = ({ children, ...rest }) => {
    return (
        <div>
            <div >{children}</div>
        </div>
    )
}

const BasicLayoutRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (
            <BasicLayout>
                <Component {...matchProps} />
            </BasicLayout>
        )} />
    )
};

export default BasicLayoutRoute;  