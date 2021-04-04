import UserCard from "components/userCard/UserCard";
import BasePage from "pages/base/BasePage";
import React, { useState, useEffect, useRef } from "react";
import { Avatar, Button, Col, Grid, Input, Panel, Row } from "rsuite";
import { TabGroup } from '@statikly/funk'
import { useSelector, useDispatch } from 'react-redux';
import { getClusterUsers, getClusterMessages, sendClusterMessage, handleClusterMessageEvent } from './store';
import socket from '../../socket';

const Tabs = () => {
    const [input_message, setInputMessage] = useState('');
    const dispatch = useDispatch()
    const { loading, users, messages, error } = useSelector(state => state.cluster)
    const { user_id } = useSelector(state => state.auth.user)

    const scrollToRef = useRef(null);

    useEffect(() => {
        scrollToRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    useEffect(() => {
        dispatch(getClusterUsers());
        dispatch(getClusterMessages());
    }, [])

    const handleOnSend = async () => {
        if (input_message === '') {
            return
        }
        await dispatch(sendClusterMessage({
            message: input_message
        }));
        dispatch(getClusterMessages());
        setInputMessage('')
        scrollToRef.current?.scrollIntoView({ behavior: "smooth" })

    }

    socket.on('cluster_messages', (data) => {
        dispatch(handleClusterMessageEvent(data));
        scrollToRef.current?.scrollIntoView({ behavior: "smooth" })
    })

    return (
        <BasePage>
            <Grid style={{ minHeight: 'calc(100vh - 70px)', maxHeight: 'calc(100vh - 70px)', height: 'calc(100vh - 70px) !important' }} className=" px-2 md:px-5 h-screen overflow-hidden" fluid>
                <Row className="h-full">
                    <Col className="my-2 h-full flex flex-col" xs={24} md={24}>
                        {/* <Panel className="m-0 mb-2 p-0 flex-shrink-0" bordered>
                            <p className="font-semibold g-primary-color">ClusterName</p>
                        </Panel> */}
                        <Panel className="mb-2 flex-shrink-0" header={<p className="font-semibold g-primary-color">Cluster Name</p>} collapsible bordered>
                            <div className="flex justify-center flex-row flex-wrap">
                                {users && users.map((user, index) => (
                                    <div className="w-full md:w-1/4 py-2">
                                        <UserCard key={index} user_name={user.name} profile={user.profileImage} />
                                    </div>
                                ))}
                            </div>
                        </Panel>
                        <div className="flex-grow h-screen bg-gray-100 border" bordered>
                            <div className="w-full h-full flex flex-col">
                                <TabGroup className="sticky top-0" numTabs={3} direction={TabGroup.direction.HORIZONTAL}>
                                    <TabGroup.TabList className="border bg-white">
                                        <TabGroup.Tab
                                            index={0}
                                            className="h-12 px-12 transition-colors duration-150"
                                            activeClassName="bg-black text-white"
                                            inactiveClassName="text-black">
                                            Discuss
                                        </TabGroup.Tab>
                                    </TabGroup.TabList>

                                    <TabGroup.TabPanel
                                        index={0}
                                        className=" transition-all transform flex flex-col w-full h-full"
                                        activeClassName="opacity-100 duration-500 translate-x-0"
                                        inactiveClassName="opacity-0 hidden -translate-x-2">

                                        <div className="w-full h-full overflow-y-auto mb-10 flex-col" style={{ flexGrow: 1, flexShrink: 1, flexBasis: 0 }}>

                                            {messages.map(message => (
                                                <div className={`flex px-4 my-2 w-max ${message.sender_id === user_id ? 'self-end' : 'self-start'} items-center bg-green-100 flex-row`}>
                                                    <div className="mx-2 my-2 p-2">
                                                        {message.message}
                                                    </div>
                                                    <Avatar className="flex-grow-0" />
                                                </div>
                                            ))}
                                            <div ref={scrollToRef} />
                                        </div>
                                        <div className="fixed flex h-10 bottom-0 mb-2 bg-white w-full">
                                            <Input
                                                className="h-full"
                                                value={input_message}
                                                onChange={(text) => setInputMessage(text)}
                                                placeholder="Type message" />
                                            <Button onClick={handleOnSend} className="h-full">Send</Button>
                                        </div>
                                    </TabGroup.TabPanel>
                                </TabGroup>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Grid>
        </BasePage>
    );
};

export default function ClusterPage() {
    return (
        <>
            <Tabs color="gold" />
        </>
    );
}
