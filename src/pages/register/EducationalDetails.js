import React, { useState, useEffect } from 'react';
import { Panel, Row, Col, Form, InputPicker, Button, Input, InputNumber, PanelGroup, TagPicker, Loader, Alert } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux'
import { resetRegisterStates, registerSuccess, registerFailure, registerPending } from 'pages/register/store/registerSlice'
import { registerEducationalDetails } from 'api/auth';
import { getOptions } from 'api/options'
import { parseArrayOfObject } from 'utils/parse';
import { useForm, Controller } from "react-hook-form";
import Danger from 'components/alerts/Danger';


const EducationalDetails = (props) => {
    const { control, errors, handleSubmit } = useForm();

    const [show_form, setShowForm] = useState(true);
    const [show_accordian, setShowAccordian] = useState(false);
    const [user_educations, setUserEducations] = useState([])
    const [major_subject, setMajorSubject] = useState([])
    const [minor_subject, setMinorSubject] = useState([])

    const [current_degree_name, setCurrentDegreeName] = useState('')
    const [current_institute_name, setCurrentInstituteName] = useState('')
    const [current_start_year, setCurrentStartYear] = useState('')
    const [current_end_year, setCurrentEndYear] = useState('')
    const [current_passing_grade, setCurrentPassingGrade] = useState('')

    const [subjects, setSubjects] = useState([])
    const [grades, setGrades] = useState([])

    const dispatch = useDispatch()
    const { loading, redirect, redirectUrl, error } = useSelector(state => state.register)

    const parseSubject = [{ oldKey: 'subject_id', newKey: 'value' }, { oldKey: 'subject_name', newKey: 'label' }]
    const parseGrade = [{ oldKey: 'option_id', newKey: 'value' }, { oldKey: 'label', newKey: 'label' }]

    const loadOptions = async () => {
        let subjectsData = await getOptions('subjects')
        setSubjects(parseArrayOfObject(parseSubject, subjectsData.data.data))
        let gradesData = await getOptions('passingGrades')
        setGrades(parseArrayOfObject(parseGrade, gradesData.data.data))
    }

    useEffect(() => {
        dispatch(resetRegisterStates())
        loadOptions()
    }, [])

    const handleAdd = () => {
        const data = {
            current_degree_name,
            current_institute_name,
            current_start_year,
            current_end_year,
            current_passing_grade,
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

    const onSubmit = async data => {
        let educations = [...user_educations]
        educations.push({
            degree_name: data.current_degree_name,
            institute_name: data.current_institute_name,
            start_year: data.current_start_year,
            end_year: data.current_end_year,
            passing_grade: data.current_passing_grade
        })
        let reqData = {
            educations: educations,
            major_subjects: data.major_subject,
            minor_subjects: data.minor_subject
        }
        console.log(reqData)
        dispatch(registerPending())
        let response = await registerEducationalDetails(reqData);
        if (response.type == 'success') {
            Alert.success('Yay! Added educational details Successfully')
            dispatch(registerSuccess('/job-details'))
        } else {
            dispatch(registerFailure(response.message))
        }
    }

    if (redirect) {
        props.history.push(redirectUrl);
    }

    return (
        loading
            ?
            <Loader size='md' center={true} />
            :
            <Panel shaded style={{ background: 'white' }}>
                {show_form &&
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        {
                            error &&
                            <p style={{ color: 'red', textAlign: 'center', paddingBottom: '15px' }}>{error}</p>
                        }
                        <Row style={{ marginTop: 15 }} className="show-grid">
                            <Col xs={24} md={24}>
                                <Controller
                                    name="current_degree_name"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: true
                                    }}
                                    render={({ onChange, value }) =>
                                        <Input
                                            onChange={(text, e) => onChange(e)}
                                            value={value}
                                            placeholder="Degree Name" />
                                    }
                                />
                                {errors.current_degree_name?.type === 'required' && <Danger>* Required</Danger>}

                            </Col>
                        </Row >
                        <Row style={{ marginTop: 15 }} className="">
                            <Col xs={24} md={24}>
                                <Controller
                                    name="current_institute_name"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: true
                                    }}
                                    render={({ onChange, value }) =>
                                        <Input
                                            onChange={(text, e) => onChange(e)}
                                            placeholder="Name of Institute" />
                                    }
                                />
                                {errors.current_institute_name?.type === 'required' && <Danger>* Required</Danger>}
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 15 }} className="show-grid">
                            <Col xs={24} md={12}>
                                <Controller
                                    name="current_start_year"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: true
                                    }}
                                    render={({ onChange, value }) =>
                                        <InputNumber
                                            onChange={(text, e) => onChange(e)}
                                            placeholder="Start Year" />
                                    }
                                />
                                {errors.current_start_year?.type === 'required' && <Danger>* Required</Danger>}

                            </Col>
                            <Col className="mt-5 md:mt-0" xs={24} md={12}>
                                <Controller

                                    name="current_end_year"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: true
                                    }}
                                    render={({ onChange, value }) =>
                                        <InputNumber
                                            onChange={(text, e) => onChange(e)}
                                            placeholder="End Year" />
                                    }
                                />
                                {errors.current_end_year?.type === 'required' && <Danger>* Required</Danger>}

                            </Col>
                        </Row>
                        <Row style={{ marginTop: 15 }} className="show-grid">
                            <Col xs={24} sm={24} md={24}>
                                <Controller
                                    name="current_passing_grade"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: true }}
                                    options={grades}
                                    as={<InputPicker
                                        name="current_passing_grade"
                                        block
                                        placeholder="Passing Grade"
                                        data={grades} />
                                    }
                                />
                                {errors.current_passing_grade && <Danger>* Required</Danger>}
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 15 }} className="show-grid">
                            <Col xs={24} sm={24} md={24}>
                                <Controller
                                    name="major_subject"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue=""
                                    options={subjects}
                                    as={
                                        <TagPicker
                                            name="major_subject"
                                            block
                                            placeholder="Major Subject"
                                            data={subjects} />
                                    }
                                />
                                {errors.major_subject && <Danger>* Required</Danger>}
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 15 }} className="show-grid">
                            <Col xs={24} sm={24} md={24}>
                                <Controller
                                    name="minor_subject"
                                    control={control}
                                    defaultValue=""
                                    // rules={{ required: true }}
                                    options={subjects}
                                    as={
                                        <TagPicker
                                            name="minor_subject"
                                            block
                                            placeholder="Minor Subject"
                                            data={subjects}
                                        />
                                    }
                                />
                                {/* {errors.minor_subject?.type === 'required' && <Danger>* Required</Danger>} */}
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 15 }} className="show-grid">
                            <Col xs={24} sm={24} md={12}>
                                <Button block onClick={toggleForm}> <b>Cancel</b> </Button>
                            </Col>
                            <Col xs={24} sm={24} md={12}>
                                <Button type="submit" block appearance="primary"> Submit </Button>
                            </Col>
                        </Row>
                    </Form>
                }
                {show_accordian && user_educations.length > 0 &&
                    <div>
                        <h4>Your Educations</h4>
                        <PanelGroup style={{ marginTop: 10 }} accordion bordered>
                            {user_educations.map((education) => {
                                return (
                                    <Panel header={education.current_degree_name}>
                                        <p>{education.current_start_year}</p>
                                    </Panel>
                                )
                            })}
                        </PanelGroup>
                        <Button onClick={toggleForm} style={{ marginTop: 10 }} appearance="primary"> Add More</Button>
                    </div>

                }
            </Panel>
    )

}

export default EducationalDetails;