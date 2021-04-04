import React from 'react';
import { Avatar } from 'rsuite';
import { useHistory } from 'react-router-dom';

const UserCard = props => {

    const history = useHistory();
    const { user_name, profile, user_id } = props;

    return (<div className="flex items-center flex-row cursor-pointer">
        <Avatar src={profile} circle/>
        <a className="" onClick={() => history.push(`/user-profile/${user_id}`)} className="px-2 font-semibold">{user_name}</a>
    </div>
    )
}
export default UserCard;