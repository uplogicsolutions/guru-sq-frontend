import LandingPage from 'pages/landing/LandingPage'
import Homepage from 'pages/home/HomePage'
import ProfilePage from 'pages/profile/ProfilePage'
import NotificationPage from 'pages/notifications/NotificationsPage'
import ClusterPage from 'pages/cluster/ClusterPage'
import UserProfile from 'pages/userProfile/userProfile'

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
    },
    {
        path: '/notifications',
        component: NotificationPage
    },
    {
        path: '/cluster',
        component: ClusterPage
    },
    {
        path: '/user-profile/:user_id',
        component: UserProfile
    }
]
