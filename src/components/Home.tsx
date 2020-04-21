import React from 'react';
import IncomeSpendFormTabs from './form/incomeSpending/FormTabs';
import IncomeSpendingList from './list/incomeSpending/IncomeSpendingList'
import Summary from './list/asset/Summary';
import styles from './KakeiboooLayout.module.css';
import {Col, Row} from 'antd';

const Home: React.FC = () => {


  return (
    <div className={styles.contentTop}>
      <Row gutter={16}>
        <Col span={6}>
          <Summary/>
        </Col>
        <Col span={18}>
          <IncomeSpendFormTabs/>
          <IncomeSpendingList offset={5} isMain={false}/>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
