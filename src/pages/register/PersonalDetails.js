import React, { useState } from 'react';
import { Panel, Row, Col, Input, Form, DatePicker, InputPicker, Button, IconButton, Icon } from 'rsuite';


const gender_data = [
    {
        "label": "Male",
        "value": "male",
        "role": ""
    },
    {
        "label": "Female",
        "value": "female",
        "role": ""
    },
    {
        "label": "Other",
        "value": "other",
        "role": ""
    }
]

const languages = [
    {
        "label": "English",
        "value": "english",
        "role": "",
        
    },
    {
        "label": "Hindi",
        "value": "hindi",
        "role": ""
    }
]

const proficiency = [
    {
        "label": "Fluent",
        "value": "fluent",
        "role": ""
    },
    {
        "label": "Beginner",
        "value": "beginner",
        "role": ""
    }
]

const PersonalDetails = (props) => {

    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [dob, setDOB] = useState(null)
    const [gender, setGender] = useState('')
    const [mother_tounge, setMotherTounge] = useState('')
    const [otherLanguagesFields, setOtherLanguagesFields] = useState([{ language: '', proficiency: '' }]);

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
        values[index].language = label

        setOtherLanguagesFields(values)
    }

    const handleProficiencyChange = (index, label, e) => {
        const values = [...otherLanguagesFields];
        values[index].proficiency = label

        setOtherLanguagesFields(values)
    }

    const handleAddButton = () => {
        const values = [...otherLanguagesFields]
        values.push({ language: '', proficiency: '' })
        setOtherLanguagesFields(values)
    }
    
    const handleSubmit = () => {
        const data = {
            first_name,
            last_name,
            dob,
            gender,
            mother_tounge,
            otherLanguagesFields,
        }
        console.log(data)
    }
    const handleDeleteButton = (index) => {
        // console.log('Index',index)
        // const values = [...otherLanguagesFields];
        // values.splice(index, 1);
        // setOtherLanguagesFields(values);

        //@TODO handle delete logic
    }
    return (
        <Panel style={{ background: 'white' }} shaded>
            <Form>
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
                        <DatePicker name="dob" onChange={(date) => setDOB(date)} block placeholder="Date of Birth" />
                    </Col>
                    <Col xs={24} md={12}>
                        <InputPicker onSelect={(value) => setGender(value)} block placeholder="Gender" data={gender_data} />
                    </Col>
                </Row>
                <Row style={{ marginTop: 15 }} className="show-grid">
                    <Col xs={24} sm={24} md={24}>
                        <InputPicker name="mother_tounge" onSelect={(value) => setMotherTounge(value)} block placeholder="Mother Tounge" data={languages} />
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

                            <Row style={{ marginTop: 15, marginBottom: 5 }}>
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