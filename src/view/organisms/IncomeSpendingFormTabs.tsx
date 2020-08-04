import React from 'react';

import { Tabs } from 'antd';
import IncomeSpendingForm from '../molecules/IncomeSpendingForm';
import { DependencyProps } from '../../core/dependency';

const TabPane = Tabs.TabPane;

type Props = DependencyProps;

const IncomeSpendFormTabs: React.FC<Props> = (props: Props) => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="支出" key="1">
        <IncomeSpendingForm kbn={1} dependency={props.dependency} />
      </TabPane>
      <TabPane tab="収入" key="2">
        <IncomeSpendingForm kbn={2} dependency={props.dependency} />
      </TabPane>
    </Tabs>
  );
};

export default IncomeSpendFormTabs;
