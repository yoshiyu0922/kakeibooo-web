import React, {useEffect} from 'react';
import 'antd/dist/antd.css';
import Root from './view/Root';
import {DispatchToPropsType} from "./redux/AppContainer";
import {AppState} from "./redux/AppState";

type Props = DispatchToPropsType;

const App: React.FC<Props> = (props: Props) => {
  useEffect(() => {
    props.fetchMaster({} as AppState);
  }, []);

  return (<Root/>);
};

export default App;
