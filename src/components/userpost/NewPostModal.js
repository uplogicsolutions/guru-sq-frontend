import React, { useState } from 'react';
import { FaFile } from 'react-icons/fa';
import { Button, Col, Grid, Input, Modal, Row, Uploader } from 'rsuite';
import PlaceholderParagraph from 'rsuite/lib/Placeholder/PlaceholderParagraph';

const NewPostModal = ({ handleClose, show, postType }) => {
    console.log(postType)

    let accept;
    switch(postType) {
        case 'img' : accept = "image/png, image/jpeg";
                    break;
        case 'video': accept = "video/*";
                        break;  
        case 'camera': accept = "video/*,image/*"
                        break;
        default:
            break;
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>New Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                {postType === 'text' ? <Input componentClass="textarea" rows={5} placeholder="What's your tought ?" /> : (<Uploader autoUpload={false} multiple={false} accept={accept} draggable>
                    <div>
                        Click or Drag files to this area to upload
                    </div>
                </Uploader>)}
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