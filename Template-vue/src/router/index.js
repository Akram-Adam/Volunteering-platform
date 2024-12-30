import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Landingpage.vue'
import Landingpage from '../views/Landingpage.vue'
import SignUp from '@/views/SignUp.vue' // Import your SignUp component
import LogIn from "../views/LogIn.vue"; // Import Login view
import VolunteerDashboard from '../views/VolunteerDashboard.vue'
//import VolunteerOpportunities from '../views/VolunteerOpportunities.vue'
import PostOpportunity from '@/components/PostOpportunity.vue' // Import the PostOpportunity component
import PostedOpportunitiesList from '@/components/PostedOpportunitiesList.vue'
import FindVolunteeringOpportunity from '@/components/FindVolunteeringOpportunity.vue' // Import the component FindOpportunituy
import MessageComponent from '@/components/MessageComponent .vue'  // Import the message component
import ContactUs from '@/views/ContactUs.vue' // import contact page
import AboutUs from '@/views/AboutUs.vue' // import about page
import RequesterOpportunityList from'@/views/RequesterOpportunityList.vue' // import requester opporuninty list that posted by volunteers

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
      component: LogIn
    },
    {
      path: '/volunteer-dashboard',
      name: 'VolunteerDashboard',
      component: VolunteerDashboard,  // Importing the Volunteer Dashboard page
    },
    {
      path: "/post-opportunity",
      name: "PostOpportunity",
      component: PostOpportunity, // Use the imported component here
    },
    {
      path: '/posted-opportunities',
      name: 'PostedOpportunities',
      component: PostedOpportunitiesList
    },
    {
      path: '/find-volunteering-opportunity',
      name: 'FindVolunteeringOpportunity',
      component: FindVolunteeringOpportunity,
    },
    {
      path: '/messages',
      name: 'Messages',
      component: MessageComponent,  // Add route for messaging
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: HomeView,
    },
    {
      path: '/contact-us',
      name: 'ContactUs',
      component: () => import('@/views/ContactUs.vue')
    },
    {
      path: '/about-us',
      name: 'AboutUs',
      component: AboutUs,
    },
    {
      path: '/opportunity-list-pag',
      name: 'RequesterOpportunityList',
      component: RequesterOpportunityList,
    },
  ],
})

export default router
