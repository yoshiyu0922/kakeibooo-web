import AssetRepository from '../repository/asset/assetRepository';

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
