import LoginPage from 'pages/login/LoginPage';
import RegisterPage from 'pages/register/RegisterPage';
import PersonalDetails from 'pages/register/PersonalDetails';

export const routes = [
    {
        path: '/login',
        component: LoginPage

    },
    {
        path: '/register',
        component: RegisterPage
    },
    {
        path: '/personal-details',
        component: PersonalDetails
    }
]