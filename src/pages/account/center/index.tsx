import { MailOutlined, PhoneOutlined, FormOutlined } from '@ant-design/icons';
import { Card, Col, Divider, Input, Row } from 'antd';
import React, { Component } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { connect, Dispatch } from 'umi';
import { RouteChildrenProps } from 'react-router';
import { ModalState } from './model';
import { CurrentUser } from './data.d';
import styles from './Center.less';

interface CenterProps extends RouteChildrenProps {
  currentUser: Partial<CurrentUser>;
  currentUserLoading: boolean;
  dispatch: Dispatch;
}
interface CenterState {
  tabKey?: 'articles' | 'applications' | 'projects';
}

class Center extends Component<CenterProps, CenterState> {
  // static getDerivedStateFromProps(
  //   props: accountAndcenterProps,
  //   state: accountAndcenterState,
  // ) {
  //   const { match, location } = props;
  //   const { tabKey } = state;
  //   const path = match && match.path;

  //   const urlTabKey = location.pathname.replace(`${path}/`, '');
  //   if (urlTabKey && urlTabKey !== '/' && tabKey !== urlTabKey) {
  //     return {
  //       tabKey: urlTabKey,
  //     };
  //   }

  //   return null;
  // }

  state: CenterState = {
    tabKey: 'articles',
  };

  public input: Input | null | undefined = undefined;

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'accountAndcenter/fetchCurrent',
    });
  }

  renderUserInfo = (currentUser: Partial<CurrentUser>) => (
    <div className={styles.detail}>
      <p>
        <MailOutlined
          style={{
            marginRight: 8,
          }}
        />
        {currentUser.email}
      </p>
      <p>
        <PhoneOutlined
          style={{
            marginRight: 8,
          }}
        />
        {currentUser.phone}
      </p>
      <p>
        <FormOutlined
          style={{
            marginRight: 8,
          }}
        />
        {currentUser.introduce}
      </p>
    </div>
  );

  render() {
    const { currentUser = {}, currentUserLoading } = this.props;
    const dataLoading = currentUserLoading || !(currentUser && Object.keys(currentUser).length);
    return (
      <GridContent>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card bordered={false} style={{ marginBottom: 24 }} loading={dataLoading}>
              {!dataLoading && (
                <div>
                  <div className={styles.avatarHolder}>
                    <img alt="" src={currentUser.avatar} />
                    <div className={styles.name}>{currentUser.name}</div>
                    <div>{currentUser.signature}</div>
                  </div>
                  {this.renderUserInfo(currentUser)}
                  <Divider style={{ marginTop: 16 }} dashed />
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default connect(
  ({
    loading,
    accountAndcenter,
  }: {
    loading: { effects: { [key: string]: boolean } };
    accountAndcenter: ModalState;
  }) => ({
    currentUser: accountAndcenter.currentUser,
    currentUserLoading: loading.effects['accountAndcenter/fetchCurrent'],
  }),
)(Center);
