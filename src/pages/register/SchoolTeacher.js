import React, { useState, useEffect } from 'react';
import { Panel, Row, Col, Form, InputPicker, Button, Loader, Alert } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux'
import { resetRegisterStates, registerSuccess, registerFailure, registerPending } from 'pages/register/store/registerSlice'
import { registerSchoolDetails } from 'api/auth';
import { getOptions } from 'api/options'
import { parseArrayOfObject } from 'utils/parse';

const SchoolTeacher = (props) => {
    const [isSchoolTeacher, setIsSchoolTeacher] = useState(undefined);
    const [teacher_type, setTeacherType] = useState(null);
    const [school_type, setSchoolType] = useState('');
    const [board_of_education, setBoardOfEducation] = useState('');
    const [medium_of_language, setMediumOfLanguage] = useState('');
    const [teaching_license, setTeachingLicense] = useState('');

    const [school_type_data, setSchoolTypeData] = useState([]);
    const [board_of_education_data, setBoardOfEducationData] = useState([]);
    const [medium_of_language_data, setMediumOfLanguageData] = useState([]);
    const [teaching_license_data, setTeachingLicenseData] = useState([]);


    const dispatch = useDispatch()
    const { loading, redirect, redirectUrl, error } = useSelector(state => state.register)

    const parse = [{ oldKey: 'option_id', newKey: 'value' }, { oldKey: 'label', newKey: 'label' }]

    const loadOptions = async () => {
        let schoolData = await getOptions('schoolTypes')
        setSchoolTypeData(parseArrayOfObject(parse, schoolData.data.data))
        let educationData = await getOptions('schoolBoardTypes')
        setBoardOfEducationData(parseArrayOfObject(parse, educationData.data.data))
        let languageData = await getOptions('mediumOfInstructions')
        setMediumOfLanguageData(parseArrayOfObject(parse, languageData.data.data))
        let licenseData = await getOptions('teachingLicenses')
        setTeachingLicenseData(parseArrayOfObject(parse, licenseData.data.data))
    }

    useEffect(() => {
        dispatch(resetRegisterStates())
        loadOptions()
    }, [])

    const handleYesButton = () => {
        setIsSchoolTeacher(true);
        setTeacherType('School Teacher');
    }

    const handleTeacher = (teacher_type) => {
        setTeacherType(teacher_type);
        if (teacher_type != 'School Teacher') {
            let data = {
                teacher_type
            }
            register(data)
        }
    }

    const handleSubmit = () => {
        let data = {
            teacher_type: teacher_type,
            type_of_school_id: school_type,
            license_id: teaching_license,
            board_id: board_of_education,
            medium_of_instructions_id: medium_of_language
        }
        register(data)
    }

    const register = async (data) => {
        dispatch(registerPending())
        let response = await registerSchoolDetails(data);
        if (response.type == 'success') {
            Alert.success('Yay! Added School Details')
            dispatch(registerSuccess('/subjects'))
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
                                    <Button onClick={() => handleTeacher('Personal Tutor')} size="lg" appearance="ghost" block> I'm a personal tutor </Button>
                                </Col>
                                <Col className="mt-2" xs={24} md={24}>
                                    <Button onClick={() => handleTeacher('Coaching Institute Teacher')} appearance="ghost" block size="lg"> I teach at coaching institute</Button>
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