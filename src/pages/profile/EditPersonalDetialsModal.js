import React, { useState, useEffect } from 'react';
import { Panel, Row, Col, Input, Form, DatePicker, InputPicker, Button, IconButton, Icon, Loader, Alert } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux'
import { resetRegisterStates, registerSuccess, registerFailure, registerPending } from 'pages/register/store/registerSlice'
import { registerPersonalDetails } from 'api/auth'
import { getOptions } from 'api/options'

import { useForm, Controller } from 'react-hook-form';
import Danger from 'components/alerts/Danger';


const EditPersonalDetails = props => {

    const [otherLanguagesFields, setOtherLanguagesFields] = useState([]);
    const [languages, setLanguages] = useState([])
    const [gender_data, setGenderData] = useState([])
    const [proficiency, setProficiency] = useState([])


    const { errors, control, handleSubmit } = useForm();

    const loadOptions = async () => {
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
    }

    const dispatch = useDispatch()
    const { loading, redirect, redirectUrl, error } = useSelector(state => state.register)

    useEffect(() => {
        dispatch(resetRegisterStates())
        loadOptions();
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

    const handleOnSubmit = async (form_data) => {

        let data = {
            ...form_data,
            secondary_languages: otherLanguagesFields
        }

    //    console.log(data)
    }
    const handleDeleteButton = (index) => {
        // console.log('Index',index)
        let values = [...otherLanguagesFields];
        
        console.log(values)
        console.log(index)
        values.splice(index, 1);
        console.log(values)

        setOtherLanguagesFields(values)

    }

    if (redirect) {
        props.history.push(redirectUrl);
    }

    const temp_details = {
        first_name: 'John',
        last_name: 'Doe',
        dob: new Date(),
        gender: 'male',
        mother_tongue: 1
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
                                defaultValue={temp_details.first_name}
                                rules={{
                                    required: true
                                }}
                                render={({ onChange, value }) =>
                                    <Input
                                        name="first_name"
                                        value={value}
                                        onChange={(text, e) => onChange(e)}
                                        placeholder="First Name"
                                    />
                                }
                            />
                            {errors.first_name?.type === 'required' && <Danger>* Required</Danger>}
                        </Col>
                        <Col className="mt-2 md:m-0" xs={24} md={12}>
                            <Controller
                                name="last_name"
                                control={control}
                                defaultValue={temp_details.last_name}
                                rules={{
                                    required: true
                                }}
                                render={({ onChange, value }) =>
                                    <Input
                                        onChange={(text, e) => onChange(e)}
                                        placeholder="Last Name"
                                        value={value}
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
                                defaultValue={temp_details.dob}
                                rules={{ required: true }}

                                as={<DatePicker
                                    name="dob"
                                    format="DD-MM-YYYY"
                                    block
                                    value={temp_details.dob}
                                    placeholder="Date of Birth"
                                />}
                            />
                            {errors.dob?.type === 'required' && <Danger>* Required</Danger>}
                        </Col>
                        <Col className="mt-2 md:m-0" xs={24} md={12}>
                            <Controller
                                name="gender"
                                control={control}
                                defaultValue={temp_details.gender}
                                rules={{ required: true }}
                                options={gender_data}
                                as={<InputPicker
                                    name="gender"
                                    block
                                    value={temp_details.gender}
                                    placeholder="Gender"
                                    data={gender_data}
                                />}
                            />
                            {errors.gender?.type === 'required' && <Danger>This is required</Danger>}

                        </Col>
                    </Row>
                    <Row className="md:my-2">
                        <Col className="mt-2 md:m-0" xs={24} sm={24} md={24}>
                            <Controller
                                name="mother_tongue"
                                control={control}
                                defaultValue={temp_details.mother_tongue}
                                rules={{ required: true }}
                                options={languages}
                                as={<InputPicker
                                    name="mother_tongue"
                                    block
                                    value={temp_details.mother_tongue}
                                    placeholder="Mother Tongue"
                                    data={languages}
                                />}
                            />
                            {errors.mother_tongue?.type === 'required' && <Danger>This is required</Danger>}
                        </Col>
                    </Row>

                    <Row className="md:my-2">
                        <Col className="mt-2 md:m-0" xs={18} md={22}>
                            <p>Other Languages</p>
                        </Col>
                        <Col className="mt-2 md:m-0" xs={4} md={2}>
                            <IconButton onClick={handleAddButton} icon={<Icon icon={"plus"} />} />
                        </Col>
                        {otherLanguagesFields.map((field, index) => {
                            return (

                                <Row key={index} style={{ marginTop: 15, marginBottom: 5 }}>
                                    <Col className="mt-2 md:m-0" xs={11} sm={12} md={10}>
                                        <InputPicker onChange={(label, e) => handleLanguageChange(index, label, e)} block placeholder="Language" data={languages} />
                                    </Col>
                                    <Col className="mt-2 md:m-0" xs={11} sm={12} md={10}>
                                        <InputPicker onChange={(label, e) => handleProficiencyChange(index, label, e)} block placeholder="Proficiency" data={proficiency} />
                                    </Col>
                                    <Col md={4}>
                                        <IconButton onClick={() => handleDeleteButton(index)} icon={<Icon data-index={index} icon={"minus"} />} />
                                    </Col>
                                </Row>

                            )
                        })}
                    </Row>
                    <Row className="md:my-2">
                        <Button type="submit" appearance="primary"> <b>Save</b> </Button>
                    </Row>
                </Form>
            </div>
    )

}

export default EditPersonalDetails;