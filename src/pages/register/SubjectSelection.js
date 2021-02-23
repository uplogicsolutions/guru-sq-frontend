import React, { useState } from 'react';
import { Panel, Row, Col, Input, Form, DatePicker, InputPicker, Button, IconButton, Icon, TagPicker } from 'rsuite';

const SubjectSelection = props => {

    const [core_subjects, setCoreSubjects] = useState([])
    const [improvement_subjects, setImprovementSubjects] = useState([])
    const [professional_guidance_subjects, setProfessionalGuidanceSubjects] = useState([])

    const subjects =[
        {
            "label": "Maths",
            "value": "0",
            "role": ""
        },
        {
            "label": "Science",
            "value": "1",
            "role": ""
        },
        {
            "label": "English",
            "value": "2",
            "role": ""
        }
    ]

    const handleSubmit = () => {
        const data = {
            core_subjects,
            improvement_subjects,
            professional_guidance_subjects
        }

        console.log(data);
    }
    return (
        <Panel style={{ background: 'white' }} shaded>
            <Form>
                <Row>
                    <Col xs={24} sm={24} md={24}>
                        <h5>Which subjects are your core ?</h5>
                    </Col>
                    <Col className="mt-2" xs={24} sm={24} md={24}>
                    <TagPicker
                        block
                        data={subjects}
                        onSelect={(val) => { setCoreSubjects(val)}}
                        placeholder="Select Core Subjects"
                    />
                    </Col>     
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={24}>
                        <h5>Subjects you can improve ?</h5>
                    </Col>
                    <Col className="mt-2" xs={24} sm={24} md={24}>
                    <TagPicker
                        block
                        data={subjects}
                        onSelect={(val) => { setImprovementSubjects(val)}}
                        placeholder="Select Imrpovement Subjects"
                    />
                    </Col>     
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={24}>
                        <h5>Subjects you prefer professional guidance ?</h5>
                    </Col>
                    <Col className="mt-2" xs={24} sm={24} md={24}>
                    <TagPicker
                        block
                        data={subjects}
                        onSelect={(val) => { setProfessionalGuidanceSubjects(val)}}
                        placeholder="Select Guidance Subjects"
                    />
                    </Col>     
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={24}>
                        <Button onClick={handleSubmit} block appearance="primary"> <b>CONTINUE</b> </Button>
                    </Col>
                </Row>
            </Form>
        </Panel>
    )
}

export default SubjectSelection;