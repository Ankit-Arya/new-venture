import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

import Landing from '../views/Landing.vue'
import MetroHome from '../views/MetroHome.vue'
import Demo from '../views/Demo.vue'
import TripCharting from '../views/TripCharting.vue'
import TripChartingBlue from '../views/TripChartingBlue.vue'
import TripChartingGreen from '../views/TripChartingGreen.vue'
import TripChartingStatus from '../views/TripChartingStatus.vue'
import DownloadTripChart from '../views/DownloadTripChart.vue'
import SelectLine from '../views/SelectLine.vue'
import Faq from '@/views/Faq.vue'
import ContactUs from '@/views/ContactUs.vue'
import Disclaimer from '@/views/Disclaimer.vue'
import PrivacyPolicy from '@/views/PrivacyPolicy.vue'
import ExecutionControlPage from '../views/ExecutionControlPage.vue'
import LiveNoticeBoardPage from '../views/LiveNoticeBoardPage.vue'

const routes = [

  { path: '/', name: 'Landing', component: Landing },
  { path: '/metro-home', name: 'MetroHome', component: MetroHome },
  { path: '/demo', name: 'Demo', component: Demo },
  { path: '/faq', component: Faq },
  { path: '/contact-us', component: ContactUs },
  { path: '/disclaimer', component: Disclaimer },
  { path: '/privacy-policy', component: PrivacyPolicy },
  { path: '/trip-charting-red', name: 'TripCharting', component: TripCharting, meta: { requiresAuth: true }},
  { path: '/trip-charting-blue', name: 'TripChartingBlue', component: TripChartingBlue, meta: { requiresAuth: true }},
  { path: '/trip-charting-green', name: 'TripChartingGreen', component: TripChartingGreen, meta: { requiresAuth: true }},
  { path: '/execution-control', name: 'ExecutionControlPage', component: ExecutionControlPage },
  { path: '/live-notice-board', name: 'LiveNoticeBoardPage', component: LiveNoticeBoardPage },
  // { path: '/trip-charting-status', name: 'TripChartingStatus', component: TripChartingStatus, meta: { requiresAuth: true }},
  { 
    path: '/trip-charting-status/:executionId', 
    name: 'TripChartingStatus', 
    component: TripChartingStatus, 
    meta: { requiresAuth: true } 
  },
  { 
    path: '/download-trip-chart', 
    name: 'DownloadTripChart', 
    component: DownloadTripChart, 
    meta: { requiresAuth: true } 
  },
  { 
    path: '/select-line', 
    name: 'SelectLine', 
    component: SelectLine, 
    meta: { requiresAuth: true } 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  console.log('Route Guard - Destination:', to.path)
  console.log('isLoggedIn:', auth.isLoggedIn)
  console.log('Token:', auth.token)

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    console.warn('Blocked: Not logged in. Redirecting to Landing.')
    next({ name: 'Landing' })
  } else {
    console.log('Access granted.')
    next()
  }
})


export default router
