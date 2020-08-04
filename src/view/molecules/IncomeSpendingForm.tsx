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
import { AxiosResponse } from 'axios';
import {
  CategoryDetailType,
  MasterType,
  CategoryType,
} from '../../types/Master';
import { initAccount } from '../../types/Account';
import {
  initRegisterInputValue,
  RegisterIncomeSpendingParams,
} from '../../types/IncomeSpending';
import { useSelector } from 'react-redux';
import { masterSelector } from '../../redux/AppStore';
import Repository from '../../core/Repository';
import { DependencyProps } from '../../core/dependency';

const Option = Select.Option;

interface OwnProps {
  kbn: number;
}

type Props = OwnProps & DependencyProps;

const IncomeSpendingForm: React.FC<Props> = (props: Props) => {
  const initAccounts = new Array(initAccount);
  const masterState = useSelector(masterSelector);
  const [parentCategories, setParentCategories] = useState(
    masterState.value.categories
  );
  const [categories, setCategories] = useState(
    masterState.value.categoryDetails
  );
  const [howToPays, setHowToPays] = useState(masterState.value.howToPays);
  const [masterData, setMasterData] = useState(masterState.value);
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

  const updateMaster = (m: MasterType) => {
    const dispParentCategory = m.categories.filter((p: CategoryType) => {
      return p.isIncome === (props.kbn !== 1);
    });
    setParentCategories(dispParentCategory);
    setHowToPays(m.howToPays);
    setMasterData(m);
  };

  const submit = () => {
    setLoadingState(true);

    const repository = Repository.instance;
    repository.registerIncomeSpending(
      inputParams,
      (_: AxiosResponse) => {
        Modal.info({
          title: '登録成功',
          content: '登録に成功しました',
          onOk: () => {
            window.location.href = '/top';
          },
        });
      },
      () => {
        Modal.error({ title: '登録失敗', content: '登録に失敗しました' });
      },
      () => {
        setLoadingState(false);
      }
    );
  };

  useEffect(() => {
    props.dependency.account.fetchAll().then(accounts => {
      setAccounts(accounts);
    });

    if (props.kbn === SPEND_KBN) {
      setInputParams({
        ...inputParams,
        isIncome: true,
      });
    }
  }, []);

  useEffect(() => {
    updateMaster(masterState.value);
  }, [masterState]);

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
                  categoryId: id,
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
