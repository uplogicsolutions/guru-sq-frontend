import React, { useState, useEffect } from 'react';
import { Panel, Row, Col, Form, InputPicker, Button, Input, Icon, IconButton, DatePicker, InputNumber, PanelGroup, TagPicker } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux'
import { resetRegisterStates, registerSuccess, registerFailure, registerPending } from 'pages/register/store/registerSlice'
import { registerSchoolDetails } from 'api/auth';
import { getOptions } from 'api/options'
import { parseArrayOfObject } from 'utils/parse';

const JobDetails = (props) => {

    const [show_form, setShowForm] = useState(true);
    const [show_accordian, setShowAccordian] = useState(false);
    const [job_title, setJobTitile] = useState('')
    const [age_group, setAgeGroup] = useState('')
    const [core_subjects, setCoreSubjects] = useState([])
    const [supplementary_subjects, setSupplementarySubjects] = useState([])
    const [employer_type, setEmployerType] = useState('')
    const [employer_name, setEmployerName] = useState('')
    const [start_year, setStartYear] = useState('')
    const [end_year, setEndYear] = useState('')
    const [form_of_contract, setFormOfContract] = useState('')
    const [description, setDescription] = useState('')

    const [subjectsData, setSubjectsData] = useState([])
    const [formOfContractsData, setFormOfContractsData] = useState([])

    const dispatch = useDispatch()
    const { loading, redirect, redirectUrl, error } = useSelector(state => state.register)

    const parseOption = [{ oldKey: 'option_id', newKey: 'value' }, { oldKey: 'label', newKey: 'label' }]
    const parseSubject = [{ oldKey: 'subject_id', newKey: 'value' }, { oldKey: 'subject_name', newKey: 'label' }]

    const loadOptions = async () => {
        let subjectData = await getOptions('subjects')
        setSubjectsData(parseArrayOfObject(parseSubject, subjectData.data.data))
        let formData = await getOptions('formOfContracts')
        setFormOfContractsData(parseArrayOfObject(parseOption, formData.data.data))
    }

    useEffect(() => {
        dispatch(resetRegisterStates())
        loadOptions()
    }, [])

    
    //TODO fetch educations from server
    let jobs = [
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
            job_title,
            age_group,
            core_subjects,
            supplementary_subjects,
            employer_type,
            employer_name,
            start_year,
            end_year,
            form_of_contract,
            description
    
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

    if (redirect) {
        props.history.push(redirectUrl);
    }

    return (
        <Panel shaded style={{background:'white'}}>
            {show_form && 
                <Form>
                    <Row style={{ marginTop: 15 }} className="show-grid">
                        <Col xs={24} md={24}>
                            <Input name="job_title" onChange={(text, e) => setJobTitile(text)} placeholder="Job Title" />
                        </Col>
                    </Row >
                    <Row style={{ marginTop: 15 }}>
                        <Col xs={24} sm={24} md={24}>
                            <InputPicker block name="age_group" onSelect={(age_group) => setAgeGroup(age_group)}  placeholder="Age Group of Students" data={test} />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 15 }}>
                        <Col xs={24} sm={24} md={24}>
                            <TagPicker block  name="core_subjects" onSelect={(core_subjects) => setCoreSubjects(core_subjects)}  placeholder="Core Subjects" data={subjectsData} />
                        </Col>
                    </Row>
                    
                    <Row style={{ marginTop: 15 }}>
                        <Col xs={24} sm={24} md={24}>
                            <TagPicker block name="supplementary_subjects" onSelect={(supplementary_subjects) => setSupplementarySubjects(supplementary_subjects)}  placeholder="Supplementary Subjects" data={subjectsData} />
                        </Col>
                    </Row>
                    
                    <Row style={{ marginTop: 15 }}>
                        <Col xs={24} sm={24} md={24}>
                            <InputPicker block name="employer_type" onSelect={(employer_type) => setEmployerType(employer_type)}  placeholder="Employer Type" data={test} />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 15}} className="">
                    <Col xs={24} md={24}>
                            <Input name="employer_name" onChange={(text) => setEmployerName(text)} placeholder="Employer Name" />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 15 }} className="show-grid">
                        <Col xs={24} md={12}>
                            <InputNumber name="start_year" onChange={ text => setStartYear(text)}  placeholder="Start Year" />
                        </Col>
                        <Col xs={24} md={12}>
                            <InputNumber name="end_year" onChange={text => setEndYear(text)}  placeholder="End Year" />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 15 }} className="show-grid">
                        <Col xs={24} sm={24} md={24}>
                            <InputPicker block name="form_of_contract" onSelect={(form) => setFormOfContract(form_of_contract)}  placeholder="Form of Contract" data={formOfContractsData} />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 15}} className="">
                        <Col xs={24} md={24}>
                            <Input name="description" onChange={(text) => setDescription(text)} placeholder="Description" />
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
            {show_accordian && jobs && 
                <div>
                    <h4>Your Jobs</h4>
                    <PanelGroup style={{marginTop:10}} accordion bordered>
                        {jobs.map((job, index) => {
                            return(
                            <Panel key={index} header={job.degree_name}>
                                <p>{job.start_year}</p>
                            </Panel>
                            )
                        })}
                    </PanelGroup>
                    <Button  onClick={toggleForm} style={{marginTop: 10}} appearance="primary"> Add More</Button>
                </div>

            }
        </Panel>
    )

}

export default JobDetails;