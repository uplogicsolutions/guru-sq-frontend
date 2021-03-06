import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadPosts, likePost, commentPost, addPost } from './store';
import UserPost from "components/userpost/UserPost";
import BasePage from "pages/base/BasePage"
import {
    Icon,
    Grid,
    Row,
    Col,
    Panel,
    Input,
    InputGroup
} from "rsuite";
import {
    FaImage,
    FaVideo,
    FaListUl,
    FaCamera

} from "react-icons/fa";
import ButtonCard from "components/buttonCard/ButtonCard";

const username = "Jhon";
const Homepage = () => {
    const dispatch = useDispatch()
    const { loading, posts, error } = useSelector(state => state.post)

    useEffect(() => {
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

    const handleAdd = (file, post_type, post_description, visibility) => {

        let data = {
            file,
            post_type,
            post_description,
            visibility
        };
        dispatch(addPost(data));
    }

    return (
        <BasePage>
            <Grid fluid style={{ paddingTop: 12, background: '#f3f2ef' }}>
                <Row>
                    <Col xsHidden md={5}>
                        <Panel bordered header="Summary">

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
                                    <ButtonCard label="Photo">
                                        <FaImage style={{ margin: "0 5px" }} color="lightblue" size="20" />
                                    </ButtonCard>
                                </Col>
                                <Col xs={12} md={6}>
                                    <ButtonCard label="Video">
                                        <FaVideo style={{ margin: "0 5px" }} color="salmon" size="20" />
                                    </ButtonCard>
                                </Col>
                                <Col xs={12} md={6}>
                                    <ButtonCard label="Text">
                                        <FaListUl style={{ margin: "0 5px" }} color="yellowgreen" size="20" />
                                    </ButtonCard>
                                </Col>
                                <Col xs={12} md={6}>
                                    <ButtonCard label="Camera">
                                        <FaCamera style={{ margin: "0 5px" }} color="gold" size="20" />
                                    </ButtonCard>
                                </Col>
                            </Row>
                        </Panel>
                        <hr />
                        {/* User Post's */}
                        <UserPost />


                    </Col>
                    <Col xsHidden md={5} />
                    
                </Row>
            </Grid>
        </BasePage>
    )
}

export default Homepage