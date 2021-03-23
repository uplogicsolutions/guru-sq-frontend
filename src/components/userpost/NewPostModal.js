import React from 'react';
import { addPost } from 'pages/home/store';
import { Button, Input, Loader, Modal, Uploader } from 'rsuite';
import { useDispatch } from 'react-redux';
import { useState } from 'react/cjs/react.development';

const NewPostModal = ({ handleClose, show, postType }) => {
    const dispatch = useDispatch()
    const [files, setFiles] = useState()
    const [post_description, setPostDescription] = useState('')

    let accept;
    switch (postType) {
        case 'image': accept = "image/png, image/jpeg";
            break;
        case 'video': accept = "video/*";
            break;
        case 'audio': accept = "audio/*"
            break;
        default:
            break;
    }

    const handleUpload = async (files) => {
        if (postType === 'text')
            await handleAdd(null, postType, post_description, "Public");
        else {
            const file = files[0];
            await handleAdd(file, postType, post_description, "Public");
        }
        handleClose();
    }

    const handleAdd = (file, post_type, post_description, visibility) => {
        let data = {
            file,
            post_type,
            post_description,
            visibility
        };
        dispatch(addPost(data));
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>New Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    postType !== 'text'
                        ?
                        <React.Fragment>
                            <Input componentClass="textarea" rows={5} onChange={(text) => setPostDescription(text)} placeholder="What's your thought ?" />
                            <Uploader className="mt-2" autoUpload={false} multiple={false} accept={accept} draggable onChange={(files) => setFiles(files)}>
                                <div>
                                    Click or Drag files to this area to upload your {postType}
                                </div>
                            </Uploader>
                        </React.Fragment>
                        :
                        <Input componentClass="textarea" rows={5} onChange={(text) => setPostDescription(text)} placeholder="What's your thought ?" />

                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => handleUpload(files)} appearance="primary">
                    Ok
            </Button>
                <Button onClick={handleClose} appearance="subtle">
                    Cancel
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default NewPostModal;