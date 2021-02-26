import react, { useState } from 'react'
import { Button, Form, FormControl, FormGroup, Panel, Loader, Alert, Input } from 'rsuite'
import { loginFail, loginPending, loginSuccess } from './store'
import { login } from 'api/auth'
import { useDispatch, useSelector } from 'react-redux'

//Form Validation
import { useForm, Controller } from "react-hook-form";

//Custom Components
import Danger from 'components/alerts/Danger';

const LoginPage = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { control, errors , handleSubmit } = useForm();

    const dispatch = useDispatch()
    const { isLoading, isAuth, error } = useSelector(state => state.login)

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
        
        console.log(data)
        dispatch(loginPending())
        const response = await login(data);
        console.log(response)
        if (response.type == 'success') {
            Alert.success('Login Successfull')
            dispatch(loginSuccess())
        } else {
            dispatch(loginFail(response.message))
        }
    }

    if(isAuth) {
        console.log('Login successful')
        props.history.push('/register')
    }

    return (
        isLoading
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