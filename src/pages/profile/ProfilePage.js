import BasePage from 'pages/base/BasePage';
import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { Col, Grid, Row, Sidenav, Nav, Icon, Panel, Avatar, FlexboxGrid, Button } from 'rsuite';

const ProfilePage = props => {

    return (
        <BasePage>
            <Grid fluid>
                <Row>
                    <Col>
                        <div style={{ height: '100vh' }} id="personal_details">

                            <Row>
                                <Col xs={4} md={4}>
                                </Col>
                                <Col xs={20} md={20}>
                                    <Panel bordered className="custom-card" style={{ marginLeft: 12, marginRight: 12 }}>
                                        <Grid>
                                            <Row>
                                                <Col xs={6} md={3}>
                                                    <Avatar size="lg" />
                                                </Col>
                                                <Col xs={12} md={19}>
                                                    <Row>
                                                        <Col>
                                                            <b>John</b>
                                                        </Col>
                                                        <Col>
                                                            Pune International School
                                                        </Col>
                                                        <Col>
                                                            Maharashtra
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col style={{ display: 'flex', justifyContent: 'flex-end' }} xs={2} md={2}>
                                                    <Button style={{ background: 'transparent' }}>
                                                        <FaEdit />
                                                    </Button>
                                                </Col>
                                            </Row>

                                        </Grid>
                                    </Panel>

                                </Col>
                            </Row>
                        </div>
                        <div style={{ height: '100vh' }} id="personal_details">
                            Profile
                        </div>

                    </Col>
                </Row>
            </Grid>
        </BasePage >
    )

}

export default ProfilePage;