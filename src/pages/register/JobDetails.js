import React, { useState, useEffect } from 'react';
import { Panel, Row, Col, Form, InputPicker, Button, Input, Icon, IconButton, DatePicker, InputNumber, PanelGroup, TagPicker, Checkbox } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux'
import { resetRegisterStates, registerSuccess, registerFailure, registerPending } from 'pages/register/store/registerSlice'
import { registerSchoolDetails } from 'api/auth';
import { getOptions } from 'api/options'
import { parseArrayOfObject } from 'utils/parse';

import { useForm, Controller } from "react-hook-form";
import Danger from 'components/alerts/Danger';


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

    const [isWorking, setIsWorking] = useState(false)
    const [jobs, setJobs] = useState([])

    const [subjectsData, setSubjectsData] = useState([])
    const [formOfContractsData, setFormOfContractsData] = useState([])

    const { control, errors, register, handleSubmit, trigger } = useForm();


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

    const handleAdd = (data) => {

        setJobs(prevState => [
            ...prevState,
            data
        ])
        setShowForm(false);
        setShowAccordian(true);

        // console.log(educations);
    }

    const toggleForm = () => {
        setShowAccordian(!show_accordian);
        setShowForm(!show_form);
    }

    const handleOnSubmit = data => {
        console.log(jobs)
    }
    if (redirect) {
        props.history.push(redirectUrl);
    }

    return (
        <Panel shaded style={{ background: 'white' }}>
            {show_form &&
                <Form onSubmit={handleSubmit(handleAdd)}>
                    <Row style={{ marginTop: 15 }} className="show-grid">
                        <Col xs={24} md={24}>
                            <Controller
                                name="job_title"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: true
                                }}
                                render={({ onChange, value }) =>
                                    <Input
                                        onChange={(text, e) => onChange(e)}
                                        value={value}
                                        placeholder="Job Title" />
                                }
                            />
                            {errors.job_title?.type === 'required' && <Danger>* Required</Danger>}

                        </Col>
                    </Row >
                    <Row style={{ marginTop: 15 }}>
                        <Col xs={24} sm={24} md={24}>
                            <Controller
                                name="age_group"
                                control={control}
                                defaultValue=""
                                rules={{ required: true }}
                                options={test}
                                as={<InputPicker
                                    name="age_group"
                                    block
                                    placeholder="Age group of students"
                                    data={test} />
                                }
                            />
                            {errors.age_group?.type === 'required' && <Danger>* Required</Danger>}
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 15 }}>
                        <Col xs={24} sm={24} md={24}>
                            <Controller
                                name="core_subjects"
                                control={control}
                                rules={{ required: true }}
                                defaultValue=""
                                options={test}
                                as={
                                    <TagPicker
                                        name="core_subjects"
                                        block
                                        placeholder="Core Subject"
                                        data={test} />
                                }
                            />
                            {errors.core_subjects?.type === 'required' && <Danger>* Required</Danger>}
                        </Col>
                    </Row>

                    <Row style={{ marginTop: 15 }}>
                        <Col xs={24} sm={24} md={24}>
                            <Controller
                                name="supplementary_subjects"
                                control={control}
                                defaultValue=""
                                options={test}
                                as={
                                    <TagPicker
                                        name="supplementary_subjects"
                                        block
                                        placeholder="Supplementary Subject"
                                        data={test}
                                    />
                                }
                            />
                        </Col>
                    </Row>

                    <Row style={{ marginTop: 15 }}>
                        <Col xs={24} sm={24} md={24}>
                            <Controller
                                name="employer_type"
                                control={control}
                                defaultValue=""
                                rules={{ required: true }}
                                options={test}
                                as={<InputPicker
                                    name="employer_type"
                                    block
                                    placeholder="Employer Type"
                                    data={test} />
                                }
                            />
                            {errors.employer_type?.type === 'required' && <Danger>* Required</Danger>}

                        </Col>
                    </Row>
                    <Row style={{ marginTop: 15 }} className="">
                        <Col xs={24} md={24}>
                            <Controller
                                name="employer_name"
                                control={control}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ onChange, value }) =>
                                    <Input
                                        name="employer_name"
                                        onChange={(text, e) => onChange(e)}
                                        value={value}
                                        placeholder="Employer Name" />
                                }
                            />
                            {errors.employer_name?.type === 'required' && <Danger>* Required</Danger>}

                        </Col>
                    </Row>
                    <Row style={{ marginTop: 15 }} className="show-grid">
                        <Col xs={24} md={12}>
                            <Controller
                                name="start_year"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: true
                                }}
                                render={({ onChange, value }) =>
                                    <InputNumber
                                        name="start_year"
                                        onChange={(text, e) => onChange(e)}
                                        placeholder="Start Year" />
                                }
                            />
                            {errors.start_year?.type === 'required' && <Danger>* Required</Danger>}

                        </Col>
                        <Col xs={24} md={12}>
                            <Controller
                                name="end_year"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: !isWorking
                                }}
                                render={({ onChange, value }) =>
                                    <InputNumber
                                        disabled={isWorking ? true : false}
                                        name="end_year"
                                        onChange={(text, e) => onChange(e)}
                                        placeholder="End Year" />
                                }
                            />
                            {errors.end_year?.type === 'required' && <Danger>* Required</Danger>}

                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24}>
                            <Checkbox onChange={(val, checked) => {setIsWorking(checked); trigger('end_year'); }}> Currently working here ?</Checkbox>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 15 }} className="show-grid">
                        <Col xs={24} sm={24} md={24}>
                            <Controller
                                name="form_of_contract"
                                control={control}
                                defaultValue=""
                                rules={{ required: true }}
                                options={test}
                                as={<InputPicker
                                    name="form_of_contract"
                                    block
                                    placeholder="Form of Contract"
                                    data={test} />
                                }
                            />
                            {errors.form_of_contract?.type === 'required' && <Danger>* Required</Danger>}
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 15 }} className="">
                        <Col xs={24} md={24}>
                            <Controller
                                name="description"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: true
                                }}
                                render={({ onChange, value }) =>
                                    <Input
                                        onChange={(text, e) => onChange(e)}
                                        value={value}
                                        placeholder="Description (Optional)" />
                                }
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 15 }} className="show-grid">
                        <Col xs={24} sm={24} md={12}>
                            <Button block onClick={toggleForm}> <b>Cancel</b> </Button>
                        </Col>
                        <Col xs={24} sm={24} md={12}>
                            <Button block type="submit" appearance="primary"> <b>Add</b> </Button>
                        </Col>
                    </Row>
                </Form>
            }
            {show_accordian && jobs &&
                <div>
                    <h4>Your Jobs</h4>
                    <PanelGroup style={{ marginTop: 10 }} accordion bordered>
                        {jobs && jobs.map((job, index) => {
                            return (
                                <Panel key={index} header={job.job_title}>
                                </Panel>
                            )
                        })}
                    </PanelGroup>
                    <Row>
                        <Col xs={24} md={12}>
                            <Button onClick={toggleForm} block style={{ marginTop: 10 }}> Add More</Button>

                        </Col>
                        <Col xs={24} md={12}>
                            <Button onClick={handleOnSubmit} block style={{ marginTop: 10 }} appearance="primary"> Save </Button>

                        </Col>
                    </Row>
                </div>

            }
        </Panel>
    )

}

export default JobDetails;