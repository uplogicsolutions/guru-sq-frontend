import React, { useState } from 'react';
import { Panel, Row, Col, Form, InputPicker, Button, Input, Icon, IconButton, DatePicker, InputNumber, PanelGroup, TagPicker } from 'rsuite';

import { useForm, Controller } from "react-hook-form";


const EducationalDetails = (props) => {

    const { control, errors ,handleSubmit } = useForm();


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
        },
        {
            "label": "Semi",
            "value": "semi",
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

    const onSubmit = data => {
        console.log(data);
    }

    return (
        <Panel shaded style={{background:'white'}}>
            {show_form && 
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row style={{ marginTop: 15 }} className="show-grid">
                        <Col xs={24} md={24}>
                        <Controller
                            name="degree_name"
                            control={control}
                            defaultValue=""
                            render={({onChange, value}) => 
                            <Input onChange={(text, e) => onChange(e)} value={value} placeholder="Degree Name" />}
                        />
                            
                        </Col>
                    </Row >
                    <Row style={{ marginTop: 15}} className="">
                    <Col xs={24} md={24}>
                        <Controller
                                name="institute_name"
                                control={control}
                                defaultValue=""
                                render={({onChange, value}) => 
                                <Input onChange={(text, e) => onChange(e)} placeholder="Name of Institute" />}
                            />
                            
                        </Col>
                    </Row> 
                    <Row style={{ marginTop: 15 }} className="show-grid">
                        <Col xs={24} md={12}>
                        <Controller
                            name="start_year"
                            control={control}
                            defaultValue=""
                            render={({onChange, value}) => 
                                <InputNumber onChange={ (text,e) => onChange(e)} placeholder="Start Year" />}
                        />
                            
                        </Col>
                        <Col xs={24} md={12}>
                        <Controller
                            name="end_year"
                            control={control}
                            defaultValue=""
                            render={({onChange, value}) => 
                            <InputNumber onChange={(text, e) => onChange(e)} placeholder="End Year" />}
                        />
                            
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 15 }} className="show-grid">
                        <Col xs={24} sm={24} md={24}>
                        <Controller
                            name="passing_grade"
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                            options={test}
                            as={<InputPicker name="passing_grade" block placeholder="Passing Grade" data={test} />}
                        />
                        {errors.passing_grade && <p>This is required</p>}
                        </Col>
                    </Row>
                     <Row style={{ marginTop: 15 }} className="show-grid">
                        <Col xs={24} sm={24} md={24}>
                        <Controller
                            name="major_subject"
                            control={control}
                            rules={{ required: true, maxLength:2,max: 2 }}
                            defaultValue=""
                            options={test}
                            as={<TagPicker name="major_subject"  block placeholder="Major Subject" data={test} />}
                        />
                        {errors.major_subject && <p>This is required</p>}
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 15 }} className="show-grid">
                        <Col xs={24} sm={24} md={24}>
                        <Controller
                            name="minor_subject"
                            control={control}
                            defaultValue=""
                            options={test}
                            as={<TagPicker name="minor_subject" block placeholder="Minor Subject" data={test} />}
                        />
                            
                        </Col>
                     </Row>
                    <Row style={{ marginTop: 15 }} className="show-grid">
                        <Col xs={24} sm={24} md={12}>
                            <Button block onClick={toggleForm}> <b>Cancel</b> </Button>
                        </Col>
                        <Col xs={24} sm={24} md={12}>
                            <Button type="submit" block onClick={handleSubmit(onSubmit)}  appearance="primary"> Submit </Button>
                            {/* <Input className="rs-btn rs-btn-primary rs-btn-block" value="Submit" type="submit"/>  */}
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