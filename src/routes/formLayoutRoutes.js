import LoginPage from 'pages/login/LoginPage';
import RegisterPage from 'pages/register/RegisterPage';
import PersonalDetails from 'pages/register/PersonalDetails';
import SchoolTeacher from 'pages/register/SchoolTeacher';

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
    },
    {
        path: '/school-teacher',
        component: SchoolTeacher
    }
]