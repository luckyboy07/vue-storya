import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/pages/login/login'
import EditorPage from '@/pages/editor/app'
import CreateProject from '../pages/editor/create-project'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Login',
            component: LoginPage
        },
        {
            path: '/editor',
            name: 'EditorApp',
            component: EditorPage
        },
        {
            path: '/new-storya',
            name: 'New Storya',
            component: CreateProject
        }
    ]
})