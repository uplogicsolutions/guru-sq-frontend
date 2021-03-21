import React, { useState, useEffect } from 'react';
import { Panel, Row, Col, Form, InputPicker, Button, Loader, Alert, Radio, RadioGroup } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux'
import { resetRegisterStates, registerSuccess, registerFailure, registerPending } from 'pages/register/store/registerSlice'
import { registerSchoolDetails } from 'api/auth';
import { getOptions } from 'api/options'
import { parseArrayOfObject } from 'utils/parse';

import { useForm, Controller } from 'react-hook-form';
import Danger from 'components/alerts/Danger';


const EditSchoolTeacher = (props) => {

    const temp_school = {
        board_id: 2,
        license_id: 2,
        medium_of_instructions_id: 2,
        teacher_type: "Personal Tutor",
        type_of_school_id: 2
    }



    const [isSchoolTeacher, setIsSchoolTeacher] = useState(temp_school.teacher_type === 'School Teacher');
    const [teacher_type, setTeacherType] = useState(null);

    const [school_type_data, setSchoolTypeData] = useState([]);
    const [board_of_education_data, setBoardOfEducationData] = useState([]);
    const [medium_of_language_data, setMediumOfLanguageData] = useState([]);
    const [teaching_license_data, setTeachingLicenseData] = useState([]);

    const { errors, control, handleSubmit } = useForm();


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
        dispatch(resetRegisterStates());
        loadOptions();
        
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
            console.log(data)
        }
    }

    const handleOnSubmit = (form_data) => {

        let data = {
            ...form_data,
            teacher_type
        }
        console.log(data)
    }


    if (redirect) {
        props.history.push(redirectUrl);
    }

    return (
        <div>
            
            <div>
                <RadioGroup className="p-0" defaultValue={temp_school.teacher_type} name="radioList" inline>
                    <Radio className="m-0" onChange={(val, e) => { setIsSchoolTeacher(true)}} value="School Teacher"> School Teacher</Radio>
                    <Radio className="m-0" onChange={(val, e) => { setIsSchoolTeacher(false); setTeacherType(val)}} value="Personal Tutor"> Personal Tutor</Radio>
                    <Radio className="m-0" onChange={(val, e) => { setIsSchoolTeacher(false);setTeacherType(val)}} value="Coaching Institute Teacher"> Coaching Institute</Radio>
                </RadioGroup>
            </div>
            <Form onSubmit={handleSubmit(handleOnSubmit)}>

                {isSchoolTeacher == true && (
                    <>
                        <hr />
                        <Row className="md:my-2">
                            <Col className="mt-2 md:m-0" xs={24} md={12}>
                                <Controller
                                    name="type_of_school_id"
                                    control={control}
                                    defaultValue={temp_school.type_of_school_id}
                                    rules={{ required: true }}
                                    options={school_type_data}
                                    as={<InputPicker
                                        name="type_of_school_id"
                                        block
                                        value={temp_school.type_of_school_id}
                                        placeholder="School Type"
                                        data={school_type_data}
                                    />}
                                />
                                {errors.type_of_school_id?.type === 'required' && <Danger>* Required</Danger>}
                            </Col>
                            <Col className="mt-2 md:m-0" xs={24} md={12}>
                                <Controller
                                    name="board_id"
                                    control={control}
                                    defaultValue={temp_school.board_id}
                                    rules={{ required: true }}
                                    options={board_of_education_data}
                                    as={<InputPicker
                                        name="board_id"
                                        block
                                        value={temp_school.board_id}
                                        placeholder="Board of Education"
                                        data={board_of_education_data}
                                    />}
                                />
                                {errors.board_id?.type === 'required' && <Danger>* Required</Danger>}

                            </Col>
                        </Row>
                        <Row className="md:my-2">
                            <Col className="mt-2 md:m-0" xs={24} md={12}>
                                <Controller
                                    name="medium_of_instructions_id"
                                    control={control}
                                    defaultValue={temp_school.medium_of_instructions_id}
                                    rules={{ required: true }}
                                    options={medium_of_language_data}
                                    as={<InputPicker
                                        name="medium_of_instructions_id"
                                        block
                                        value={temp_school.medium_of_instructions_id}
                                        placeholder="Medium of Language"
                                        data={medium_of_language_data}
                                    />}
                                />
                                {errors.medium_of_instructions_id?.type === 'required' && <Danger>* Required</Danger>}
                            </Col>
                            <Col className="mt-2 md:m-0" xs={24} md={12}>
                                <Controller
                                    name="license_id"
                                    control={control}
                                    defaultValue={temp_school.license_id}
                                    rules={{ required: true }}
                                    options={teaching_license_data}
                                    as={<InputPicker
                                        name="license_id"
                                        block
                                        value={temp_school.license_id}
                                        placeholder="Teaching License you have"
                                        data={teaching_license_data}
                                    />}
                                />
                                {errors.license_id?.type === 'required' && <Danger>* Required</Danger>}
                            </Col>
                        </Row>
                        <Button type="submit" className="mt-2" appearance="primary"> <b>Save</b> </Button>
                    </>
                )}
            </Form>
        </div>
    )
}

export default EditSchoolTeacher;