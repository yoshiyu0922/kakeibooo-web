import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Row, Select, Spin } from 'antd';
import styles from '../Root.module.css';
import Repository from '../../core/Repository';
import { useSelector } from 'react-redux';
import { masterSelector } from '../../redux/AppStore';
import {
  Budget,
  initializeUpdateParams,
  UpdateBudgetParams,
} from '../../types/Budget';
import { AxiosResponse } from 'axios';

const Option = Select.Option;

type Props = {
  isShowModal: boolean;
  data: Budget;
  onCloseAfterUpdated: () => void;
};
const EditModal: React.FC<Props> = props => {
  const initHowToPay: number = 1;
  const [loadingState, setLoadingState] = useState(false);
  const masterState = useSelector(masterSelector);
  const [inputParams, setInputParams] = useState<UpdateBudgetParams>(
    {} as UpdateBudgetParams
  );

  useEffect(() => {
    const params = initializeUpdateParams(props.data, initHowToPay);
    setInputParams(params);
  }, [props.data]);

  const submit = () => {
    setLoadingState(true);
    const repository = Repository.instance;
    console.log(inputParams);
    repository.updateOrRegisterBudget(
      inputParams,
      (_: AxiosResponse) => {
        Modal.info({ title: '更新成功', content: '更新に成功しました' });
        setInputParams({} as UpdateBudgetParams);
        props.onCloseAfterUpdated();
      },
      () => {
        Modal.error({ title: '更新失敗', content: '更新に失敗しました' });
      },
      () => {
        setLoadingState(false);
      }
    );
  };

  const showCategoryName = () => {
    const target = masterState.value.categories.find(v => {
      return v.id === props.data.categoryId;
    });

    return target ? target.name : '';
  };

  return (
    <Modal
      title="予算 編集"
      visible={props.isShowModal}
      onOk={() => {
        submit();
      }}
      onCancel={() => {
        setInputParams({} as UpdateBudgetParams);
        props.onCloseAfterUpdated();
      }}
    >
      <Spin spinning={loadingState}>
        <Form layout="inline" className={styles.inputForm}>
          <Row style={{ marginTop: 3 }}>
            <Form.Item>{showCategoryName()}</Form.Item>
          </Row>
          <Row style={{ marginTop: 3 }}>
            <Form.Item>
              <Input
                value={inputParams.amount === 0 ? '' : inputParams.amount}
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
                placeholder="現金 / カード"
                value={inputParams.howToPayId}
                onChange={(data, _) => {
                  const howToPayId = data as number;
                  const params = initializeUpdateParams(props.data, howToPayId);
                  setInputParams(params);
                }}
              >
                {masterState.value.howToPays.map((h, key) => {
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

export default EditModal;
