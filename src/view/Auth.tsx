import React from 'react';
import {Redirect} from 'react-router';
import Login from "./pages/Login";
import { DependencyProps } from "../core/dependency";

type Props = {
  children: React.ReactNode;
} & DependencyProps;

const Auth: React.FC<Props> = props => {
  const token: string | null = localStorage.getItem('token');

  const path = window.location.pathname;

  if (token === null) {
    return path === '/login' ?
      <Login dependency={props.dependency}/> : <Redirect to={'/login'}/>;
  } else {
    return path === '/login' || path === '/' ?
      <Redirect to={'/top'}/> : <React.Fragment>{props.children}</React.Fragment>
  }
};

export default Auth;
