import UserRepository from '../repository/userRepository';

class Authentication {
  private userRepository: UserRepository;

  constructor({ userRepository }: { userRepository: UserRepository }) {
    this.userRepository = userRepository;
  }

  public authenticate(userId: string, password: string) {
    return this.userRepository.auth(userId, password);
  }
}

export default Authentication;
