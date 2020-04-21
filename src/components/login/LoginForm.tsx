import React, {FormEvent, useState} from 'react';
import {Button, Form, Input, Modal, Row} from 'antd';
import styles from '../KakeiboooLayout.module.css';
import axios from 'axios';

type Token = {
  token: string;
};

const isToken = (token: any): token is Token => typeof token.token != undefined;

const LoginForm: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const authorization = (e: FormEvent) => {
    e.preventDefault();
    axios
      .post('http://localhost:9000/auth', {
        userId: userId,
        password: password,
      })
      .then(res => {
        if (isToken(res.data)) {
          const response = res.data as Token;
          localStorage.setItem('token', response.token);
          window.location.href = '/top';
        }
      })
      .catch(() => {
        Modal.error({
          title: '認証失敗',
          content: 'ログインIDもしくはパスワードが間違っています',
        });
      });
  };

  return (
    <div className={styles.contentTop}>
      <Form
        layout="inline"
        className={styles.inputForm}
        onSubmit={e => authorization(e)}
      >
        <h2 style={{marginTop: 4, textAlign: 'center'}}>ログイン</h2>
        <Row style={{marginTop: 3}}>
          <Input
            placeholder="ログインID"
            value={userId}
            onChange={e => setUserId(e.target.value)}
          />
        </Row>
        <Row style={{marginTop: 3}}>
          <Input.Password
            placeholder="パスワード"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Row>
        <Row style={{marginTop: 4, textAlign: 'center'}}>
          <Button type="primary" htmlType="submit">
            ログイン
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default LoginForm;
