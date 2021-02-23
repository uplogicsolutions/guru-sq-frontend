import LoginPage from 'pages/login/LoginPage';
import RegisterPage from 'pages/register/RegisterPage';
import PersonalDetails from 'pages/register/PersonalDetails';
import SchoolTeacher from 'pages/register/SchoolTeacher';
import SubjectSelection from 'pages/register/SubjectSelection';

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
    },
    {
        path: '/subjects',
        component: SubjectSelection
    }
]