import React from 'react';
import { FaRegCommentAlt, FaRegThumbsUp } from 'react-icons/fa';

const NotificationCard = props => {

    const { notification_type, notification_text } = props;


    const renderIcon = (notification_type) => {
        if (notification_type === 'like') {
            return <div class="w-auto p-4 h-auto bg-gray-200 rounded-full"><FaRegThumbsUp className="g-primary-color" size="15" /></div>;
        } else if (notification_type === 'comment') {
            return <div class="w-auto p-4 h-auto bg-gray-200 rounded-full"><FaRegCommentAlt className="g-primary-color" size="15" /></div>;
        }
    }

    const renderText = (notification_type) => {
        if (notification_type === 'like') {
            return <h6>New Like on your post!</h6>;
        } else if (notification_type === 'comment') {
            return <h6>New Comment on your post!</h6>;
        }
    }
    return (
        <div bordered class="shadow border flex my-2 flex-row items-center p-2 md:p-0">
            <div className="flex items-center py-2 px-3">
                {renderIcon(notification_type)}
            </div>
            <div class="py-2 text-left">
                <p class="font-normal">
                    {renderText(notification_type)}
                </p>
                <figcaption class="font-medium">
                    <div class="text-gray-500">
                        {notification_text}
                    </div>
                </figcaption>
            </div>
        </div>
    )
}

export default NotificationCard