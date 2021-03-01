import React from 'react';
import { Col, Icon, Panel, Row, Button } from 'rsuite';
import { FaHeart } from 'react-icons/fa'
import Logo from 'assets/gurusq.png';


const UserPost = props => (
    <Panel style={{ marginTop: 12 }} shaded bordered>
        <Row>
            <Col xs={24} md={24}>
                <Row>
                    <Col xs={4} md={2}>
                        <Icon icon="user-circle" size="3x" />
                    </Col>
                    <Col xs={20} md={22}>
                        <h6>John</h6>
                        <p>International School, Pune</p>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row style={{ marginTop: 12 }}>
            <Col xs={24} md={24}>
                <Panel bordered>
                    <img width="100%" src={Logo} />
                </Panel>
            </Col>
        </Row>
        <Row style={{ marginTop: 12 }}>
            <Col xs={6} md={4}>
                <Button appearance="default">
                    <FaHeart icon="heart" /> Like
                </Button>
            </Col>
            <Col xs={6} md={4}>
                <Button appearance="default">
                    <Icon icon="commenting" /> Comment
                </Button>
            </Col>
            <Col xs={6} md={4}>
                <Button appearance="default">
                    <Icon icon="share-alt" /> Share
                </Button>
            </Col>
        </Row>
    </Panel>
)

export default UserPost;