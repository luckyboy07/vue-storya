import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/pages/login/login'
import EditorPage from '@/pages/editor/app'
import CreateProject from '../pages/editor/create-project'
import NewProject from '../components/create-project/new-project'
import nagpanday from '../pages/others/website-under-constraction'

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
        },
        {
            path: '/new-project',
            name: 'New Project',
            component: NewProject
        },
        {
            path: '/wu',
            name: 'Namanday',
            component: nagpanday
        }
    ]
})