import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, TagPicker, Loader } from 'rsuite';
import { getOptions } from 'api/options';
import { getSubjects, editSubjects } from 'api/user';
import { parseArrayOfObject } from 'utils/parse';
import { useForm, Controller } from "react-hook-form";
import Danger from 'components/alerts/Danger';

const EditSubjectDetails = ({ edit, setEdit }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [core_subjects, setCoreSubjects] = useState([])
    const [improvement_subjects, setImprovementSubjects] = useState([])
    const [professional_guidance_subjects, setProfessionalGuidanceSubjects] = useState([])
    const [subjects, setSubjects] = useState([])
    const { control, errors, register, handleSubmit, trigger } = useForm();

    const parse = [{ oldKey: 'subject_id', newKey: 'value' }, { oldKey: 'subject_name', newKey: 'label' }]

    const loadData = async () => {
        let subjectsOptionData = await getOptions('subjects')
        setSubjects(parseArrayOfObject(parse, subjectsOptionData.data.data))
        let userSubjectsData = await getSubjects();
        if (userSubjectsData && userSubjectsData.type == 'success' && userSubjectsData.data) {
            let temp = [];
            userSubjectsData.data.core_subjects.map((subject) => temp.push(subject.subject_id));
            setCoreSubjects(temp);
            temp = [];
            userSubjectsData.data.guidance_subjects.map((subject) => temp.push(subject.subject_id));
            setProfessionalGuidanceSubjects(temp);
            temp = [];
            userSubjectsData.data.improvement_subjects.map((subject) => temp.push(subject.subject_id));
            setImprovementSubjects(temp);
        }
        setLoading(false);
    }

    useEffect(() => {
        loadData()
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
        await editSubjects(data);
        setEdit(false);
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
                            <p>Core Subjects</p>
                        </Col>
                        <Col className="mt-2 md:m-0" xs={24} sm={24} md={24}>
                            <Controller
                                name="core_subjects"
                                control={control}
                                defaultValue={core_subjects}
                                rules={{ required: true }}
                                options={subjects}
                                as={<TagPicker
                                    block
                                    tagProps={{
                                        closable: false
                                    }}
                                    data={subjects}
                                    disabled={!edit}
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
                            <p>Subjects you can improve</p>
                        </Col>
                        <Col className="mt-2 md:m-0" xs={24} sm={24} md={24}>
                            <Controller
                                name="improvement_subjects"
                                control={control}
                                defaultValue={improvement_subjects}
                                rules={{ required: true }}
                                options={subjects}
                                as={<TagPicker
                                    block
                                    tagProps={{
                                        closable: false
                                    }}
                                    defaultValue={improvement_subjects}
                                    disabled={!edit}
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
                            <p>Subjects you prefer professional guidance</p>
                        </Col>
                        <Col className="mt-2 md:m-0" xs={24} sm={24} md={24}>
                            <Controller
                                name="guidance_subjects"
                                control={control}
                                defaultValue={professional_guidance_subjects}
                                rules={{ required: true }}
                                options={subjects}
                                as={<TagPicker
                                    block
                                    tagProps={{
                                        closable: false
                                    }}
                                    data={subjects}
                                    defaultValue={professional_guidance_subjects}
                                    disabled={!edit}
                                    onSelect={(val) => { setProfessionalGuidanceSubjects(val) }}
                                    placeholder="Select Guidance Subjects"
                                />
                                }
                            />

                        </Col>
                    </Row>
                    {
                        edit &&
                        <Row className="md:my-2">
                            <Col className="mt-2 md:m-0" xs={24} sm={24} md={24}>
                                <Button type="submit" appearance="primary"> <b>Save</b> </Button>
                            </Col>
                        </Row>
                    }
                </Form>
            </div>
    )
}

export default EditSubjectDetails;