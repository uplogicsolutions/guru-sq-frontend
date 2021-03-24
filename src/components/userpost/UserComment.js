import React from 'react';
import { Avatar } from 'rsuite';

const UserComment = props => {


    return (
        <div className="flex flex-row p-2 items-center border mt-1">
            <Avatar className="flex-none self-start" />
            <div className="ml-2 flex flex-col">
                <p className="self-start">
                    {props.comment.comment}
                </p>
                {/* TODO Check if the comment is of current user, then show delete button */}
                {/* <small className="cursor-pointer "><a className="text-gray-400" onClick={() => alert('Delete Comment')}>Delete</a></small> */}
            </div>
        </div>
    )
}

export default UserComment;