import UserCard from "components/userCard/UserCard";
import BasePage from "pages/base/BasePage";
import React, {useState} from "react";
import { Avatar, Button, Col, Grid, Input, Panel, Row } from "rsuite";
import { TabGroup } from '@statikly/funk'

import ChatPage from "./ChatPage";

const Tabs = ({ color }) => {

    const Users = [
        { user_name: 'Shubham' },
        { user_name: 'Test User' },
        { user_name: 'Me' },
        { user_name: 'First' },
        { user_name: 'Second' },
        { user_name: 'Thrid' },
        { user_name: 'Fourth' },
        { user_name: 'Fifth' },
        { user_name: 'Sixth' },
        { user_name: 'Last' }
    ]

    const current_user = '123';
    const [input_message, setInputMessage] = useState('');
    const [messages, setMessages] = useState([
        {
            'user_id' : '123',
            'message' : 'Test Message',
            'time': new Date(),
        },
        {
            'user_id' : '122',
            'message' : 'Test Message 2',
            'time': new Date(),
        }
    ])

    const handleOnSend = () => {
        
        if(input_message === ''){
            return
        }
        
        setMessages([
            ...messages,
            {
                user_id: '122',
                message: input_message,
                time: new Date()
            }
        ])
        setInputMessage('')
    }

    return (
        <BasePage>
            <Grid className=" px-2 md:px-5 h-screen max-h-100-vh" fluid>
                <Row className="h-full max-h-full">
                    <Col className="my-2 h-full max-h-full flex flex-col" xs={24} md={24}>
                        <Panel className="m-0 mb-2 p-0 flex-shrink-0" bordered>
                            <p className="font-semibold g-primary-color">ClusterName</p>
                        </Panel>
                        <Panel className="mb-2 flex-shrink-0" header={<p className="font-semibold g-primary-color">Users</p>} collapsible bordered>
                            <div className="flex justify-center flex-row flex-wrap">
                                {Users.map((user, index) => (
                                    <div className="w-full md:w-1/4 py-2">
                                        <UserCard key={index} user_name={user.user_name} />
                                    </div>
                                ))}
                            </div>
                        </Panel>
                        <div className="flex-grow h-screen max-h-screen bg-gray-100 border" bordered>
                            <div className="w-full  h-full max-h-full flex flex-col">
                                <TabGroup className="sticky top-0" numTabs={3} direction={TabGroup.direction.HORIZONTAL}>
                                    <TabGroup.TabList>
                                        <TabGroup.Tab
                                            index={0}
                                            className="h-12 px-12 transition-colors duration-150"
                                            activeClassName="bg-black text-white"
                                            inactiveClassName="text-black">
                                            Activities    
                                        </TabGroup.Tab>
                                        <TabGroup.Tab
                                            index={1}
                                            className="h-12 px-12 transition-colors duration-150"
                                            activeClassName="bg-black text-white"
                                            inactiveClassName="text-black">
                                            Discuss
                                        </TabGroup.Tab>
                                        <TabGroup.Tab
                                            index={2}
                                            className="h-12 px-12 transition-colors duration-150"
                                            activeClassName="bg-black text-white"
                                            inactiveClassName="text-black">
                                            Review
                                        </TabGroup.Tab>
                                    </TabGroup.TabList>
                                    <TabGroup.TabPanel
                                        index={0}
                                        className="p-16 transition-all transform h-64"
                                        activeClassName="opacity-100 duration-500 translate-x-0"
                                        inactiveClassName="absolute opacity-0 -translate-x-2"
                                    >
                                        Content 1
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    </TabGroup.TabPanel>
                                    <TabGroup.TabPanel
                                        index={1}
                                        className=" transition-all transform flex flex-col w-full h-full bg-red-100"
                                        activeClassName="opacity-100 duration-500 translate-x-0 overflow-y-auto"
                                        inactiveClassName="opacity-0 -translate-x-2">

                                        <div className="w-full h-full overflow-y-auto bg-red-100 mb-5 flex flex-col justify-end items-end">
                                            
                                            {messages.map(message => (
                                                <div className={`flex px-4 my-2 w-max justify-start ${message.user_id === current_user ? 'self-start' : 'self-end'} items-center bg-green-100 flex-row`}>
                                                    <div className="mx-2 my-2 p-2">
                                                        {message.message}
                                                    </div>
                                                    <Avatar className="flex-grow-0"/>
                                                </div>
                                            ))}
                                            
                                        </div>
                                        <div className="fixed h-10 bottom-0 bg-white w-full">
                                            <Input 
                                                className="h-full w-11/12" 
                                                value={input_message} 
                                                onChange={(text) => setInputMessage(text)}
                                                placeholder="Type message" />
                                            <Button onClick={handleOnSend} className="h-full w-1/12">Send</Button>
                                        </div>
                                    </TabGroup.TabPanel>
                                    <TabGroup.TabPanel
                                        index={2}
                                        className="p-16 transition-all transform h-64"
                                        activeClassName="opacity-100 duration-500 translate-x-0"
                                        inactiveClassName="absolute opacity-0 -translate-x-2"
                                    >
                                        Content 3
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
            <Tabs color="gold" />;
        </>
    );
}
