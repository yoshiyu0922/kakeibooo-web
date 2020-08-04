import AccountRepository from '../repository/accountRepository';

class Account {
  private accountRepository: AccountRepository;

  constructor({ accountRepository }: { accountRepository: AccountRepository }) {
    this.accountRepository = accountRepository;
  }

  public async fetchAll() {
    return await this.accountRepository.fetchAll();
  }
}

export default Account;
