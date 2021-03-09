import React from 'react';
import { Avatar } from 'rsuite';

const UserComment = props => (
    <div className="flex flex-row p-2 items-center border mt-1">
        <Avatar className="flex-none self-start"/>
        <div className="ml-2 flex flex-col">
            <p className="self-start">Comment is larger than expected so 
            what now, how will flex box worl in this, need to add more text
            Trying to add more text, or else we can limit the  number of characters in comment section
            </p>
            {/* TODO Check if the comment is of current user, then show delete button */}
            <small className="cursor-pointer "><a className="text-gray-400" onClick={() => alert('Delete Comment')}>Delete</a></small>
        </div>
    </div>
)

export default UserComment;