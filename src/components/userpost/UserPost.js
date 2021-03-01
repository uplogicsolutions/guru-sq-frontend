import React from 'react';
import {
    Col,
    Icon,
    Panel,
    Row,
    Button,
    FlexboxGrid
} from 'rsuite';
import {
    FaHeart,
    FaComment,
    FaShare,
} from 'react-icons/fa'
import Logo from 'assets/gurusq.png';


const UserPost = props => {

    const { isLiked } = props;

    return (
        <Panel className="custom-card bg-custom-gray" style={{ marginTop: 12 }} bordered>
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
                <Col xs={24} md={10}>
                    <FlexboxGrid justify="space-between">
                        <FlexboxGrid.Item >
                            <Button appearance="default">
                                <FaHeart color={`${isLiked ? 'red' : ''}`} /> Like
                        </Button>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item>
                            <Button appearance="default">
                                <FaComment /> Comment
                        </Button>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item>
                            <Button appearance="default">
                                <FaShare /> Share
                        </Button>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Col>
            </Row>
        </Panel>
    )
}

export default UserPost;