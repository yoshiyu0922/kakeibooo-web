import axios, {AxiosResponse} from 'axios';
import {RegisterIncomeSpendingParams, UpdateIncomeSpendingParams} from "../types/IncomeSpending";
import {MasterType} from "../types/Master";
import {UpdateBudgetParams} from "../types/Budget";


class Repository {
  private token: string;
  private static _instance: Repository;

  private constructor() {
    const _token = localStorage.getItem('token');
    if (_token !== null) {
      this.token = _token
    } else {
      this.token = ''
    }
  }

  public static get instance(): Repository {
    if (!this._instance) {
      this._instance = new Repository();
    }
    return this._instance;
  }

  public fetchAssets(callback: (res: AxiosResponse) => void) {
    axios
      .get(`http://localhost:9000/assets`, {headers: {Authorization: `Bearer ${this.token}`}})
      .then(callback)
  }

  public fetchIncomeSpendMonthly(yyyyMM: number, callback: (res: AxiosResponse) => void) {
    axios
      .get(`http://localhost:9000/incomeSpending/monthly?yyyyMM=${yyyyMM}&limit=300`, {headers: {Authorization: `Bearer ${this.token}`}})
      .then(callback)
  }

  public deleteIncomeSpend(
    id: number,
    callback: (res: AxiosResponse) => void,
    errorHandler: () => void
  ) {
    axios
      .post(`http://localhost:9000/incomeSpending/delete/${id}`, {}, {headers: {Authorization: `Bearer ${this.token}`}})
      .then(callback)
      .catch(errorHandler)
  }

  public fetchAccounts(callback: (res: AxiosResponse) => void) {
    axios
      .get(`http://localhost:9000/accounts`, {headers: {Authorization: `Bearer ${this.token}`}})
      .then(callback)
  }

  public fetchBudgets(yyyyMM: number, callback: (res: AxiosResponse) => void) {
    axios
      .get(`http://localhost:9000/budget/list?yyyyMM=${yyyyMM}`, {headers: {Authorization: `Bearer ${this.token}`}})
      .then(callback)
  }

  public registerIncomeSpending(
    inputParams: RegisterIncomeSpendingParams,
    callback: (res: AxiosResponse) => void,
    errorHandler: () => void,
    final: () => void = () => {
    }
  ) {
    axios
      .post('http://localhost:9000/incomeSpending/register', inputParams, {headers: {Authorization: `Bearer ${this.token}`}})
      .then(callback)
      .catch(errorHandler)
      .finally(final)
  }

  public updateIncomeSpend(
    inputParams: UpdateIncomeSpendingParams,
    callback: (res: AxiosResponse) => void,
    errorHandler: () => void,
    final: () => void = () => {
    }
  ) {
    axios
      .put('http://localhost:9000/incomeSpending/update', inputParams, {headers: {Authorization: `Bearer ${this.token}`}})
      .then(callback)
      .catch(errorHandler)
      .finally(final)
  }

  public updateOrRegisterBudget(
    inputParams: UpdateBudgetParams,
    callback: (res: AxiosResponse) => void,
    errorHandler: () => void,
    final: () => void = () => {
    }
  ) {
    axios
      .post('http://localhost:9000/budget/registerOrUpdate', inputParams, {headers: {Authorization: `Bearer ${this.token}`}})
      .then(callback)
      .catch(errorHandler)
      .finally(final)
  }

  public static asyncFetchMaster(
    callback: (res: AxiosResponse) => MasterType,
    errorHandler: (err: any) => MasterType,
    final: () => void = () => {
    }
  ) {
    return axios
      .get('http://localhost:9000/master/all')
      .then(callback)
      .catch(errorHandler)
      .finally(final)
  };
}


export default Repository;