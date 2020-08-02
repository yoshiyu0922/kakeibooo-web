import React, { useEffect, useState } from 'react';
import { Button, Icon, Table } from 'antd';
import Repository from '../../core/Repository';
import { Budget, BudgetDetail, initBudgets } from '../../types/Budget';
import { AxiosResponse } from 'axios';
import EditModal from './EditModal';
import moment, { Moment } from 'moment';
import styles from '../Root.module.css';

const BudgetList: React.FC = () => {
  const [list, setList] = useState(initBudgets);
  const [month, setMonth] = useState(new Date());
  const now = moment(Date.now());
  const [currentMonth, setCurrentMonth] = useState(now);
  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState({} as Budget);

  const updateList = (targetDate: Moment) => {
    const repository = Repository.instance;
    const yyyyMM = parseInt(targetDate.format('YYYYMM'));
    repository.fetchBudgets(yyyyMM, (res: AxiosResponse) => {
      const list = res.data.list as Budget[];
      setList(list);
    });
  };

  useEffect(() => {
    updateList(moment(Date.now()));
  }, []);

  const showModal = (id: number, data: Budget) => {
    console.log(data);
    setSelectedData(data);
    setIsShowModal(true);
  };

  const extractBudgetDetail = (
    payMethod: number,
    budget: Budget
  ): BudgetDetail | undefined => {
    return budget.details.find((b: BudgetDetail) => {
      return b.howToPayId === payMethod;
    });
  };

  const updateMonth = (increase: number) => {
    let _month = moment(month);
    if (increase !== 0) {
      _month.add(increase, 'M');
    } else {
      _month = moment(new Date());
    }
    updateList(_month);
    setCurrentMonth(_month);
    setMonth(_month.toDate());
  };

  const columns = [
    {
      title: '',
      dataIndex: 'categoryId',
      key: 'categoryId',
      render: (id: number, data: Budget) => {
        return (
          <React.Fragment>
            <Button size="small" onClick={() => showModal(id, data)}>
              <Icon type="edit" />
            </Button>
          </React.Fragment>
        );
      },
      width: 10,
    },
    {
      title: 'カテゴリ',
      dataIndex: 'categoryName',
      width: 80,
    },
    {
      title: '予算（現金）',
      key: 'amountCache',
      render: (v: number, record: Budget) => {
        const detail = extractBudgetDetail(2, record);
        const amount = detail ? detail.amount : 0;
        return <span> {amount.toLocaleString()}円</span>;
      },
      width: 40,
    },
    {
      title: '予算（カード）',
      key: 'amountCard',
      render: (v: number, record: Budget) => {
        const detail = extractBudgetDetail(1, record);
        const amount = detail ? detail.amount : 0;
        return <span> {amount.toLocaleString()}円</span>;
      },
      width: 40,
    },
    {
      title: '実績（現金）',
      key: 'resultCacheAmount',
      render: (v: number, record: Budget) => {
        const detail = extractBudgetDetail(2, record);
        const amount = detail ? detail.resultAmount : 0;
        return <span> {amount.toLocaleString()}円</span>;
      },
      width: 40,
    },
    {
      title: '実績（カード）',
      key: 'resultCardAmount',
      render: (v: number, record: Budget) => {
        const detail = extractBudgetDetail(1, record);
        const amount = detail ? detail.resultAmount : 0;
        return <span> {amount.toLocaleString()}円</span>;
      },
      width: 40,
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      width: 150,
    },
  ];

  return (
    <div className={styles.list}>
      <Button className={styles.buttonMonth} onClick={() => updateMonth(-1)}>
        <Icon type="caret-left" />
      </Button>
      <span className={styles.labelMonth}>
        {currentMonth.startOf('month').format('YYYY/MM/DD')}&nbsp;〜&nbsp;
        {currentMonth.endOf('month').format('YYYY/MM/DD')}
      </span>
      <Button className={styles.buttonMonth} onClick={() => updateMonth(1)}>
        <Icon type="caret-right" />
      </Button>
      <Button className={styles.buttonMonth} onClick={() => updateMonth(0)}>
        this month
      </Button>
      <Table
        pagination={{ pageSize: 1000 }}
        rowKey={'categoryId'}
        columns={columns}
        dataSource={list}
        scroll={{ x: 1200 }}
      />
      <EditModal
        isShowModal={isShowModal}
        data={selectedData}
        onCloseAfterUpdated={() => {
          const _month = moment(month);
          updateList(_month);
          setIsShowModal(false);
        }}
      />
    </div>
  );
};

export default BudgetList;
