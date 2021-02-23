import react, { useState } from 'react'
import { Button, Form, FormControl, FormGroup, Panel, Loader } from 'rsuite'
import { loginFail, loginPending, loginSuccess } from './store'
import { login } from 'api/auth'
import { useDispatch, useSelector } from 'react-redux'

const LoginPage = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const { isLoading, isAuth, error } = useSelector(state => state.login)

    const handleOnChange = (value, event) => {
        const name = event.target.name;
        switch (name) {
            case "username":
                setUsername(value)
                break
            case "password":
                setPassword(value)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(loginPending())
        const response = await login({ username, password });
        console.log(response)
        if (response.type == 'success') {
            dispatch(loginSuccess())
        } else {
            dispatch(loginFail(response.message))
        }
    }

    if(isAuth) {
        console.log('Login successful')
        props.history.push('/register')
    }

    return (
        isLoading
            ?
            <Loader size='md' center={true} />
            :
            <>
                <Panel style={{ background: 'white' }} header={<h3>Login</h3>} shaded>
                    <Form fluid>
                        {
                            error &&
                            <p style={{ color: 'red', textAlign: 'center', paddingBottom: '15px' }}>{error}</p>
                        }
                        <FormGroup>
                            <FormControl placeholder="Username" name="username" onChange={handleOnChange} type="text" />
                        </FormGroup>
                        <FormGroup>
                            <FormControl placeholder="Password" name="password" onChange={handleOnChange} type="password" />
                        </FormGroup>
                        <Button onClick={handleSubmit} block appearance="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Panel>
            </>
    );
}

export default LoginPage;