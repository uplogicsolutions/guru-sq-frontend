import react, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from 'auth/Auth'

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
        <div>
            <form>
                <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={() => dispatch(login(username, password))}>Login</button>
            </form>
        </div>
    );
}

export default LoginPage;