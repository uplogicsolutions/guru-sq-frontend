import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, FormGroup, Panel, Loader, Input, Alert } from 'rsuite'
import { resetRegisterStates, registerSuccess, registerFailure, registerPending } from 'pages/register/store/registerSlice'
import { register } from 'api/auth';

//Form Validation
import { useForm, Controller } from "react-hook-form";

//Custom Components
import Danger from 'components/alerts/Danger';

const RegisterPage = (props) => {

    const { control, errors , handleSubmit } = useForm();

    const dispatch = useDispatch()
    const { loading, redirect, redirectUrl, error } = useSelector(state => state.register)

    useEffect( () => {
        dispatch(resetRegisterStates())
    },[])

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
        
        console.log('User Data',data);
        
        dispatch(registerPending())
        let response = await register(data);
        if(response.type == 'success') {
            Alert.success('Yay! Registration Successfull')
            dispatch(registerSuccess('/personal-details'))
        } else {
            dispatch(registerFailure(response.message))
        }
    }

    if(redirect) {
        props.history.push(redirectUrl);
    }

    return (
        loading
            ?
            <Loader size='md' center={true} />
            :
            <Panel style={{ background: 'white' }} header={<h3>Register</h3>} shaded>
                <Form>
                    {
                        error &&
                       <Danger>{error}</Danger>
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
                                minLength: 8,
                            }}
                            render={({onChange, value}) => 
                                <Input 
                                    onChange={(text, e) => onChange(e)} 
                                    value={value} 
                                    placeholder="Password" 
                                />}
                            />
                        {errors.password?.type === 'required' && <Danger>*This field is required</Danger>}
                        {errors.password?.type === 'minLength' && <Danger>*Minimum 8 characters are reuired</Danger>}
                    </FormGroup>
                    <Button onClick={handleSubmit(handleOnSubmit)} block appearance="primary">
                        Submit
                </Button>
                </Form>
            </Panel>
    )
}

export default RegisterPage;