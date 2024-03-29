import React, { useState } from 'react';
import {
    Col,
    Icon,
    Panel,
    Row,
    Button,
    FlexboxGrid,
    Input,
    InputGroup,
    Avatar
} from 'rsuite';
import {
    FaHeart,
    FaComment,
    FaShare,
    FaThumbsUp,
    FaRegThumbsUp,
} from 'react-icons/fa'
import PrimaryText from 'components/typo/PrimaryText';
import UserComment from './UserComment';
import { useCallback } from 'react';

const UserPost = props => {
    const [comment, setComment] = useState('');
    const { post, handleLike, handleComment } = props

    const renderPost = () => {
        if (post.post_type === 'text') {
            return null;
        } else if (post.post_type === 'image') {
            return <img width="100%" src={post.post_url} />
        } else if (post.post_type === 'video') {
            return <video src={post.post_url} controls disablePictureInPicture />
        } else if (post.post_type === 'audio') {
            return <audio style={{ width: '100%' }} src={post.post_url} controls />
        }
    }

    const handleSendComment = useCallback(async () => {
        if (comment && comment != '') {
            handleComment(post.post_id, comment);
        }
    }, [comment]);

    return (
        <Panel className="border-gray-300" style={{ marginTop: 12 }} bordered>
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
                <Col xs={24} md={24} className="mt-2 mb-2">{post.post_description}</Col>
                <Col xs={24} md={24}>
                    {renderPost()}
                </Col>
            </Row>
            <Row className="m-2 flex justify-start content-end">
                <Col xs={24}>
                    <PrimaryText>
                        <FaRegThumbsUp className="inline" /> {post.likesCount === 1 ? `${post.likesCount} Like` : `${post.likesCount} Likes`}
                    </PrimaryText>
                </Col>
            </Row>
            <hr />
            <Row style={{ marginTop: 12 }}>
                <Col xs={24} md={8}>
                    <FlexboxGrid justify="space-between">
                        <FlexboxGrid.Item >
                            <Button style={{ display: "inline-block" }} appearance="default" onClick={() => handleLike(post.post_id)}>
                                <FaHeart color={`${post.isLiked ? 'red' : ''}`} className="inline" /> Like
                            </Button>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item>
                            <Button appearance="default">
                                <FaComment className="inline" /> Comment
                        </Button>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Col>
            </Row>

            <hr />
            <Row >
                <Col xs={24}>
                    <InputGroup>
                        <Input placeholder="What would you like to comment ?" onChange={(val) => setComment(val)} />
                        <InputGroup.Button appearance="primary">
                            <Button style={{ padding: '0px' }} onClick={handleSendComment} >
                                <Icon icon="send" />
                            </Button>
                        </InputGroup.Button>
                    </InputGroup>
                </Col>
            </Row>
            <hr />
            <Row className="overflow-scroll h-50">
                {
                    post && post.comments &&
                    post.comments.map((comment, index) => (
                        <Col key={index}><UserComment comment={comment}></UserComment></Col>
                    ))
                }
            </Row>
        </Panel>
    )
}

export default UserPost;