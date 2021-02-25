import react, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, FormControl, FormGroup, Panel, Loader } from 'rsuite'
import { resetRegisterStates, registerSuccess, registerFailure, registerPending } from 'pages/register/store/registerSlice'
import { register } from 'api/auth'

const RegisterPage = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const { loading, redirect, redirectUrl, error } = useSelector(state => state.register)

    useEffect( () => {
        dispatch(resetRegisterStates())
    },[])

    const handleOnChange = (value, event) => {
        const name = event.target.name;
        switch (name) {
            case 'username':
                setUsername(value)
                break
            case 'password':
                setPassword(value)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(username, password)
        dispatch(registerPending())
        let response = await register({username, password});
        console.log(response)
        if(response.type == 'success') {
            dispatch(registerSuccess('/personal-details'))
        } else {
            dispatch(registerFailure(response.message))
        }
    }

    if(redirect) {
        props.history.push(redirectUrl);
    }

    return (
        loading
            ?
            <Loader size='md' center={true} />
            :
            <Panel style={{ background: 'white' }} header={<h3>Register</h3>} shaded>
                <Form fluid>
                    {
                        error &&
                        <p style={{ color: 'red', textAlign: 'center', paddingBottom: '15px' }}>{error}</p>
                    }
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