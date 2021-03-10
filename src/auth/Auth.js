import { parseJwt, isJwtTokenValid } from 'utils/jwt'
import store from 'store'
class AuthService {
    checkInitState() {
        const token = localStorage.getItem('token');
        if(token) {
            const parsedJWT = parseJwt(token)
            const valid = isJwtTokenValid(parsedJWT);
            if(valid) {
                //check user state
                //if not loggedIn
            }            
            return {
                login: 'failure',
                redirect: '/login'
            }
        }
        return {
            login: 'failure',
            redirect: '/'
        }
    }

}

const instance = new AuthService();

export default instance;
