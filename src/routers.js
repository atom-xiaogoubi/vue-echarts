import Home from './components/home.vue'
import Charts from './components/charts.vue'

const routers = [
    {
        path: '/home',
        name: 'home',
        component: Home
    },
  {
      path: '/',
          component: Home
  },
    {
        path: '/chart',
        name: 'chart',
        component: Charts
    },
]
export default routers
