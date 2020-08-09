import React from 'react';
import IncomeSpendFormTabs from '../organisms/IncomeSpendingFormTabs';
// import IncomeSpendingList from '../list/incomeSpending/IncomeSpendingList';
import Summary from '../molecules/Summary';
import styles from '../Root.module.css';
import { Col, Row } from 'antd';
import { DependencyProps } from '../../core/dependency';

type Props = DependencyProps;

const Top: React.FC<Props> = (props: Props) => {
  return (
    <div className={styles.contentTop}>
      <Row gutter={16}>
        <Col span={6}>
          <Summary dependency={props.dependency} />
        </Col>
        <Col span={18}>
          <IncomeSpendFormTabs dependency={props.dependency} />
          {/*<IncomeSpendingList offset={5} isMain={false} />*/}
        </Col>
      </Row>
    </div>
  );
};

export default Top;
