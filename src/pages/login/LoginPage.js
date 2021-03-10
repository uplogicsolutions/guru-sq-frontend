import react, { useState } from 'react'
import { Button, Form, FormGroup, Panel, Loader, Alert, Input } from 'rsuite'
import { userLogin } from './store'
import { useDispatch, useSelector } from 'react-redux'

//Form Validation
import { useForm, Controller } from "react-hook-form";

//Custom Components
import Danger from 'components/alerts/Danger';

const LoginPage = (props) => {
    const { control, errors , handleSubmit } = useForm();
    const dispatch = useDispatch();
    const { loading, redirect, redirectUrl, error } = useSelector(state => state.login);

    const isValidUsername = (username) => {
        const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const mobile_regex = /^([6-9][0-9]{9})$/
        if(email_regex.test(username))
            return true
        else if(mobile_regex.test(username))
            return true
        return false
    }

    const handleOnSubmit = async (data) => {
        dispatch(userLogin(data))
    }

    if(redirect) {
        props.history.push(redirectUrl);
    }

    return (
        loading
            ?
            <Loader size='md' center={true} />
            :
            <>
                <Panel style={{ background: 'white' }} header={<h3>Login</h3>} shaded>
                    <Form onSubmit={handleSubmit(handleOnSubmit)}>
                        {
                            error &&
                            <p style={{ color: 'red', textAlign: 'center', paddingBottom: '15px' }}>{error}</p>
                        }
                        <FormGroup>
                            <Controller
                                name="username"
                                control={control}
                                defaultValue=""
                                rules= {{
                                    required: true,
                                    validate: value => isValidUsername(value)
                                }}
                                render={({onChange, value}) => 
                                    <Input 
                                        onChange={(text, e) => onChange(e)} 
                                        value={value}
                                        placeholder="Mobile or Email" 
                                    />
                                }
                            />
                        {errors.username?.type === 'required' && <Danger>*This field is required</Danger>}
                        {errors.username?.type === 'validate' && <Danger>*Please enter valid mobile or email</Danger>}
                        </FormGroup>
                        <FormGroup>
                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                rules= {{
                                    required: true,
                                    // minLength: 8,
                                }}
                                render={({onChange, value}) => 
                                    <Input 
                                        type="password"
                                        onChange={(text, e) => onChange(e)} 
                                        value={value} 
                                        placeholder="Password" 
                                    />}
                                />
                            {errors.password?.type === 'required' && <Danger>*This field is required</Danger>}
                        </FormGroup>
                        <Button block appearance="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Panel>
            </>
    );
}

export default LoginPage;