import { Request, Response } from 'express';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

async function getFakeCaptcha(req: Request, res: Response) {
  await waitTime(2000);
  return res.json('captcha-xxx');
}

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    code: 0,
    message: '登录成功',
    data: {
      github_id: '',
      name: 'ms1',
      type: 1,
      phone: '',
      img_url: '',
      email: 'ms1@163.com',
      introduce: '',
      avatar: 'user',
      location: 'user',
      password: '8257b8ca5ce4ecc0d41ea5827c5602f6',
      _id: '5fe2115cf906bf17ca00b8f7',
      create_time: '2020-12-22T15:31:40.759Z',
      update_time: '2020-12-22T15:31:40.759Z',
      id: 2,
      __v: 0,
    },
  },

  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/login': async (req: Request, res: Response) => {
    const { password, email } = req.body;
    await waitTime(2000);
    if (password === 'ant.design' && email === 'admin@163.com') {
      res.send({
        code: 0,
        currentAuthority: 'admin',
      });
      return;
    }
    if (password === 'ant.design' && email === 'user@163.com') {
      res.send({
        status: 'ok',
        currentAuthority: 'user',
      });
      return;
    }

    res.send({
      status: 'error',
      currentAuthority: 'guest',
    });
  },
  'POST /api/register': (req: Request, res: Response) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
  'GET /api/500': (req: Request, res: Response) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req: Request, res: Response) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req: Request, res: Response) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req: Request, res: Response) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },

  'GET  /api/login/captcha': getFakeCaptcha,
};
