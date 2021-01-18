export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: '登录',
            path: '/user/login',
            component: './user/login',
          },
          { path: '/user/register', name: '注册', component: './user/register' },
          {
            name: '注册结果',
            icon: 'smile',
            path: '/user/register-result',
            component: './user/register-result',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/welcome',
                name: '欢迎',
                icon: 'smile',
                component: './Welcome',
              },
              {
                path: '/admin',
                name: '管理',
                icon: 'crown',
                authority: ['admin'],
                routes: [
                  {
                    path: '/admin/account',
                    name: '用户管理',
                    icon: 'smile',
                    component: './admin/account/index',
                    authority: ['admin', 'user'],
                  },
                ],
              },
              {
                name: '个人页',
                icon: 'user',
                path: '/account',
                routes: [
                  {
                    path: '/',
                    redirect: '/account/center',
                  },
                  {
                    name: '个人中心',
                    icon: 'smile',
                    path: '/account/center',
                    component: './account/center',
                  },
                  {
                    name: '个人设置',
                    icon: 'smile',
                    path: '/account/settings',
                    component: './account/settings',
                  },
                ],
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
