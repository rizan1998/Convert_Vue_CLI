import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home';
import About from '../views/About';
import Contact from '../views/Contact';

import NewPost from '../views/notes/Create';
import TableOfNote from '../views/notes/Table'
import ShowTheNote from '../views/notes/Show';
import EditTheNote from '../views/notes/Edit';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'page.about',
    component: About
  },
  {
    path: '/contact',
    name: 'page.contact',
    component: Contact
  },


  // notes
  {
    path: '/notes/create',
    name: 'notes.create',
    component: NewPost
  },
  {
    path: '/notes/table',
    name: 'notes.table',
    component: TableOfNote
  },
  {
    path: '/notes/:noteSlug',
    name: 'notes.show',
    component: ShowTheNote
  },
  {
    path: '/notes/:noteSlug/edit',
    name: 'notes.edit',
    component: EditTheNote
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
