import React, { useEffect, useState } from 'react';
import { Button, Icon, Modal, Table } from 'antd';
import styles from '../../Root.module.css';
import {
  IncomeSpendingType,
  initIncomeSpending,
} from '../../../types/incomeSpending';
import moment, { Moment } from 'moment';
import IncomeSpendingEditModal from './IncomeSpendingEditModal';
import { useSelector } from 'react-redux';
import { appStateSelector } from '../../../redux/appStore';
import { DependencyProps } from '../../../core/dependency';

const { confirm } = Modal;

type Props = {
  offset: number;
  isMain: boolean;
} & DependencyProps;

const IncomeSpendingList: React.FC<Props> = props => {
  const [list, setList] = useState(initIncomeSpending);
  const appState = useSelector(appStateSelector);
  const now = moment(Date.now());
  const [currentMonth, setCurrentMonth] = useState(now);
  const [month, setMonth] = useState(new Date());
  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState({} as IncomeSpendingType);

  const updateList = (_month: Moment) => {
    const userId = appState.value.user.id;
    const paramMonth = parseInt(_month.format('YYYYMM'));
    const params = { userId: userId, yyyymm: paramMonth, limit: 300 };
    props.dependency.incomeSpending.search(params).then(result => {
      const list = result.map((row, _) => {
        const amount = row.isIncome ? row.amount : -1 * row.amount;
        return { ...row, ...{ amount: amount } };
      });
      setList(list);
    });
  };

  useEffect(() => {
    if (appState.value.user.id !== undefined) updateList(now);
  }, [appState]);

  const confirmDelete = (id: number, data: IncomeSpendingType) => {
    confirm({
      title: '削除しても良いですか？',
      content: (
        <div>
          <ul>
            <li>発生日: {data.accrualDate}</li>
            <li>金額: {data.amount.toLocaleString()}円</li>
            <li>カテゴリ: {data.categoryDetailName}</li>
            <li>内容: {data.content}</li>
          </ul>
        </div>
      ),
      onOk() {
        const userId = appState.value.user.id;
        const params = {
          id: id,
          userId: userId,
        };
        props.dependency.incomeSpending
          .delete(params)
          .then(id => {
            Modal.info({ title: '削除成功', content: '削除に成功しました' });
            const updated = list.filter((i: IncomeSpendingType) => i.id !== id);
            setList(updated);
          })
          .catch(() => {
            Modal.error({ title: '削除失敗', content: '削除に失敗しました' });
          });
      },
      onCancel() {},
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

  const showModal = (id: number, data: IncomeSpendingType) => {
    setSelectedData(data);
    setIsShowModal(true);
  };

  const columnAmountAlign: 'left' | 'right' | 'center' = 'right';
  const columns = [
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      render: (id: number, data: IncomeSpendingType) => {
        if (props.isMain) {
          return (
            <React.Fragment>
              <Button size="small" onClick={() => showModal(id, data)}>
                <Icon type="edit" />
              </Button>
              <Button size="small" onClick={() => confirmDelete(id, data)}>
                <Icon type="delete" />
              </Button>
            </React.Fragment>
          );
        } else {
          return (
            <React.Fragment>
              <Button size="small" onClick={() => confirmDelete(id, data)}>
                <Icon type="delete" />
              </Button>
            </React.Fragment>
          );
        }
      },
      width: 30,
    },
    {
      title: '発生日',
      dataIndex: 'accrualDate',
      key: 'accrualDate',
      width: 100,
      editable: true,
    },
    {
      title: '金額',
      dataIndex: 'amount',
      key: 'amount',
      render: (v: number, record: IncomeSpendingType) => {
        const amount = v as number;
        return (
          <span>
            {' '}
            {amount.toLocaleString()}円<br />({record.howToPayName}){' '}
          </span>
        );
      },
      width: 100,
      align: columnAmountAlign,
    },
    {
      title: 'カテゴリ',
      dataIndex: 'categoryName',
      key: 'categoryName',
      render: (name: string, record: IncomeSpendingType) => {
        return (
          <span>
            {record.categoryName} > {name}
          </span>
        );
      },
      width: 210,
    },
    {
      title: '口座',
      dataIndex: 'accountName',
      key: 'accountName',
      width: 150,
      editable: true,
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      width: 400,
    },
  ];

  const showMonthSelectionIfCanEdit = () => {
    if (props.isMain) {
      return (
        <React.Fragment>
          <Button
            className={styles.buttonMonth}
            onClick={() => updateMonth(-1)}
          >
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
        </React.Fragment>
      );
    }
  };

  return (
    <div className={styles.list}>
      {showMonthSelectionIfCanEdit()}
      <Table
        pagination={{ pageSize: props.offset }}
        rowKey={'id'}
        columns={columns}
        dataSource={list}
        scroll={{ x: 1200 }}
      />
      <IncomeSpendingEditModal
        isShowModal={isShowModal}
        data={selectedData}
        onCloseAfterUpdated={() => {
          const _month = moment(month);
          updateList(_month);
          setCurrentMonth(_month);
          setIsShowModal(false);
        }}
        masterData={appState.value.master}
        dependency={props.dependency}
      />
    </div>
  );
};

export default IncomeSpendingList;
