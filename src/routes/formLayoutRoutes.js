import LoginPage from 'pages/login/LoginPage';
import RegisterPage from 'pages/register/RegisterPage';
import PersonalDetails from 'pages/register/PersonalDetails';
import SchoolTeacher from 'pages/register/SchoolTeacher';
import SubjectSelection from 'pages/register/SubjectSelection';
import EducationalDetails from 'pages/register/EducationalDetails';
import JobDetails from 'pages/register/JobDetails';

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
    },
    {
        path: '/educational-details',
        component: EducationalDetails,
    },
    {
        path: '/job-details',
        component: JobDetails
    }
]