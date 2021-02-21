import react, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from 'auth/Auth'
import { Button, Form, FormControl, FormGroup, FormControlLabel, FormHelpText, Panel } from 'rsuite';


const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    if (user) {
        return (
            <div>
                Hi, {user.username}!
                <button onClick={() => dispatch(logout())}>Logout</button>
            </div>
        )
    }
    return (
        <Panel style={{background:'white'}} header={<h3>Login</h3>}shaded>
            <Form fluid>
                <FormGroup>
                    <FormControl placeholder="Username" name="username" type="text" />
                </FormGroup>
                <FormGroup>
                    <FormControl placeholder="Password" name="password" type="password" />
                </FormGroup>
                <Button block appearance="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Panel>
        // <div>
        //     <form>
        //         <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        //         <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        //         <Button appearance="primary" onClick={() => dispatch(login(username, password))}>Login</Button>
        //     </form>
        // </div>
    );
}

export default LoginPage;