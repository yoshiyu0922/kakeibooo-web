import React, { useEffect, useState } from 'react';
import styles from './Summary.module.css';
import { AssetType, initAssets } from '../../../types/Asset';
import Repository from '../../../core/Repository';
import { AxiosResponse } from 'axios';

const Summary: React.FC = () => {
  const [assetList, setAssetList] = useState(initAssets);

  useEffect(() => {
    const repository = Repository.instance;
    repository.fetchAssets((res: AxiosResponse) => {
      const assets = res.data as AssetType[];
      setAssetList(assets);
    });
  }, []);

  return (
    <div>
      {assetList.map((a, key) => {
        return (
          <div key={key}>
            <h2 className={`${styles.summaryTitle}`}>{a.name}</h2>
            {a.accounts.map((ac, acKey) => {
              return (
                <div key={acKey}>
                  <h4>{ac.name}</h4>
                  <h4 className={`${styles.summaryCurrency}`}>
                    {ac.balance.toLocaleString()}円
                  </h4>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Summary;
