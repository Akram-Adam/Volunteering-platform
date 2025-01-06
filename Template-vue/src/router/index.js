import { createRouter, createWebHistory } from 'vue-router'
// General Views
import HomeView from '../views/MainViews/Landingpage.vue'
import Landingpage from '../views/MainViews/Landingpage.vue'
import SignUp from '@/views/MainViews/SignUp.vue'
import LogIn from '../views/MainViews/LogIn.vue'
import ForgotPassword from '../views/MainViews/forgot-password.vue';
import MainPage from '../views/MainViews/MainPage.vue'
import AboutUs from '@/views/MainViews/AboutUs.vue'
import ContactUs from '@/views/MainViews/ContactUs.vue'

// Volunteer Views and Components
import VolunteerDashboard from '../views/VolunteerViews/VolunteerDashboard.vue'
import VolunteerOverview from '@/components/VolunteerComponents/VolunteerOverview.vue'
import VolunteerProfile from '../views/VolunteerViews/VolunteerProfile.vue'
import PostOpportunity from '@/components/VolunteerComponents/PostOpportunity.vue'
import PostedOpportunitiesList from '@/components/VolunteerComponents/PostedOpportunitiesList.vue'

// Requester Views and Components
import RequesterDashboard from '../views/RequesterViews/RequesterDashboard.vue'
import RequesterOverview from '@/components/RequesterComponents/RequesterOverview.vue'
import RequestedOpportunities from '@/components/RequesterComponents/RequestedOpportunities.vue'
import RequesterProfile from '../views/RequesterViews/RequesterProfile.vue'
import RequestOpportunity from '@/components/RequestOpportunity.vue'

// General Components
import MessageComponent from '@/components/GeneralComponents/MessageComponent.vue'  // General component

// unused components
//import VolunteerOpportunities from '../views/VolunteerOpportunities.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landingpage',
      component: Landingpage,
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: "/login",
      name: "LogIn",
      component: LogIn,
    },
    {
      path: "/forgot-password",
      name: "ForgotPassword",
      component: ForgotPassword,
    },
    {
      path: "/main-page",
      name: "MainPage",
      component: MainPage,
    },
    {
      path: '/contact-us',
      name: 'ContactUs',
      component: () => import('@/views/MainViews/ContactUs.vue')
    },
    {
      path: '/about-us',
      name: 'AboutUs',
      component: AboutUs,
    },

    // volunteer dashboard
    {
      path: '/volunteer-dashboard',
      component: VolunteerDashboard,
      children: [
        {
          path: '', // Default child route
          name: 'VolunteerOverview',
          component: VolunteerOverview,
        },
        {
          path: '/posted-opportunities',
          name: 'PostedOpportunitiesList',
          component: PostedOpportunitiesList
        },
        {
          path: '/volunteer-profile',
          name: 'VolunteerProfile',
          component: VolunteerProfile,  // Importing the Volunteer Dashboard page
        },
        {
          path: "/post-opportunity",
          name: "PostOpportunity",
          component: PostOpportunity, // Use the imported component here
        },
        {
          path: '/messages',
          name: 'Messages',
          component: MessageComponent,  // Add route for messaging
        },
        {
          path: '/posted-opportunities',
          name: 'PostedOpportunities',
          component: PostedOpportunitiesList
        },
      ],
    },

   // requester dashboard
   {
    path: '/requester-dashboard',
    component: RequesterDashboard,
    children: [
      {
        path: '', // Default child route
        name: 'RequesterOverview',
        component: RequesterOverview,
      },
      {
        path: '/my-posted-requests', // Default child route
        name: 'RequestedOpportunities',
        component: RequestedOpportunities,
      },
      {
        path: '/requester-profile',
        name: 'RequesterProfile',
        component: RequesterProfile,
      },
      {
        path: '/request-opportunity',
        name: 'RequestOpportunity',
        component: RequestOpportunity,
      },
      {
        path: '/messages',
        name: 'Messages',
        component: MessageComponent,  // Add route for messaging
      },
    ],

  },

  ],
})

export default router
