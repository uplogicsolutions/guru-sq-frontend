import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Logo from 'assets/gurusq.png';
import Sqaure from 'assets/gradient50.png';
import Landing from 'assets/landing.mp4'
import { Button, Col, Input, Row, Alert } from 'rsuite';
import { setLoading, setRedirect, setRedirectUrl, setLoggedIn } from 'auth/store';
import { register } from 'api/auth';

const LandingPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { loading } = useSelector((state) => state.auth);
    const history = useHistory();
    const dispatch = useDispatch();

    const handleRegister = async () => {
        dispatch(setLoading(true));
        let response = await register({username, password});
        dispatch(setLoading(false))
        if(response.type == 'success') {
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
            <h1>loading....</h1>
            :
            <div className="p-5" style={{ height: '100vh', position: 'relative', overflowX: 'hidden' }}>
                <header>
                    <img className="p-5" height={100} width={250} src={Logo} />
                </header>
                <img src={Sqaure} width={500} height={500} style={{ position: 'absolute', top: -80, right: -90, rotate: '65deg' }} />

                <div style={{ position: 'relative' }} className="flex flex-col">
                    <Row className="p-5 mt-3">
                        <Col xs={24} md={8}>
                            <Input name="username" className="" value={username} onChange={(val) => setUsername(val)} placeholder="Username" />
                        </Col>
                        <Col xs={24} md={8}>
                            <Input name="password" className="" value={password} onChange={(val) => setPassword(val)} placeholder="Password" type="password" />
                        </Col>
                        <Col xs={24} md={8}>
                            <div className="flex flex-col">
                                <Button appearance="primary" className="" onClick={handleRegister}>Register</Button>
                                <a className="self-center" style={{cursor: "pointer"}} onClick={() => history.push('/login')}>Already registered? Login</a>
                            </div>
                        </Col>

                    </Row>
                    <hr />
                    <div className="p-5 flex justify-center w-full" >
                        <video autoPlay loop controls muted className="w-full" style={{ height: 'auto' }} >
                            <source src={Landing} type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div>
    )
}

export default LandingPage