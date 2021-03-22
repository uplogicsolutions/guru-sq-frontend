import React from 'react';
import { Avatar } from 'rsuite';

const UserCard = props => {

    const { user_name } = props;

    return (<div className="flex items-center flex-row">
        <Avatar circle/>
        <p className="px-2 font-semibold">{user_name}</p>
    </div>
    )
}
export default UserCard;