import Home from './components/home.vue'
import Game from './components/game.vue'

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
        path: '/game',
        name: 'game',
        component: Game
    },
]
export default routers
