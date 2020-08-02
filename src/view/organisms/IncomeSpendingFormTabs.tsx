import React from 'react';

import { Tabs } from 'antd';
import IncomeSpendingForm from '../molecules/IncomeSpendingForm';

const TabPane = Tabs.TabPane;

const IncomeSpendFormTabs: React.FC = () => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="支出" key="1">
        <IncomeSpendingForm kbn={1} />
      </TabPane>
      <TabPane tab="収入" key="2">
        <IncomeSpendingForm kbn={2} />
      </TabPane>
    </Tabs>
  );
};

export default IncomeSpendFormTabs;
