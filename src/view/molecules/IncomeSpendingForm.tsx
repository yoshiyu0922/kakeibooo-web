import React, { useEffect, useState } from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Spin,
} from 'antd';
import styles from '../Root.module.css';
import { CategoryDetailType, CategoryType } from '../../types/master';
import { initAccount } from '../../types/account';
import {
  initRegisterInputValue,
  RegisterIncomeSpendingParams,
} from '../../types/incomeSpending';
import { useSelector } from 'react-redux';
import { appStateSelector } from '../../redux/appStore';
import { DependencyProps } from '../../core/dependency';
import { AppStateType } from '../../redux/appState';

const Option = Select.Option;

interface OwnProps {
  kbn: number;
}

type Props = OwnProps & DependencyProps;

const IncomeSpendingForm: React.FC<Props> = (props: Props) => {
  const initAccounts = new Array(initAccount);
  const appState = useSelector(appStateSelector);
  const [parentCategories, setParentCategories] = useState(
    appState.value.master.categories
  );
  const [categories, setCategories] = useState(
    appState.value.master.categoryDetails
  );
  const [howToPays, setHowToPays] = useState(appState.value.master.howToPays);
  const [masterData, setMasterData] = useState(appState.value.master);
  const [accounts, setAccounts] = useState(initAccounts);
  const [loadingState, setLoadingState] = useState(false);
  const [inputParams, setInputParams] = useState<RegisterIncomeSpendingParams>(
    initRegisterInputValue
  );
  const INCOME_KBN = 1;
  const SPEND_KBN = 2;

  const updateCategories = (id: number) => {
    const list: CategoryDetailType[] = masterData.categoryDetails.filter(
      (category: CategoryDetailType) => {
        return category.categoryId === id;
      }
    );
    setCategories(list);
  };

  const updateMaster = (m: AppStateType) => {
    const dispParentCategory = m.master.categories.filter((p: CategoryType) => {
      return p.isIncome === (props.kbn !== 1);
    });
    setParentCategories(dispParentCategory);
    setHowToPays(m.master.howToPays);
    setMasterData(m.master);
  };

  const submit = () => {
    setLoadingState(true);

    props.dependency.incomeSpending
      .create({
        userId: appState.value.user.id,
        accountId: inputParams.accountId,
        categoryDetailId: inputParams.categoryDetailId,
        accrualDate: inputParams.accrualDate,
        amount: inputParams.amount,
        howToPayId: inputParams.howToPayId,
        isIncome: inputParams.isIncome,
        content: inputParams.content,
      })
      .then((_: any) => {
        Modal.info({
          title: '登録成功',
          content: '登録に成功しました',
          onOk: () => {
            window.location.href = '/top';
          },
        });
      })
      .catch(() => {
        Modal.error({ title: '登録失敗', content: '登録に失敗しました' });
      })
      .finally(() => {
        setLoadingState(false);
      });
  };

  useEffect(() => {
    setInputParams({
      ...inputParams,
      isIncome: props.kbn === SPEND_KBN,
    });
  }, []);

  useEffect(() => {
    updateMaster(appState.value);

    if (appState.value.user.id) {
      props.dependency.account
        .fetchAll(appState.value.user.id)
        .then(accounts => {
          setAccounts(accounts);
        });
    }
  }, [appState]);

  const showHowToPayIfSpend = () => {
    if (props.kbn === INCOME_KBN) {
      return (
        <Form.Item>
          <Select
            className={`${styles.selectAccountId} ${styles.selectBox}`}
            placeholder="支払い方法"
            onChange={(data, _) => {
              const howToPayId = data as number;
              setInputParams({
                ...inputParams,
                howToPayId: howToPayId,
              });
            }}
          >
            {howToPays.map((h, key) => {
              return (
                <Option value={h.id} key={key}>
                  {h.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      );
    }
  };

  return (
    <Spin spinning={loadingState}>
      <Form layout="inline" className={styles.inputForm}>
        <Row>
          <DatePicker
            placeholder="日付"
            style={{ width: '50%' }}
            onChange={(date, dateString) => {
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
              onChange={updateCategories}
            >
              {parentCategories.map((c, key) => {
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
              onChange={(data, _) => {
                const id = data as number;
                setInputParams({
                  ...inputParams,
                  categoryDetailId: id,
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
          {showHowToPayIfSpend()}
          <Form.Item>
            <Select
              className={`${styles.selectAccountId} ${styles.selectBox}`}
              placeholder="口座"
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
            onChange={e => {
              const content = e.target.value;
              setInputParams({
                ...inputParams,
                content: content,
              });
            }}
          />
        </Row>
        <Row style={{ marginTop: 4, textAlign: 'center' }}>
          <Button type="primary" onClick={submit}>
            保存する
          </Button>
        </Row>
      </Form>
    </Spin>
  );
};

export default IncomeSpendingForm;
