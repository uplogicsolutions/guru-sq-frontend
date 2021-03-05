import LandingPage from 'pages/landing/LandingPage'
import Homepage from 'pages/home/HomePage'
import ProfilePage from 'pages/profile/ProfilePage'

export const routes = [
    {
        path: '/landing',
        component: LandingPage

    },
    {
        path: '/home',
        component: Homepage
    },
    {
        path: '/profile',
        component: ProfilePage
    }
]
