import React, { useState } from 'react';
import { Panel, Row, Col, Form, InputPicker, Button } from 'rsuite';

const SchoolTeacher = (props) => {
    const [isSchoolTeacher, setIsSchoolTeacher] = useState(undefined);
    const [teacher_type, setTeacherType] = useState(null);
    const [school_type, setSchoolType] = useState('');
    const [board_of_education, setBoardOfEducation] = useState('');
    const [medium_of_language, setMediumOfLanguage] = useState('');
    const [teaching_license, setTeachingLicense] = useState('');

    const handleYesButton = () => {
        setIsSchoolTeacher(true);
        setTeacherType(0);
    }

    const handleTeacher = (teacher_type) => {
        setTeacherType(teacher_type);
        //TODO Make API Call for updating teacher_type in personal details

        const data = {
            teacher_type
        }
        console.log(data);
    }

    const handleSubmit = () => {

        //TODO make 2 api calls one for personal detail table - data
        //Second for school details table - data1
        const data = {
            teacher_type
        }

        const data1 = {
            school_type,
            board_of_education,
            medium_of_language,
            teaching_license,
        }
        console.log(data, data1)
    }
    const school_type_data = [
        {
            "label": "Private",
            "value": "private",
            "role": ""
        },
        {
            "label": "Goverment",
            "value": "goverment",
            "role": ""
        }
    ]
    const board_of_education_data = [
        {
            "label": "CBSE",
            "value": "CBSE",
            "role": ""
        },
        {
            "label": "International",
            "value": "International",
            "role": ""
        }
    ]
    const medium_of_language_data = [
        {
            "label": "English",
            "value": "english",
            "role": ""
        },
        {
            "label": "Hindi",
            "value": "Hindi",
            "role": ""
        }
    ]
    const teaching_license_data = [
        {
            "label": "M.Ed",
            "value": "med",
            "role": ""
        },
        {
            "label": "B.Ed",
            "value": "bed",
            "role": ""
        }
    ]
    return (
        <Panel style={{ background: 'white' }} shaded>
            <Form>
                <Row>
                    <Col className="text-center" xs={24} sm={24} md={24}>
                        <h3>Are you a school teacher ?</h3>
                    </Col>
                </Row>
                <Row style={{ marginTop: 15 }}>
                    <Col xs={24} md={12}>
                        <Button onClick={() => setIsSchoolTeacher(false)} size="lg" block> No </Button>
                    </Col>
                    <Col className="" xs={24} md={12}>
                        <Button onClick={handleYesButton} block size="lg" appearance="primary"> Yes </Button>
                    </Col>
                </Row >

                {isSchoolTeacher == false && (
                    <>
                        <hr />
                        <Row style={{ marginTop: 15 }}>
                            <Col className="text-center" xs={24} md={24}>
                                <h4>So, what do you do ?</h4>
                            </Col>
                            <Col className="mt-2" xs={24} md={24}>
                                <Button onClick={() => handleTeacher(1)} size="lg" appearance="ghost" block> I'm a personal tutor </Button>
                            </Col>
                            <Col className="mt-2" xs={24} md={24}>
                                <Button onClick={() => handleTeacher(2)} appearance="ghost" block size="lg"> I teach at coaching institute</Button>
                            </Col>

                        </Row>
                    </>
                )}

                {isSchoolTeacher == true && (
                    <>
                        <hr />
                        <Row style={{ marginTop: 15 }} className="show-grid">
                            <Col xs={24} md={24}>
                                <InputPicker onSelect={(value) => setSchoolType(value)} block placeholder="School Type" data={school_type_data} />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 15 }} className="show-grid">
                            <Col xs={24} md={24}>
                                <InputPicker onSelect={(value) => setBoardOfEducation(value)} block placeholder="Board of Education" data={board_of_education_data} />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 15 }} className="show-grid">
                            <Col xs={24} md={24}>
                                <InputPicker onSelect={(value) => setMediumOfLanguage(value)} block placeholder="Medium of Language" data={medium_of_language_data} />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 15 }} className="show-grid">
                            <Col xs={24} md={24}>
                                <InputPicker onSelect={(value) => setTeachingLicense(value)} block placeholder="Teaching License you have" data={teaching_license_data} />
                            </Col>
                        </Row>
                        <Button onClick={handleSubmit} className="mt-2" block appearance="primary"> <b>NEXT</b> </Button>
                    </>
                )}
            </Form>
        </Panel>
    )
}

export default SchoolTeacher;