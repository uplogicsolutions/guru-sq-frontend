import React, { useState, useEffect } from 'react';
import { Panel, Row, Col, Input, Form, DatePicker, InputPicker, Button, IconButton, Icon, Loader, Alert } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux'
import { resetRegisterStates, registerSuccess, registerFailure, registerPending } from 'pages/register/store/registerSlice'
import { registerPersonalDetails } from 'api/auth'
import { getOptions } from 'api/options'

const PersonalDetails = (props) => {

    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [dob, setDOB] = useState(null)
    const [gender, setGender] = useState('')
    const [mother_tongue, setMotherTongue] = useState('')
    const [otherLanguagesFields, setOtherLanguagesFields] = useState([{ language_id: '', proficiency: '' }]);

    const [languages, setLanguages] = useState([])
    const [gender_data, setGenderData] = useState([])
    const [proficiency, setProficiency] = useState([])

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

    const handleOnChange = (value, event) => {
        const name = event.target && event.target.name;
        const val = value;

        switch (name) {
            case 'first_name': setFirstName(val)
                break;

            case 'last_name': setLastName(val)
                break;
        }
    }

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            first_name,
            last_name,
            dob,
            gender,
            mother_tongue,
            secondary_languages: otherLanguagesFields,
        }
        dispatch(registerPending())
        let response = await registerPersonalDetails(data);
        if (response.type == 'success') {
            Alert.success('Yay! Added details Successfully')
            dispatch(registerSuccess('/school-teacher'))
        } else {
            dispatch(registerFailure(response.message))
        }
    }
    const handleDeleteButton = (index) => {
        // console.log('Index',index)
        // const values = [...otherLanguagesFields];
        // values.splice(index, 1);
        // setOtherLanguagesFields(values);

        //@TODO handle delete logic
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
                    <Row style={{ marginTop: 15 }} className="show-grid">
                        <Col xs={24} md={12}>
                            <Input name="first_name" onChange={(e, text) => handleOnChange(e, text)} placeholder="First Name" />
                        </Col>
                        <Col xs={24} md={12}>
                            <Input name="last_name" onChange={(e, text) => handleOnChange(e, text)} placeholder="Last Name" />
                        </Col>
                    </Row >

                    <Row style={{ marginTop: 15 }} className="show-grid">
                        <Col xs={24} md={12}>
                            <DatePicker name="dob" format="DD-MM-YYYY" onChange={(date) => setDOB(date)} block placeholder="Date of Birth" />
                        </Col>
                        <Col xs={24} md={12}>
                            <InputPicker onSelect={(value) => setGender(value)} block placeholder="Gender" data={gender_data} />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 15 }} className="show-grid">
                        <Col xs={24} sm={24} md={24}>
                            <InputPicker name="mother_tongue" onSelect={(value) => setMotherTongue(value)} block placeholder="Mother Tounge" data={languages} />
                        </Col>
                    </Row>

                    <Row style={{ marginTop: 15 }} className="show-grid">
                        <Col style={{ marginBottom: 5 }} xs={25} sm={24} md={20}>
                            <p>Other Languages</p>
                        </Col>
                        <Col style={{ marginBottom: 5 }} md={4}>
                            <IconButton onClick={handleAddButton} icon={<Icon icon={"plus"} />} />
                        </Col>
                        {otherLanguagesFields.map((field, index) => {
                            return (

                                <Row key={index} style={{ marginTop: 15, marginBottom: 5 }}>
                                    <Col xs={24} sm={24} md={10}>
                                        <InputPicker onChange={(label, e) => handleLanguageChange(index, label, e)} block placeholder="Language" data={languages} />
                                    </Col>
                                    <Col xs={24} sm={24} md={10}>
                                        <InputPicker onChange={(label, e) => handleProficiencyChange(index, label, e)} block placeholder="Proficiency" data={proficiency} />
                                    </Col>
                                    <Col md={4}>
                                        <IconButton onClick={() => handleDeleteButton(index)} icon={<Icon data-index={index} icon={"minus"} />} />
                                    </Col>
                                </Row>

                            )
                        })}
                    </Row>
                    <Row style={{ marginTop: 15 }} className="show-grid">
                        <Button onClick={handleSubmit} block appearance="primary"> <b>NEXT</b> </Button>
                    </Row>
                </Form>
            </Panel>
    )

}

export default PersonalDetails;