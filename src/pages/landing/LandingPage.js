import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Logo from 'assets/gurusq.png';
import Sqaure from 'assets/gradient50.png';
import Landing from 'assets/landing.mp4'
import { Button, Col, Input, Row } from 'rsuite';
import { checkAuth } from 'auth/store';

const LandingPage = () => {
    const { loading, redirect, redirectUrl } = useSelector((state) => state.auth);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuth())
    }, []);

    if (redirect) {
        history.push(redirectUrl)
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
                            <Input className="" placeholder="Username" />
                        </Col>
                        <Col xs={24} md={8}>
                            <Input className="" placeholder="Password" type="password" />
                        </Col>
                        <Col xs={24} md={8}>
                            <div className="flex flex-col">
                                <Button appearance="primary" className="">Register</Button>
                                <a className="self-center">Already registered? Login</a>
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