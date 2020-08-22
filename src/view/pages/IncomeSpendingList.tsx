import React from 'react';
import List from '../organisms/incomeSpending/IncomeSpendingList';
import { DependencyProps } from '../../core/dependency';

type Props = DependencyProps;

const IncomeSpendingList: React.FC<Props> = (props: Props) => {
  return <List offset={30} isMain={true} dependency={props.dependency} />;
};

export default IncomeSpendingList;
