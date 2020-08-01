import React from 'react';
import IncomeSpendFormTabs from '../form/incomeSpending/FormTabs';
import IncomeSpendingList from '../list/incomeSpending/IncomeSpendingList'
import Summary from '../list/asset/Summary';
import styles from '../Root.module.css';
import {Col, Row} from 'antd';

const Top: React.FC = () => {


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

export default Top;
