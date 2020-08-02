import React from 'react';
import 'antd/dist/antd.css';
import styles from './Root.module.css';
import { Layout } from 'antd';
import Top from './pages/Top';
import IncomeSpendingList from './list/incomeSpending/IncomeSpendingList';
import BudgetList from './budget/BudgetList';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import Auth from './Auth';
import { DependencyProps } from '../core/dependency';

const { Header, Footer, Content } = Layout;

type Props = DependencyProps;

const Root: React.FC<Props> = (props: Props) => {
  const styleHeaderMenuLi = (path: string, label: string) => {
    return (
      <NavLink to={path} activeClassName={styles.headerMenuLiSelected}>
        <li className={styles.headerMenuLi}>{label}</li>
      </NavLink>
    );
  };
  return (
    <Layout>
      <BrowserRouter>
        <Header>
          <h1 style={{ color: 'white', float: 'left' }}>家計簿</h1>
          <nav>
            <div className={styles.headerMenu}>
              <ul className={styles.headerMenuUl}>
                {styleHeaderMenuLi('/top', 'HOME')}
                {styleHeaderMenuLi('/incomeSpending', '一覧')}
                {styleHeaderMenuLi('/budget', '予算（予実）')}
                {styleHeaderMenuLi('/monthlyIncomeSpending', '月別収支')}
                {styleHeaderMenuLi('/asset', '資産')}
                {styleHeaderMenuLi('/calculatePresidentTax', 'ダッシュボード')}
                {styleHeaderMenuLi('/calculatePresidentTax', '住民税計算')}
              </ul>
            </div>
          </nav>
        </Header>
        <Content className={styles.content}>
          <Switch>
            <Auth dependency={props.dependency}>
              <Switch>
                <Route extract path="/top" component={Top} />
                <Route
                  extract
                  path="/incomeSpending"
                  component={() => (
                    <IncomeSpendingList offset={30} isMain={true} />
                  )}
                />
                <Route extract path="/budget" component={BudgetList} />>
                {/* TODO: notfoundページを作成 create default page */}
              </Switch>
            </Auth>
          </Switch>
        </Content>
      </BrowserRouter>
      <Footer className={styles.footer}>created by yuki.yoshikawa</Footer>
    </Layout>
  );
};

export default Root;
