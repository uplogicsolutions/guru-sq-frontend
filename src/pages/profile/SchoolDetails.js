import React, { useState, useEffect } from 'react';
import { Row, Col, Form, InputPicker, Button, Radio, RadioGroup, Loader } from 'rsuite';
import { getOptions } from 'api/options';
import { getSchoolDetails, editSchoolDetails } from 'api/user';
import { parseArrayOfObject } from 'utils/parse';
import { useForm, Controller } from 'react-hook-form';
import Danger from 'components/alerts/Danger';


const EditSchoolTeacher = ({ edit, setEdit }) => {
    const [school_details, setSchoolDetails] = useState();
    const [loading, setLoading] = useState(true);
    const [isSchoolTeacher, setIsSchoolTeacher] = useState();
    const [teacher_type, setTeacherType] = useState(null);
    const [school_type_data, setSchoolTypeData] = useState([]);
    const [board_of_education_data, setBoardOfEducationData] = useState([]);
    const [medium_of_language_data, setMediumOfLanguageData] = useState([]);
    const [teaching_license_data, setTeachingLicenseData] = useState([]);

    const { errors, control, handleSubmit } = useForm();
    const parse = [{ oldKey: 'option_id', newKey: 'value' }, { oldKey: 'label', newKey: 'label' }]

    const loadData = async () => {
        let schoolData = await getOptions('schoolTypes')
        setSchoolTypeData(parseArrayOfObject(parse, schoolData.data.data))
        let educationData = await getOptions('schoolBoardTypes')
        setBoardOfEducationData(parseArrayOfObject(parse, educationData.data.data))
        let languageData = await getOptions('mediumOfInstructions')
        setMediumOfLanguageData(parseArrayOfObject(parse, languageData.data.data))
        let licenseData = await getOptions('teachingLicenses')
        setTeachingLicenseData(parseArrayOfObject(parse, licenseData.data.data))
        let response = await getSchoolDetails();
        if (response && response.type == 'success' && response.data) {
            setSchoolDetails(response.data)
            setIsSchoolTeacher(response.data.teacher_type == 'School Teacher')
        }
        setLoading(false)
    }

    useEffect(() => {
        loadData();
    }, [])

    const handleOnSubmit = async (form_data) => {
        let data = {
            ...form_data,
            teacher_type
        }
        await editSchoolDetails(data);
        setEdit(false);
    }

    return (
        loading
            ?
            <Loader size='md' center={true} />
            :
            <div>
                <Form onSubmit={handleSubmit(handleOnSubmit)}>
                    <div>
                        <RadioGroup className="p-0" defaultValue={school_details.teacher_type} name="radioList" inline>
                            <Radio className="m-0" onChange={(val, e) => { setIsSchoolTeacher(true); setTeacherType(val) }} value="School Teacher"> School Teacher</Radio>
                            <Radio className="m-0" onChange={(val, e) => { setIsSchoolTeacher(false); setTeacherType(val) }} value="Personal Tutor"> Personal Tutor</Radio>
                            <Radio className="m-0" onChange={(val, e) => { setIsSchoolTeacher(false); setTeacherType(val) }} value="Coaching Institute Teacher"> Coaching Institute</Radio>
                        </RadioGroup>
                    </div>
                    {isSchoolTeacher == true && (
                        <>
                            <hr />
                            <Row className="md:my-2">
                                <Col className="mt-2 md:m-0" xs={24} md={12}>
                                    <Controller
                                        name="type_of_school_id"
                                        control={control}
                                        defaultValue={school_details.type_of_school_id}
                                        rules={{ required: true }}
                                        options={school_type_data}
                                        as={<InputPicker
                                            name="type_of_school_id"
                                            block
                                            value={school_details.type_of_school_id}
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
                                        defaultValue={school_details.board_id}
                                        rules={{ required: true }}
                                        options={board_of_education_data}
                                        as={<InputPicker
                                            name="board_id"
                                            block
                                            value={school_details.board_id}
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
                                        defaultValue={school_details.medium_of_instructions_id}
                                        rules={{ required: true }}
                                        options={medium_of_language_data}
                                        as={<InputPicker
                                            name="medium_of_instructions_id"
                                            block
                                            value={school_details.medium_of_instructions_id}
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
                                        defaultValue={school_details.license_id}
                                        rules={{ required: true }}
                                        options={teaching_license_data}
                                        as={<InputPicker
                                            name="license_id"
                                            block
                                            value={school_details.license_id}
                                            placeholder="Teaching License you have"
                                            data={teaching_license_data}
                                        />}
                                    />
                                    {errors.license_id?.type === 'required' && <Danger>* Required</Danger>}
                                </Col>
                            </Row>
                        </>
                    )}
                    {
                        edit &&
                        <Button type="submit" className="mt-2" appearance="primary"> <b>Save</b> </Button>
                    }
                </Form>
            </div>
    )
}

export default EditSchoolTeacher;