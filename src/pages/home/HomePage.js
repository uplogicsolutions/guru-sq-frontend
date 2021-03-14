import React, { useEffect } from 'react';
import {useHistory} from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { loadPosts, likePost, commentPost } from './store';
import UserPost from "components/userpost/UserPost";
import BasePage from "pages/base/BasePage";
import NewPostModal from 'components/userpost/NewPostModal';

import {
    Icon,
    Grid,
    Row,
    Col,
    Panel,
    Input,
    InputGroup,
    Button
} from "rsuite";
import {
    FaImage,
    FaVideo,
    FaListUl,
    FaCamera,
    FaAudible,
    FaSpeakerDeck,
    FaMusic

} from "react-icons/fa";
import ButtonCard from "components/buttonCard/ButtonCard";
import { useState } from 'react/cjs/react.development';
import { getAuth } from 'auth/store';

const username = "Jhon";


const Homepage = () => {

    const [accept, setAccept] = useState("")
    const [showNewPostModal, setShowNewPostModal] = useState(false)
    const handleClose = () => setShowNewPostModal(false);
    const dispatch = useDispatch()
    const { loading, posts, error } = useSelector(state => state.post)
    const {push} = useHistory()

    useEffect(() => {
        dispatch(getAuth())
        dispatch(loadPosts())
    }, [])

    const handleLike = (post_id) => {
        let data = {
            post_id
        };
        dispatch(likePost(data));
    }

    const handleComment = (post_id, comment) => {
        let data = {
            post_id,
            comment
        };
        dispatch(commentPost(data));
    }

    const showModal = (type) => {
        setShowNewPostModal(true);
        setAccept(type);
    }

    return (
        <BasePage>
            <Grid fluid style={{ paddingTop: 12, background: '#f3f2ef' }}>
                <Row>
                    <Col xs={20} md={18}>
                        {showNewPostModal && <NewPostModal show={showNewPostModal} handleClose={handleClose} postType={accept}/>}
                    </Col>
                </Row>
                <Row>
                    <Col xsHidden md={5}>
                        <Panel bordered header="Summary">
                            <Button onClick={() => push('/profile')}>ProfilePage</Button>
                        </Panel>
                    </Col>
                    <Col xs={24} md={14}>
                        {/* Upper Post Box */}
                        <Panel className="custom-card bg-custom-gray" bordered>
                            <Row>
                                <InputGroup>
                                    <Input icon block placeholder={`Hi ${username}, Anything for today ?`} />
                                    <InputGroup.Addon>
                                        <Icon icon="question" />
                                    </InputGroup.Addon>
                                </InputGroup>
                            </Row>
                            <Row style={{ marginTop: 12 }}>
                                <Col xs={12} md={6}>
                                    <ButtonCard onClick={() => showModal("image")} label="Photo">
                                        <FaImage style={{ margin: "0 5px" }} color="lightblue" size="20" />
                                    </ButtonCard>
                                </Col>
                                <Col xs={12} md={6}>
                                    <ButtonCard onClick={() => showModal("video")} label="Video">
                                        <FaVideo style={{ margin: "0 5px" }} color="salmon" size="20" />
                                    </ButtonCard>
                                </Col>
                                <Col xs={12} md={6}>
                                    <ButtonCard onClick={() => showModal("text")} label="Text">
                                        <FaListUl style={{ margin: "0 5px" }} color="yellowgreen" size="20" />
                                    </ButtonCard>
                                </Col>
                                <Col xs={12} md={6}>
                                    <ButtonCard onClick={() => showModal("audio")} label="Audio">
                                        <FaMusic style={{ margin: "0 5px" }} color="gold" size="20" />
                                    </ButtonCard>
                                </Col>
                            </Row>
                        </Panel>
                        <hr />
                        {/* User Post's */}
                        {
                            posts.map( (post, index) =>
                                <UserPost key={index} post={post} handleLike={handleLike} />)
                        }
                    </Col>
                    <Col xsHidden md={5} />
                    
                </Row>
            </Grid>
        </BasePage>
    )
}

export default Homepage