import React, {useEffect, useState} from 'react';
import {DatePicker, Form, Input, Modal, Row, Select, Spin} from "antd";
import {
  IncomeSpendingType,
  initializeUpdateParams,
  initUpdateInputValue,
  UpdateIncomeSpendingParams
} from "../../../types/IncomeSpending";
import styles from "../../Root.module.css";
import {AccountType, initAccount} from "../../../types/Account";
import {CategoryType, initMaster, MasterType} from "../../../types/Master";
import Repository from "../../../core/Repository";
import {AxiosResponse} from "axios";
import moment from 'moment';
import {useSelector} from "react-redux";
import {masterSelector} from "../../../redux/AppStore";

const Option = Select.Option;

type Props = {
  isShowModal: boolean
  data: IncomeSpendingType
  onCloseAfterUpdated: () => void,
  masterData: MasterType
}
const EditModal: React.FC<Props> = props => {
  const [loadingState, setLoadingState] = useState(false);
  const masterState = useSelector(masterSelector);
  const [accounts, setAccounts] = useState(new Array(initAccount));
  const [parentCategories, setParentCategories] = useState(props.masterData.parentCategories);
  const [parentCategoryId, setParentCategoryId] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [categories, setCategories] = useState(initMaster.categories);
  const [inputParams, setInputParams] = useState<UpdateIncomeSpendingParams>(initUpdateInputValue);

  const updateCategories = (id: number, isOnChange: boolean) => {
    const list: CategoryType[] = props.masterData.categories.filter(
      (category: CategoryType) => {
        return category.parentCategoryId === id;
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
        dom.style.display = 'none'
      } else {
        dom.style.display = ''
      }
    }
  };

  useEffect(() => {
    // 親ComponentのStateが更新された場合、このComponentのStateを更新させる
    const params = initializeUpdateParams(props.data);
    setInputParams(params);
    setParentCategoryId(props.data.parentCategoryId);
    setCategoryId(props.data.categoryId)
  }, [props.data]);

  useEffect(() => {
    updateCategories(parentCategoryId, false);
    showHowToPayIfSpending();
  }, [inputParams]);

  useEffect(() => {
    if (!masterState.isFetching)
      Repository.instance.fetchAccounts((res: AxiosResponse) => {
        const accounts = res.data as AccountType[];
        setAccounts(accounts)
      });
  }, []);

  useEffect(() => {
    setParentCategories(masterState.value.parentCategories);
  }, [props.masterData]);

  const submit = () => {
    setLoadingState(true);
    const repository = Repository.instance;
    const data = {
      ...inputParams,
      accrualDate: moment(inputParams.accrualDate).format("YYYY-MM-DD")
    };
    repository.updateIncomeSpend(
      data,
      (_: AxiosResponse) => {
        Modal.info({title: '更新成功', content: '更新に成功しました'});
        props.onCloseAfterUpdated();
      },
      () => {
        Modal.error({title: '更新失敗', content: '更新に失敗しました'});
      },
      () => {
        setLoadingState(false);
      }
    );
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
              style={{width: '50%'}}
              value={moment(inputParams.accrualDate)}
              format={"YYYY-MM-DD"}
              onChange={(_, dateString) => {
                setInputParams({
                  ...inputParams,
                  accrualDate: dateString
                });
              }}
            />
          </Row>
          <Row style={{marginTop: 3}}>
            <Form.Item>
              <Select
                className={styles.selectBox}
                placeholder="大分類"
                onChange={id => updateCategories(id, true)}
                value={parentCategoryId}
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
                value={categoryId}
                onChange={(data, t) => {
                  setCategoryId(data);
                  setInputParams({
                    ...inputParams,
                    categoryId: data
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
          <Row style={{marginTop: 3}}>
            <Form.Item>
              <Input
                value={inputParams.amount}
                placeholder="金額"
                addonAfter="円"
                onChange={(e) => {
                  const amount = parseInt(e.target.value);
                  const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
                  if (reg.test(e.target.value)) {
                    setInputParams({
                      ...inputParams,
                      amount: amount
                    });
                  }
                }}
              />
            </Form.Item>
            <Form.Item>
              <Select
                id={"HowToPay"}
                className={`${styles.selectAccountId} ${styles.selectBox}`}
                placeholder="支払い方法"
                value={inputParams.howToPayId}
                onChange={(data, _) => {
                  const howToPayId = data as number;
                  setInputParams({
                    ...inputParams,
                    howToPayId: howToPayId
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
                    accountId: accountId
                  });
                }}
              >
                {accounts.map((h, key) => {
                  return (
                    <Option value={h.accountId} key={key}>
                      {h.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Row>
          <Row style={{marginTop: 3}}>
            <Input
              placeholder="内容"
              value={inputParams.content}
              onChange={(e) => {
                const content = e.target.value;
                setInputParams({
                  ...inputParams,
                  content: content
                });
              }}
            />
          </Row>
        </Form>
      </Spin>
    </Modal>
  )
};


export default EditModal;

