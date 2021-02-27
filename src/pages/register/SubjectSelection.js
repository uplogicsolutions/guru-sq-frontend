import React, { useState, useEffect } from 'react';
import { Panel, Row, Col, Form, Button, TagPicker, Alert, Loader } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux'
import { resetRegisterStates, registerSuccess, registerFailure, registerPending } from 'pages/register/store/registerSlice'
import { registerSubjectDetails } from 'api/auth';
import { getOptions } from 'api/options'
import { parseArrayOfObject } from 'utils/parse';

const SubjectSelection = props => {

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

    useEffect(() => {
        dispatch(resetRegisterStates())
        loadOptions()
    }, [])

    const handleSubmit = async () => {
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
        dispatch(registerPending())
        let response = await registerSubjectDetails(data);
        if (response.type == 'success') {
            Alert.success('Yay! Added Subjects Details')
            dispatch(registerSuccess('/educational-details'))
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
            <Panel style={{ background: 'white' }} shaded>
                <Form>
                    {
                        error &&
                        <p style={{ color: 'red', textAlign: 'center', paddingBottom: '15px' }}>{error}</p>
                    }
                    <Row>
                        <Col xs={24} sm={24} md={24}>
                            <h5>Which subjects are your core ?</h5>
                        </Col>
                        <Col className="mt-2" xs={24} sm={24} md={24}>
                            <TagPicker
                                block
                                data={subjects}
                                onSelect={(val) => { setCoreSubjects(val) }}
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
                                onSelect={(val) => { setImprovementSubjects(val) }}
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
                                onSelect={(val) => { setProfessionalGuidanceSubjects(val) }}
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