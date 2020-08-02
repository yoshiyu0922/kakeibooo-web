import React from 'react';

import { Tabs } from 'antd';
import IncomeSpendingFormBase from './Form';

const TabPane = Tabs.TabPane;

const IncomeSpendFormTabs: React.FC = () => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="支出" key="1">
        <IncomeSpendingFormBase kbn={1} />
      </TabPane>
      <TabPane tab="収入" key="2">
        <IncomeSpendingFormBase kbn={2} />
      </TabPane>
    </Tabs>
  );
};

export default IncomeSpendFormTabs;
