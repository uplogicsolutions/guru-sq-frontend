import React, { useState } from 'react';
import { Panel, Row, Col, Form, InputPicker, Button, Input, Icon, IconButton, DatePicker, InputNumber, PanelGroup } from 'rsuite';

const EducationalDetails = (props) => {

    const [show_form, setShowForm] = useState(true);
    const [show_accordian, setShowAccordian] = useState(false);
    const [user_educations, setUserEducations] = useState([])
    const [degree_name, setDegreeName] = useState('')
    const [institute_name, setInstituteName] = useState('')
    const [start_year, setStartYear] = useState('')
    const [end_year, setEndYear] = useState('')
    const [passing_grade, setPassingGrade] = useState('')
    const [major_subject, setMajorSubject] = useState([])
    const [minor_subject, setMinorSubject] = useState([])


    //TODO fetch educations from server
    let educations = [
        {
            degree_name: "Degree 1",
            end_year: "4234",
            institute_name: "dasdasd",
            major_subject: "private",
            minor_subject: "goverment",
            passing_grade: "goverment",
            start_year: "3424",
        },
        {
            degree_name: "Degree 2",
            end_year: "4234",
            institute_name: "dasdasd",
            major_subject: "private",
            minor_subject: "goverment",
            passing_grade: "goverment",
            start_year: "3224",
        }
]
    
    const test = [
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

    const handleAdd = () => {
        const data = {
            degree_name,
            institute_name,
            start_year,
            end_year,
            passing_grade,
            major_subject,
            minor_subject
        }
        //TODO Add api call
        // educations.push(data);
        console.log(data)
        setShowForm(false);
        setShowAccordian(true);

        // console.log(educations);
    }

    const toggleForm = () => {
        setShowAccordian(!show_accordian);
        setShowForm(!show_form);
    }

    return (
        <Panel shaded style={{background:'white'}}>
            {show_form && 
                <Form>
                    <Row style={{ marginTop: 15 }} className="show-grid">
                        <Col xs={24} md={24}>
                            <Input name="degree_name" onChange={(text, e) => setDegreeName(text)} placeholder="Degree Name" />
                        </Col>
                    </Row >
                    <Row style={{ marginTop: 15}} className="">
                    <Col xs={24} md={24}>
                            <Input name="institute_name" onChange={(text, e) => setInstituteName(text)} placeholder="Name of Institute" />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 15 }} className="show-grid">
                        <Col xs={24} md={12}>
                            <InputNumber name="start_year" onChange={ text => setStartYear(text)} block placeholder="Start Year" />
                        </Col>
                        <Col xs={24} md={12}>
                            <InputNumber name="end_year" onChange={text => setEndYear(text)} block placeholder="End Year" />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 15 }} className="show-grid">
                        <Col xs={24} sm={24} md={24}>
                            <InputPicker name="passing_grade" onSelect={(grade) => setPassingGrade(grade)} block placeholder="Passing Grade" data={test} />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 15 }} className="show-grid">
                        <Col xs={24} sm={24} md={24}>
                            <InputPicker name="major_subject" onSelect={subject => setMajorSubject(subject)} block placeholder="Major Subject" data={test} />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 15 }} className="show-grid">
                        <Col xs={24} sm={24} md={24}>
                            <InputPicker name="minor_subject" onSelect={subject => setMinorSubject(subject)} block placeholder="Minor Subject" data={test} />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 15 }} className="show-grid">
                        <Col xs={24} sm={24} md={12}>
                            <Button block onClick={toggleForm}> <b>Cancel</b> </Button>
                        </Col>
                        <Col xs={24} sm={24} md={12}>
                            <Button block onClick={handleAdd}  appearance="primary"> <b>Add</b> </Button>
                        </Col>
                    </Row>
                </Form>
            }
            {show_accordian && educations && 
                <div>
                    <h4>Your Educations</h4>
                    <PanelGroup style={{marginTop:10}} accordion bordered>
                        {educations.map((education) => {
                            return(
                            <Panel header={education.degree_name}>
                                <p>{education.start_year}</p>
                            </Panel>
                            )
                        })}
                    </PanelGroup>
                    <Button onClick={toggleForm} style={{marginTop: 10}} appearance="primary"> Add More</Button>
                </div>

            }
        </Panel>
    )

}

export default EducationalDetails;