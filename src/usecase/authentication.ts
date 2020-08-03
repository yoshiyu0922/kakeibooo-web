import UserRepository from '../repository/userRepository';

type Token = {
  auth: {
    token: string;
  };
};

class Authentication {
  private userRepository: UserRepository;

  constructor({ userRepository }: { userRepository: UserRepository }) {
    this.userRepository = userRepository;
  }

  public async authenticate(userId: string, password: string) {
    return await this.userRepository.auth(userId, password)
      .then(res => {
        return Authentication.isToken(res.data) ? res.data as Token : {} as Token;
      })
      .catch(() => {
        return {} as Token;
      });
  }

  private static isToken(token: any): token is Token {
    return typeof token.token != undefined
  };
}

export default Authentication;
