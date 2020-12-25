import React from 'react';
import { Button, message } from 'antd';
import { ModalForm, ProFormText, ProFormSelect, ProFormTextArea } from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';

export interface FormValueType {
  name: string;
  email: string;
  currentAuthority: string;
  avatar: string;
  introduce: string;
}
export default (props: any) => {
  const { onSubmit, onCancel, updateModalVisible, values } = props;
  const { name, email, currentAuthority, avatar, introduce } = values;
  return (
    <ModalForm
      title="新建表单"
      trigger={
        <Button type="primary">
          <PlusOutlined />
          新建表单
        </Button>
      }
      modalProps={{
        onCancel,
      }}
      visible={updateModalVisible}
      onFinish={async (formValues) => {
        await onSubmit(formValues);
        message.success('提交成功');
        return true;
      }}
    >
      <ProFormText
        width="md"
        name="name"
        label="名称"
        placeholder="请输入名称"
        initialValue={name}
      />
      <ProFormText
        width="md"
        name="email"
        label="邮箱"
        placeholder="请输入邮箱"
        initialValue={email}
      />
      <ProFormSelect
        options={[
          {
            value: 'user',
            label: '用户',
          },
          {
            value: 'admin',
            label: '管理员',
          },
          {
            value: 'user',
            label: '游客',
          },
        ]}
        width="md"
        name="currentAuthority"
        label="角色"
        initialValue={currentAuthority}
      />
      <ProFormText
        width="md"
        name="avatar"
        label="头像"
        placeholder="请输入头像地址url"
        initialValue={avatar}
      />
      <ProFormTextArea
        name="introduce"
        label="简介"
        placeholder="请输入简介"
        initialValue={introduce}
      />
    </ModalForm>
  );
};
