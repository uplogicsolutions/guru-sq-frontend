import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Logo from 'assets/gurusq.png';
import Sqaure from 'assets/gradient50.png';
import Landing from 'assets/landing.mp4'
import { Button, Col, Input, Row, Alert, Loader, FormGroup, Form } from 'rsuite';
//Form Validation
import { useForm, Controller } from "react-hook-form";

//Custom Components
import Danger from 'components/alerts/Danger';
import { setLoading, setRedirect, setRedirectUrl, setLoggedIn } from 'auth/store';
import { register } from 'api/auth';

const LandingPage = () => {
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    const { loading } = useSelector((state) => state.auth);
    const history = useHistory();
    const dispatch = useDispatch();

    const { control, errors, handleSubmit } = useForm();

    const isValidUsername = (username) => {
        const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const mobile_regex = /^([6-9][0-9]{9})$/
        if (email_regex.test(username))
            return true
        else if (mobile_regex.test(username))
            return true
        return false
    }
    const handleRegister = async (data) => {
        dispatch(setLoading(true));
        const { username, password } = data;
        console.log(username, password);
        return;
        let response = await register({ username, password });
        dispatch(setLoading(false))
        if (response.type == 'success') {
            Alert.success('Yay! Registration Successfull');
            dispatch(setLoggedIn(true));
            dispatch(setRedirectUrl('/personal-details'));
            dispatch(setRedirect(true));
        } else {
            Alert.error(response.message);
        }
    }

    return (
        loading
            ?
            <Loader size='md' center={true} />
            :
            <div className="p-1" style={{ height: '100vh', position: 'relative', overflowX: 'hidden' }}>
                <header>
                    <img className="pt-2 pl-2" height={90} width={240} src={Logo} />
                </header>
                <img src={Sqaure} width={500} height={500} style={{ position: 'absolute', top: -80, right: -90, rotate: '65deg' }} />

                <div style={{ position: 'relative' }} className="flex flex-col">
                    <Form onSubmit={handleSubmit(handleRegister)}>
                        <Row className="p-3 mt-3">
                            <Col className="mt-2 md:mt-0" xs={24} md={8}>
                                <FormGroup>
                                    <Controller
                                        name="username"
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: true,
                                            validate: value => isValidUsername(value)
                                        }}
                                        render={({ onChange, value }) =>
                                            <Input
                                                name="username"
                                                onChange={(text, e) => onChange(e)}
                                                value={value}
                                                placeholder="Mobile or Email"
                                            />
                                        }
                                    />
                                    
                                    {errors.username?.type === 'required' && <Danger>*This field is required</Danger>}
                                    {errors.username?.type === 'validate' && <Danger>*Please enter valid mobile or email</Danger>}
                                </FormGroup>
                            </Col>
                            <Col className="mt-2 md:mt-0" xs={24} md={8}>
                                {/* <Input name="password" className="" value={password} onChange={(val) => setPassword(val)} placeholder="Password" type="password" /> */}
                            </Col>
                            <Col className="mt-2 md:mt-0" xs={24} md={8}>
                                <div className="flex flex-col">
                                    <Button appearance="primary" type="submit" className="">Register</Button>
                                    <a className="mt-1 self-center" style={{ cursor: "pointer" }} onClick={() => history.push('/login')}>Already registered? Login</a>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                    <hr />
                    <div className="p-3 flex justify-center w-full" >
                        <video autoPlay loop controls muted className="w-full" style={{ height: 'auto' }} >
                            <source src={Landing} type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div>
    )
}

export default LandingPage