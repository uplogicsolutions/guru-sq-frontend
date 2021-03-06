import React from 'react';
import { addPost } from 'pages/home/store';
import { Button, Input, Modal, Uploader } from 'rsuite';
import { useDispatch } from 'react-redux';

const NewPostModal = ({ handleClose, show, postType }) => {
    const dispatch = useDispatch()
    let accept;
    switch (postType) {
        case 'image': accept = "image/png, image/jpeg";
            break;
        case 'video': accept = "video/*";
            break;
        case 'camera': accept = "video/*,image/*"
            break;
        default:
            break;
    }

    const handleUpload = (files) => {
        const file = files[0];
        handleAdd(file, postType, "Testing", "Public");
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
                    postType === 'text'
                        ?
                        <Input componentClass="textarea" rows={5} placeholder="What's your thought ?" />
                        :
                        <Uploader autoUpload={false} multiple={false} accept={accept} draggable onChange={handleUpload}>
                            <div>
                                Click or Drag files to this area to upload
                            </div>
                        </Uploader>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} appearance="primary">
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