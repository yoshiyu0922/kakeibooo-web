import AccountRepository from '../repository/account/accountRepository';

class Account {
  private accountRepository: AccountRepository;

  constructor({ accountRepository }: { accountRepository: AccountRepository }) {
    this.accountRepository = accountRepository;
  }

  public async fetchAll(userId: number) {
    return await this.accountRepository.fetchAll(userId);
  }
}

export default Account;
