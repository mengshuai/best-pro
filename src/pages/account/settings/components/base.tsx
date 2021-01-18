import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Upload, Form, message } from 'antd';
import { connect, Dispatch } from 'umi';
import React, { Component } from 'react';

import { CurrentUser } from '../data.d';
import PhoneView from './PhoneView';
import styles from './BaseView.less';

// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }: { avatar: string }) => (
  <>
    <div className={styles.avatar_title}>头像</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          更换头像
        </Button>
      </div>
    </Upload>
  </>
);

const validatorPhone = (rule: any, value: string, callback: (message?: string) => void) => {
  const values = value.split('-');
  if (!values[0]) {
    callback('请输入区号，中国大陆86!');
  }
  if (!values[1]) {
    callback('请输入联系电话!');
  }
  callback();
};

interface BaseViewProps {
  currentUser?: CurrentUser;
  dispatch: Dispatch;
}

class BaseView extends Component<BaseViewProps> {
  view: HTMLDivElement | undefined = undefined;

  getAvatarURL() {
    const { currentUser } = this.props;
    if (currentUser) {
      if (currentUser.avatar) {
        return currentUser.avatar;
      }
      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }
    return '';
  }

  getViewDom = (ref: HTMLDivElement) => {
    this.view = ref;
  };

  handleFinish = (data: any) => {
    const { currentUser, dispatch } = this.props;
    dispatch({
      type: 'accountAndsettings/fetchUpdateUser',
      payload: { ...data, id: currentUser?._id },
    })
      .then(() => {
        message.success('更新基本信息成功');
      })
      .catch((resp: any) => {
        message.error(resp.message);
      });
  };

  render() {
    const { currentUser } = this.props;

    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form
            layout="vertical"
            onFinish={this.handleFinish}
            initialValues={currentUser}
            hideRequiredMark
          >
            <Form.Item
              name="email"
              label="邮箱"
              rules={[
                {
                  required: true,
                  message: '请输入邮箱',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="name"
              label="昵称"
              rules={[
                {
                  required: true,
                  message: '请输入昵称',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="introduce"
              label="个人简介"
              rules={[
                {
                  required: true,
                  message: '请输入个人简介',
                },
              ]}
            >
              <Input.TextArea placeholder="个人简介" rows={4} />
            </Form.Item>

            <Form.Item
              name="phone"
              label="联系电话"
              rules={[
                {
                  required: true,
                  message: '请输入联系电话',
                },
                { validator: validatorPhone },
              ]}
            >
              <PhoneView />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                更新基本信息
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={styles.right}>
          <AvatarView avatar={this.getAvatarURL()} />
        </div>
      </div>
    );
  }
}

export default connect(
  ({ accountAndsettings }: { accountAndsettings: { currentUser: CurrentUser } }) => ({
    currentUser: accountAndsettings.currentUser,
  }),
)(BaseView);
