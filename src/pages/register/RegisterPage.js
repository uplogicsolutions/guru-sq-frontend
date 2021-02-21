import react from 'react'
import { Button, Form, FormControl, FormGroup, FormControlLabel, FormHelpText, Panel } from 'rsuite';

const RegisterPage = () => {

    const handleOnChange = (value, event) => {
        const name = event.target.name;
        const val = value;
    }

    const handleSubmit =  (e) => {
        e.preventDefault()
        console.log('Register')
    }
    return(
        <Panel style={{background:'white'}} header={<h3>Register</h3>}shaded>
            <Form fluid>
                <FormGroup>
                    <FormControl onChange={handleOnChange} placeholder="Username" name="username" type="text" />
                </FormGroup>
                <FormGroup>
                    <FormControl onChange={handleOnChange} placeholder="Password" name="password" type="password" />
                </FormGroup>
                <Button onClick={handleSubmit} block appearance="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Panel>
    )
}

export default RegisterPage;