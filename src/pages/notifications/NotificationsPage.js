import NotificationCard from 'components/notification/NotificationCard';
import BasePage from 'pages/base/BasePage';
import React, {useEffect} from 'react';
import { Col, Grid, Row } from 'rsuite';
import { useSelector, useDispatch } from 'react-redux';
import { getNotifications, readNotifications } from './store';

const NotificationPage = props => {
    const dispatch = useDispatch()
    const { loading, notifications, error } = useSelector(state => state.notifications)

    useEffect(() => {
        dispatch(getNotifications());
    }, [])

    useEffect(() => {
        dispatch(readNotifications());
    },[])

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
                        {
                            notifications && notifications !== undefined &&
                            notifications.map( (notification, index) =>
                                <NotificationCard notification_type={notification.type} notification_text={notification.description} />
                            )
                        }
                    </Col>
                </Row>
            </Grid>
        </BasePage>
    )
}

export default NotificationPage;