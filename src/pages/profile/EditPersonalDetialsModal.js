import React from 'react';
import { Modal, Button, Input, Row, Col } from 'rsuite';

const EditBasicDetailsModal = props => {

    const { backdrop, show, close } = props;

    return (
        <Modal autoFocus backdrop={backdrop} show={show} onHide={close}>
            <Modal.Header>
                <Modal.Title>Edit Basic Details</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{overflow:'hidden'}}  className="m-0 p-0">
                <Row>
                    <Col xs={24} md={12}>
                        <Input placeholder="First Name" />

                    </Col>
                    <Col xs={24} md={12}>
                        <Input placeholder="Last Name" />
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={close} appearance="primary">
                    Save
                </Button>
                <Button onClick={close} appearance="subtle">
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )

}

export default EditBasicDetailsModal;