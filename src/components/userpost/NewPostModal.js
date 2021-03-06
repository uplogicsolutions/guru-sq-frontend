import React, { useState } from 'react';
import { FaFile } from 'react-icons/fa';
import { Button, Col, Grid, Modal, Row, Uploader } from 'rsuite';
import PlaceholderParagraph from 'rsuite/lib/Placeholder/PlaceholderParagraph';

const NewPostModal = ({ handleClose, show }) => {
    console.log('I Loaded')
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>Modal Title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <PlaceholderParagraph rows={10} />
                <Uploader autoUpload={false} multiple={false} accept="pdf" draggable>
                    <div>
                        Click or Drag files to this area to upload
                    </div>
                </Uploader>
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