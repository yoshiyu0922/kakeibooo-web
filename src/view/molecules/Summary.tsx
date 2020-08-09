import React, { useEffect, useState } from 'react';
import { initAssets } from '../../types/asset';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { appStateSelector } from '../../redux/appStore';
import { DependencyProps } from '../../core/dependency';

const Title = styled.h2`
  margin-top: 10px;
`;

const Currency = styled.h4`
  text-align: right;
`;

type Props = DependencyProps;

const Summary: React.FC<Props> = (props: Props) => {
  const appState = useSelector(appStateSelector);
  const [assetList, setAssetList] = useState(initAssets);

  useEffect(() => {
    if (appState.value.user.id !== undefined) {
      props.dependency.asset.fetchAll(appState.value.user.id).then(assets => {
        setAssetList(assets);
      });
    }
  }, [appState]);

  return (
    <div>
      {assetList.map((a, key) => {
        return (
          <div key={key}>
            <Title>{a.name}</Title>
            {a.accounts.map((ac, acKey) => {
              return (
                <div key={acKey}>
                  <h4>{ac.name}</h4>
                  <Currency>{ac.balance.toLocaleString()}円</Currency>
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
