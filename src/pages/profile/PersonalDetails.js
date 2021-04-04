import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Form, DatePicker, InputPicker, Button, IconButton, Icon, Loader } from 'rsuite';
import { getOptions } from 'api/options'
import { getPersonalDetails, editPersonalDetails } from 'api/user'
import { useForm, Controller } from 'react-hook-form';
import Danger from 'components/alerts/Danger';

const EditPersonalDetails = ({edit, setEdit}) => {
    const [personal_details, setPersonalDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [otherLanguagesFields, setOtherLanguagesFields] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [gender_data, setGenderData] = useState([]);
    const [proficiency, setProficiency] = useState([]);
    const { errors, control, handleSubmit } = useForm();

    const loadData = async () => {
        let response = await getOptions('languages')
        let languagesData = []
        response.data.data.map((value) => {
            languagesData.push({
                label: value.language_name,
                value: value.language_id,
                role: ""
            })
        })
        setLanguages(languagesData)
        let genderResponse = await getOptions('gender')
        setGenderData(genderResponse.data.data)
        let proficiencyResponse = await getOptions('proficiency')
        setProficiency(proficiencyResponse.data.data)
        let personalDetailsResponse = await getPersonalDetails();
        if (personalDetailsResponse && personalDetailsResponse.type == 'success' && personalDetailsResponse.data) {
            setPersonalDetails(personalDetailsResponse.data);
            setOtherLanguagesFields(personalDetailsResponse.data.secondary_languages);
        }
        setLoading(false);
    }

    useEffect(() => {
        loadData();
    }, [])

    const handleLanguageChange = (index, label, e) => {
        const values = [...otherLanguagesFields];
        values[index].language_id = label
        setOtherLanguagesFields(values)
    }

    const handleProficiencyChange = (index, label, e) => {
        const values = [...otherLanguagesFields];
        values[index].proficiency = label
        setOtherLanguagesFields(values)
    }

    const handleAddButton = () => {
        const values = [...otherLanguagesFields]
        values.push({ language_id: '', proficiency: '' })
        setOtherLanguagesFields(values)
    }

    const handleOnSubmit = async (data) => {
        await editPersonalDetails({
            ...data,
            secondary_languages: otherLanguagesFields
        });
        setEdit(false);
    }
    const handleDeleteButton = (index) => {
        let values = [...otherLanguagesFields];
        values.splice(index, 1);
        setOtherLanguagesFields(values)
    }

    return (
        loading
            ?
            <Loader size='md' center={true} />
            :
            <div className="p-0">
                <Form onSubmit={handleSubmit(handleOnSubmit)}>
                    {
                        error &&
                        <p style={{ color: 'red', textAlign: 'center', paddingBottom: '15px' }}>{error}</p>
                    }
                    <Row className="md:my-2">
                        <Col className="mt-2 md:m-0" xs={24} md={12}>
                            <Controller
                                name="first_name"
                                control={control}
                                defaultValue={personal_details.first_name}
                                rules={{
                                    required: true
                                }}
                                render={({ onChange, value }) =>
                                    <Input
                                        name="first_name"
                                        value={value}
                                        onChange={(text, e) => onChange(e)}
                                        placeholder="First Name"
                                        disabled={!edit}
                                    />
                                }
                            />
                            {errors.first_name?.type === 'required' && <Danger>* Required</Danger>}
                        </Col>
                        <Col className="mt-2 md:m-0" xs={24} md={12}>
                            <Controller
                                name="last_name"
                                control={control}
                                defaultValue={personal_details.last_name}
                                rules={{
                                    required: true
                                }}
                                render={({ onChange, value }) =>
                                    <Input
                                        onChange={(text, e) => onChange(e)}
                                        value={value}
                                        placeholder="Last Name"
                                        disabled={!edit}
                                    />
                                }
                            />
                            {errors.last_name?.type === 'required' && <Danger>* Required</Danger>}
                        </Col>
                    </Row >

                    <Row className="md:my-2">
                        <Col className="mt-2 md:m-0" xs={24} md={12}>
                            <Controller
                                name="dob"
                                control={control}
                                defaultValue={personal_details.dob}
                                rules={{ required: true }}

                                as={<DatePicker
                                    name="dob"
                                    format="DD-MM-YYYY"
                                    block
                                    value={personal_details.dob}
                                    placeholder="Date of Birth"
                                    disabled={!edit}
                                />}
                            />
                            {errors.dob?.type === 'required' && <Danger>* Required</Danger>}
                        </Col>
                        <Col className="mt-2 md:m-0" xs={24} md={12}>
                            <Controller
                                name="gender"
                                control={control}
                                defaultValue={personal_details.gender}
                                rules={{ required: true }}
                                options={gender_data}
                                as={<InputPicker
                                    name="gender"
                                    block
                                    placeholder="Gender"
                                    defaultValue={personal_details.gender}
                                    data={gender_data}
                                    disabled={!edit}
                                />}
                            />
                            {errors.gender?.type === 'required' && <Danger>This is required</Danger>}

                        </Col>
                    </Row>
                    <Row className="md:my-2">
                        <Col className="mt-2 md:m-0" xs={24} sm={24} md={24}>
                            <Controller
                                name="mother_tongue"
                                defaultValue={personal_details.mother_tongue}
                                control={control}
                                rules={{ required: true }}
                                options={languages}
                                as={<InputPicker
                                    name="mother_tongue"
                                    block
                                    defaultValue={personal_details.mother_tongue}
                                    placeholder="Mother Tongue"
                                    data={languages}
                                    disabled={!edit}
                                />}
                            />
                            {errors.mother_tongue?.type === 'required' && <Danger>This is required</Danger>}
                        </Col>
                    </Row>

                    <Row className="md:my-2">
                        <Col className="mt-2 md:m-0" xs={18} md={22}>
                            <p>Other Languages</p>
                        </Col>
                        {
                            edit &&
                            <Col className="mt-2 md:m-0" xs={4} md={2}>
                                <IconButton onClick={handleAddButton} icon={<Icon icon={"plus"} />} />
                            </Col>
                        }
                        {otherLanguagesFields &&
                            otherLanguagesFields.map((language, index) => {
                                return (

                                    <Row key={index} style={{ marginTop: 15, marginBottom: 5 }}>
                                        <Col className="mt-2 md:m-0" xs={11} sm={12} md={10}>
                                            <InputPicker
                                                onChange={(label, e) => handleLanguageChange(index, label, e)}
                                                block
                                                placeholder="Language"
                                                defaultValue={language.language_id}
                                                data={languages}
                                                disabled={!edit}
                                            />
                                        </Col>
                                        <Col className="mt-2 md:m-0" xs={11} sm={12} md={10}>
                                            <InputPicker
                                                onChange={(label, e) => handleProficiencyChange(index, label, e)}
                                                block
                                                placeholder="Proficiency"
                                                defaultValue={language.proficiency}
                                                data={proficiency}
                                                disabled={!edit}
                                            />
                                        </Col>
                                        {
                                            edit &&
                                            <Col md={4}>
                                                <IconButton onClick={() => handleDeleteButton(index)} icon={<Icon data-index={index} icon={"minus"} />} />
                                            </Col>
                                        }
                                    </Row>

                                )
                            })}
                    </Row>
                    {edit &&
                        <Row className="md:my-2">
                            <Button type="submit" appearance="primary"> <b>Save</b> </Button>
                        </Row>
                    }
                </Form>
            </div>
    )

}

export default EditPersonalDetails;