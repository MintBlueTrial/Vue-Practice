import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path(.*)',
                component: () => import('@/views/redirect/index')
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {
        path: '/auth-redirect',
        component: () => import('@/views/login/auth-redirect'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/error-page/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/views/error-page/401'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/dashboard/index'),
                name: 'Dashboard',
                meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
            }
        ]
    },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
    {
        path: '/book',
        name: 'Book',
        component: Layout,
        meta: { title: '图书管理', icon: 'documentation', roles: ['admin'] },
        redirect: '/book/create',
        children: [
            {
                path: '/book/create',
                name: 'BookCreate',
                component: () => import('@/views/book/create'),
                meta: { title: '上传图书信息', icon: 'edit', roles: ['admin']}
            },
            {
                path: '/book/edit/:fileName',
                name: 'BookEdit',
                component: () => import('@/views/book/edit'),
                meta: { title: '编辑图书', icon: 'edit', roles: ['admin'], activeMenu: '/book/list'},
                hidden: true
            },
            {
                path: '/book/list',
                name: 'BookList',
                component: () => import('@/views/book/list'),
                meta: { title: '图书列表', icon: 'list', roles: ['admin']}
            }
        ]
    },
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
