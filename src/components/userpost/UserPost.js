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

const UserPost = props => {

    const { post, handleLike } = props

    return (
        <Panel className="custom-card bg-custom-gray" style={{ marginTop: 12 }} bordered>
            <Row>
                <Col xs={24} md={24}>
                    <Row>
                        <Col xs={4} md={2}>
                            <Icon icon="user-circle" size="3x" />
                        </Col>
                        <Col xs={20} md={22}>
                            <h6>{post.firstName} {post.lastName}</h6>
                            <p>International School, Pune</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row style={{ marginTop: 12 }}>
                <Col xs={24} md={24}>
                    <Panel bordered>
                        <img width="100%" src={post.post_url} />
                    </Panel>
                </Col>
            </Row>
            <hr />
            <Row style={{ marginTop: 12 }}>
                <small>{post.likesCount}</small>
            </Row>
            <hr />
            <Row style={{ marginTop: 12 }}>
                <Col xs={24} md={10}>
                    <FlexboxGrid justify="space-between">
                        <FlexboxGrid.Item >
                            <Button style={{display:"inline-block"}} appearance="default" onClick={() => handleLike(post.post_id)}>
                                <FaHeart color={`${post.isLiked ? 'red' : ''}`} className="inline" /> Like                            
                            </Button>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item>
                            <Button appearance="default">
                                <FaComment className="inline"  /> Comment
                        </Button>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item>
                            <Button appearance="default">
                                <FaShare className="inline"  /> Share
                        </Button>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Col>
            </Row>
        </Panel>
    )
}

export default UserPost;