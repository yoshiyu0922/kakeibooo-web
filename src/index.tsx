import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import store from "./redux/AppStore";
import {ConfigProvider} from "antd";
import jaJP from "antd/lib/locale-provider/ja_JP";
import AppContainer from './redux/AppContainer'

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider {...{locale: jaJP}}>
      <AppContainer/>
    </ConfigProvider>
  </Provider>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
