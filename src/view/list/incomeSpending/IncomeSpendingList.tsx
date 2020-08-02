import React, { useEffect, useState } from 'react';
import { Button, Icon, Modal, Table } from 'antd';
import { AxiosResponse } from 'axios';
import styles from '../../Root.module.css';
import {
  IncomeSpendingType,
  initIncomeSpending,
} from '../../../types/IncomeSpending';
import Repository from '../../../core/Repository';
import moment, { Moment } from 'moment';
import EditModal from './EditModal';
import { useSelector } from 'react-redux';
import { masterSelector } from '../../../redux/AppStore';

const { confirm } = Modal;

type Props = {
  offset: number;
  isMain: boolean;
};

const IncomeSpendingList: React.FC<Props> = props => {
  const [list, setList] = useState(initIncomeSpending);
  const masterState = useSelector(masterSelector);
  const now = moment(Date.now());
  const [currentMonth, setCurrentMonth] = useState(now);
  const [month, setMonth] = useState(new Date());
  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState({} as IncomeSpendingType);

  const updateList = (_month: Moment) => {
    const repository = Repository.instance;
    const paramMonth = parseInt(_month.format('YYYYMM'));
    repository.fetchIncomeSpendMonthly(paramMonth, (res: AxiosResponse) => {
      const data = res.data.incomeSpendResponses as IncomeSpendingType[];
      const list = data.map((v, _) => {
        v.amount = v.isIncome ? v.amount : -1 * v.amount;
        return v;
      });
      setList(list);
    });
  };

  useEffect(() => {
    if (!masterState.isFetching) updateList(moment(Date.now()));
  }, [masterState]);

  const confirmDelete = (id: number, data: IncomeSpendingType) => {
    confirm({
      title: '削除しても良いですか？',
      content: (
        <div>
          <ul>
            <li>発生日: {data.accrualDate}</li>
            <li>金額: {data.amount.toLocaleString()}円</li>
            <li>カテゴリ: {data.categoryName}</li>
            <li>内容: {data.content}</li>
          </ul>
        </div>
      ),
      onOk() {
        const repository = Repository.instance;
        repository.deleteIncomeSpend(
          id,
          (_: AxiosResponse) => {
            Modal.info({ title: '削除成功', content: '削除に成功しました' });
            const updated = list.filter(
              (i: IncomeSpendingType) => i.incomeSpendingId !== id
            );
            setList(updated);
          },
          () => {
            Modal.error({ title: '削除失敗', content: '削除に失敗しました' });
          }
        );
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
      dataIndex: 'incomeSpendingId',
      key: 'incomeSpendingId',
      render: (id: number, data: IncomeSpendingType) => {
        if (props.isMain) {
          return (
            <React.Fragment>
              <Button size="small" onClick={() => showModal(id, data)}>
                <Icon type="edit" />
              </Button>
            </React.Fragment>
          );
        } else {
          return (
            <Button size="small" onClick={() => confirmDelete(id, data)}>
              <Icon type="delete" />
            </Button>
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
            {record.parentCategoryName} > {name}
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
        rowKey={'incomeSpendingId'}
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
          setCurrentMonth(_month);
          setIsShowModal(false);
        }}
        masterData={masterState.value}
      />
    </div>
  );
};

export default IncomeSpendingList;
