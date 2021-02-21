import React, { Component } from 'react';
import { Route } from 'react-router-dom';

const FormLayout = ({ children }) => (
    <div>
        <p>This is the Form Layout</p>
        {children}
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