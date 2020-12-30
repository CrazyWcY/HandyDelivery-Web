import Vue from 'vue'
import Router from 'vue-router'
import task from '@/components/task/task'
import user from '@/components/user/user'
import user1 from '@/components/user/user1'
import task1 from '@/components/task/task1'
import taskDetail from '@/components/task/taskDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'task/task1'
    },
    {
      path: '/task',
      name: 'task',
      component: task,
      children:[
        {
          path:'task1',
          name:'task1',
          component: task1
        },
        {
          path:'detail',
          name:'taskDetail',
          component: taskDetail
        },
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: user,
      children:[
        {
          path:'user1',
          name:'user1',
          component: user1
        },
      ]
    },
  ]
})
