import UserCard from "components/userCard/UserCard";
import BasePage from "pages/base/BasePage";
import React from "react";
import { Col, Grid, Panel, Row } from "rsuite";
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
    return (
        <BasePage>
            <Grid className=" px-2 md:px-5 h-screen max-h-100-vh" fluid>
                <Row>
                    {/* <Col className="border my-2 p-2 h-30" xsHidden md={6}>
                        <img
                            className=""
                            src="http://mediatreeglobal.com//assets/img/business/advertiser.png"
                        />
                    </Col> */}
                    <Col className="my-2 flex flex-col" xs={24} md={18}>
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
                        <div className="flex-grow bg-gray-100 border"  bordered>
                            <ChatPage />
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
