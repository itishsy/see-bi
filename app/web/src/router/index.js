import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Layout from '@/components/layouts/Layout'
import Content from '@/components/layouts/Content'
import db from '@/utils/localstorage'
import api from '@/utils/api'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Home',
      redirect: '/home'
    }
  ]
})

let asyncRouter
router.beforeEach((to, from, next) => {
  if (['/login', '/info'].indexOf(to.path) !== -1) {
    next()
  }
  let token = db.get('USER_TOKEN')
  let user = db.get('USER')
  let userRouter = get('USER_ROUTER')
  if (token.length && user) {
    if (!asyncRouter) {
      if (!userRouter) {
        api.get(`menu/${user.username}`).then((res) => {
          asyncRouter = res.data
          save('USER_ROUTER', asyncRouter)
          go(to, next)
        })
      } else {
        asyncRouter = userRouter
        go(to, next)
      }
    } else {
      next()
    }
  } else {
    next('/login')
  }
})

function go (to, next) {
  asyncRouter = filterAsyncRouter(asyncRouter)
  router.addRoutes(asyncRouter)
  next({...to, replace: true})
}

function save (name, data) {
  localStorage.setItem(name, JSON.stringify(data))
}

function get (name) {
  return JSON.parse(localStorage.getItem(name))
}

function filterAsyncRouter (routes) {
  return routes.filter((route) => {
    let component = route.component
    if (component) {
      switch (route.component) {
        case 'Layout':
          route.component = Layout
          break
        case 'Content':
          route.component = Content
          break
        case 'Home':
          route.component = Home
          break
        default:
          route.component = view(component)
      }
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children)
      }
      return true
    }
  })
}

function view (path) {
  return function (resolve) {
    import(`@/components/${path}.vue`).then(mod => {
      resolve(mod)
    })
  }
}

export default router

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: Home
//     }
//   ]
// })
