import NotificationCard from 'components/notification/NotificationCard';
import BasePage from 'pages/base/BasePage';
import React from 'react';
import { Col, Grid, Row } from 'rsuite';

const NotificationPage = props => {
    return (
        <BasePage>
            <Grid className="px-2 md:px-5" fluid>
                <Row>
                    <Col className="border my-2 p-2 h-30" xsHidden md={6}>
                        <img
                            className=""
                            src="http://mediatreeglobal.com//assets/img/business/advertiser.png"
                        />
                    </Col>
                    <Col xs={24} md={18}>
                        <NotificationCard notification_type='like' notification_text='This is test notification' />
                        <NotificationCard notification_type='comment' notification_text='This is test notification' />
                    </Col>
                </Row>
            </Grid>
        </BasePage>
    )
}

export default NotificationPage;