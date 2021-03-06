import React, { useEffect, useState } from 'react';
import { DatePicker, Form, Input, Modal, Row, Select, Spin } from 'antd';
import {
  IncomeSpendingType,
  initializeUpdateParams,
  initUpdateInputValue,
  UpdateIncomeSpendingParams,
} from '../../../types/incomeSpending';
import styles from '../../Root.module.css';
import { initAccount } from '../../../types/account';
import {
  CategoryDetailType,
  initMaster,
  MasterType,
} from '../../../types/master';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { appStateSelector } from '../../../redux/appStore';
import { DependencyProps } from '../../../core/dependency';

const Option = Select.Option;

type Props = {
  isShowModal: boolean;
  data: IncomeSpendingType;
  onCloseAfterUpdated: () => void;
  masterData: MasterType;
} & DependencyProps;

const IncomeSpendingEditModal: React.FC<Props> = props => {
  const [loadingState, setLoadingState] = useState(false);
  const appState = useSelector(appStateSelector);
  const [accounts, setAccounts] = useState(new Array(initAccount));
  const [parentCategoryId, setParentCategoryId] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [categories, setCategories] = useState(initMaster.categoryDetails);
  const [inputParams, setInputParams] = useState<UpdateIncomeSpendingParams>(
    initUpdateInputValue
  );

  const updateCategories = (id: number, isOnChange: boolean) => {
    const list: CategoryDetailType[] = props.masterData.categoryDetails.filter(
      (category: CategoryDetailType) => {
        return category.categoryId === id;
      }
    );
    setParentCategoryId(id);
    if (isOnChange) setCategoryId(0);
    setCategories(list);
  };

  const showHowToPayIfSpending = () => {
    const dom = document.querySelector<HTMLElement>('div[id="HowToPay"]');
    if (dom != null) {
      if (inputParams.isIncome) {
        dom.style.display = 'none';
      } else {
        dom.style.display = '';
      }
    }
  };

  useEffect(() => {
    // 親ComponentのStateが更新された場合、このComponentのStateを更新させる
    const params = initializeUpdateParams(props.data);
    setInputParams(params);
    setParentCategoryId(props.data.categoryId);
    setCategoryId(props.data.categoryDetailId);
  }, [props.data]);

  useEffect(() => {
    updateCategories(parentCategoryId, false);
    showHowToPayIfSpending();
  }, [inputParams]);

  useEffect(() => {
    if (!appState.isFetching)
      props.dependency.account
        .fetchAll(appState.value.user.id)
        .then(accounts => {
          setAccounts(accounts);
        });
  }, []);

  const submit = () => {
    setLoadingState(true);
    const input = {
      id: inputParams.id,
      userId: appState.value.user.id,
      accountId: inputParams.accountId,
      categoryDetailId: inputParams.categoryDetailId,
      accrualDate: moment(inputParams.accrualDate).format('YYYY-MM-DD'),
      amount: inputParams.amount,
      howToPayId: inputParams.howToPayId,
      isIncome: inputParams.isIncome,
      content: inputParams.content,
    };
    props.dependency.incomeSpending
      .update(input)
      .then((_: number) => {
        Modal.info({
          title: '更新成功',
          content: '更新に成功しました',
          onOk() {
            props.onCloseAfterUpdated();
          },
        });
      })
      .catch(() => {
        Modal.error({ title: '更新失敗', content: '更新に失敗しました' });
      })
      .finally(() => {
        setLoadingState(false);
      });
  };

  return (
    <Modal
      title="家計簿 編集"
      visible={props.isShowModal}
      onOk={() => {
        submit();
      }}
      onCancel={() => props.onCloseAfterUpdated()}
    >
      <Spin spinning={loadingState}>
        <Form layout="inline" className={styles.inputForm}>
          <Row>
            <DatePicker
              placeholder="日付"
              style={{ width: '50%' }}
              value={moment(inputParams.accrualDate)}
              format={'YYYY-MM-DD'}
              onChange={(_, dateString) => {
                setInputParams({
                  ...inputParams,
                  accrualDate: dateString,
                });
              }}
            />
          </Row>
          <Row style={{ marginTop: 3 }}>
            <Form.Item>
              <Select
                className={styles.selectBox}
                placeholder="大分類"
                onChange={id => updateCategories(id, true)}
                value={parentCategoryId}
              >
                {props.masterData.categories.map((c, key) => {
                  return (
                    <Option value={c.id} key={key}>
                      {c.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item>
              <Select
                className={styles.selectBox}
                allowClear={true}
                placeholder="小分類"
                value={categoryId}
                onChange={(data, t) => {
                  setCategoryId(data);
                  setInputParams({
                    ...inputParams,
                    categoryDetailId: data,
                  });
                }}
              >
                {categories.map((c, key) => {
                  return (
                    <Option value={c.id} key={key}>
                      {c.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Row>
          <Row style={{ marginTop: 3 }}>
            <Form.Item>
              <Input
                value={inputParams.amount}
                placeholder="金額"
                addonAfter="円"
                onChange={e => {
                  const amount = parseInt(e.target.value);
                  const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
                  if (reg.test(e.target.value)) {
                    setInputParams({
                      ...inputParams,
                      amount: amount,
                    });
                  }
                }}
              />
            </Form.Item>
            <Form.Item>
              <Select
                id={'HowToPay'}
                className={`${styles.selectAccountId} ${styles.selectBox}`}
                placeholder="支払い方法"
                value={inputParams.howToPayId}
                onChange={(data, _) => {
                  const howToPayId = data as number;
                  setInputParams({
                    ...inputParams,
                    howToPayId: howToPayId,
                  });
                }}
              >
                {props.masterData.howToPays.map((h, key) => {
                  return (
                    <Option value={h.id} key={key}>
                      {h.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item>
              <Select
                className={`${styles.selectAccountId} ${styles.selectBox}`}
                placeholder="口座"
                value={inputParams.accountId}
                onChange={(data, _) => {
                  const accountId = data as number;
                  setInputParams({
                    ...inputParams,
                    accountId: accountId,
                  });
                }}
              >
                {accounts.map((h, key) => {
                  return (
                    <Option value={h.id} key={key}>
                      {h.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Row>
          <Row style={{ marginTop: 3 }}>
            <Input
              placeholder="内容"
              value={inputParams.content}
              onChange={e => {
                const content = e.target.value;
                setInputParams({
                  ...inputParams,
                  content: content,
                });
              }}
            />
          </Row>
        </Form>
      </Spin>
    </Modal>
  );
};

export default IncomeSpendingEditModal;
