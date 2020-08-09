import AssetRepository from '../repository/assetRepository';

class Asset {
  private assetRepository: AssetRepository;

  constructor({ assetRepository }: { assetRepository: AssetRepository }) {
    this.assetRepository = assetRepository;
  }

  public async fetchAll(userId: number) {
    return await this.assetRepository.fetchAll(userId);
  }
}

export default Asset;
