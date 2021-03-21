import React, { useState, useEffect } from 'react';
import { Panel, Row, Col, Form, Button, TagPicker, Alert, Loader } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux'
import { resetRegisterStates, registerSuccess, registerFailure, registerPending } from 'pages/register/store/registerSlice'
import { registerSubjectDetails } from 'api/auth';
import { getOptions } from 'api/options'
import { parseArrayOfObject } from 'utils/parse';

import { useForm, Controller } from "react-hook-form";
import Danger from 'components/alerts/Danger';

const EditSubjectDetails = props => {

    const [core_subjects, setCoreSubjects] = useState([])
    const [improvement_subjects, setImprovementSubjects] = useState([])
    const [professional_guidance_subjects, setProfessionalGuidanceSubjects] = useState([])
    const [subjects, setSubjects] = useState([])

    const dispatch = useDispatch()
    const { loading, redirect, redirectUrl, error } = useSelector(state => state.register)

    const parse = [{ oldKey: 'subject_id', newKey: 'value' }, { oldKey: 'subject_name', newKey: 'label' }]

    const loadOptions = async () => {
        let subjectsData = await getOptions('subjects')
        setSubjects(parseArrayOfObject(parse, subjectsData.data.data))
    }
    const { control, errors, register, handleSubmit, trigger } = useForm();


    useEffect(() => {
        dispatch(resetRegisterStates())
        loadOptions()
    }, [])

    const handleOnSubmit = async () => {
        const coreSubjectsData = []
        core_subjects.map((subject) => coreSubjectsData.push({ subject_id: subject }))
        const guidanceSubjectsData = []
        professional_guidance_subjects.map((subject) => guidanceSubjectsData.push({ subject_id: subject }))
        const improvementSubjectsData = []
        improvement_subjects.map((subject) => improvementSubjectsData.push({ subject_id: subject }))
        const data = {
            core_subjects: coreSubjectsData,
            improvement_subjects: improvementSubjectsData,
            guidance_subjects: guidanceSubjectsData
        }

        console.log(data)
    }

    if (redirect) {
        props.history.push(redirectUrl);
    }

    const temp_subjects = {
        core_subjects: [1, 2],
        guidance_subjects: [3],
        improvement_subjects: [4]
    }
    return (
        loading
            ?
            <Loader size='md' center={true} />
            :
            <div className="mt-5">
                <Form onSubmit={handleSubmit(handleOnSubmit)}>
                    {
                        error &&
                        <p style={{ color: 'red', textAlign: 'center', paddingBottom: '15px' }}>{error}</p>
                    }
                    <Row className="md:my-2">
                        <Col className="mt-2 md:m-0" xs={24} sm={24} md={24}>
                            <p>Which subjects are your core ?</p>
                        </Col>
                        <Col className="mt-2 md:m-0" xs={24} sm={24} md={24}>
                            <Controller
                                name="core_subjects"
                                control={control}
                                defaultValue={temp_subjects.core_subjects}
                                rules={{ required: true }}
                                options={subjects}
                                as={<TagPicker
                                    block
                                    tagProps={{
                                        closable: false
                                    }}
                                    value={temp_subjects.core_subjects}
                                    data={subjects}
                                    onSelect={(val) => { setCoreSubjects(val) }}
                                    placeholder="Select Core Subjects"
                                />
                                }
                            />
                            {errors.core_subjects?.type === 'required' && <Danger>* Required</Danger>}

                        </Col>
                    </Row>
                    <Row className="md:my-2">
                        <Col className="mt-2 md:m-0" xs={24} sm={24} md={24}>
                            <p>Subjects you can improve ?</p>
                        </Col>
                        <Col className="mt-2 md:m-0" xs={24} sm={24} md={24}>
                            <Controller
                                name="improvement_subjects"
                                control={control}
                                defaultValue={temp_subjects.improvement_subjects}
                                rules={{ required: true }}
                                options={subjects}
                                as={<TagPicker
                                    block
                                    tagProps={{
                                        closable: false
                                    }}
                                    value={temp_subjects.improvement_subjects}
                                    data={subjects}
                                    onSelect={(val) => { setImprovementSubjects(val) }}
                                    placeholder="Select Imrpovement Subjects"
                                />
                                }
                            />

                        </Col>
                    </Row>
                    <Row className="md:my-2">
                        <Col className="mt-2 md:m-0" xs={24} sm={24} md={24}>
                            <p>Subjects you prefer professional guidance ?</p>
                        </Col>
                        <Col className="mt-2 md:m-0" xs={24} sm={24} md={24}>
                            <Controller
                                name="guidance_subjects"
                                control={control}
                                defaultValue={temp_subjects.guidance_subjects}
                                rules={{ required: true }}
                                options={subjects}
                                as={<TagPicker
                                    block
                                    tagProps={{
                                        closable: false
                                    }}
                                    data={subjects}
                                    value={temp_subjects.guidance_subjects}
                                    onSelect={(val) => { setProfessionalGuidanceSubjects(val) }}
                                    placeholder="Select Guidance Subjects"
                                />
                                }
                            />
                            
                        </Col>
                    </Row>
                    <Row className="md:my-2">
                        <Col className="mt-2 md:m-0" xs={24} sm={24} md={24}>
                            <Button type="submit" appearance="primary"> <b>Save</b> </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
    )
}

export default EditSubjectDetails;