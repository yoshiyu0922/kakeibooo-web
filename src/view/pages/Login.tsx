import React, { FormEvent, useState } from 'react';
import { Button, Form, Input, Modal, Row } from 'antd';
import styles from '../Root.module.css';
import { DependencyProps } from '../../core/dependency';

type Props = DependencyProps;

const Login: React.FC<Props> = (props: Props) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const authorization = (e: FormEvent) => {
    e.preventDefault();

    props.dependency.authentication
      .authenticate(userId, password)
      .then(token => {
        if (token.auth != undefined) {
          localStorage.setItem('token', token.auth.token);
          window.location.href = '/top';
        } else {
          Modal.error({
            title: '認証失敗',
            content: 'ログインIDもしくはパスワードが間違っています',
          });
        }
      });
  };

  return (
    <div className={styles.contentTop}>
      <Form
        layout="inline"
        className={styles.inputForm}
        onSubmit={e => authorization(e)}
      >
        <h2 style={{ marginTop: 4, textAlign: 'center' }}>ログイン</h2>
        <Row style={{ marginTop: 3 }}>
          <Input
            placeholder="ログインID"
            value={userId}
            onChange={e => setUserId(e.target.value)}
          />
        </Row>
        <Row style={{ marginTop: 3 }}>
          <Input.Password
            placeholder="パスワード"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Row>
        <Row style={{ marginTop: 4, textAlign: 'center' }}>
          <Button type="primary" htmlType="submit">
            ログイン
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default Login;
