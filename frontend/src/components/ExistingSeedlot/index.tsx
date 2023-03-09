import React, { useState } from 'react';

import { Row, Column } from '@carbon/react';

import SeedlotTable from '../SeedlotTable';
import EmptySection from '../EmptySection';
import Subtitle from '../Subtitle';

import ExistingSeedlotItems from '../../mock-api/fixtures/ExistingSeedlotItems';

import './styles.scss';
import axios from 'axios';
import ApiAddresses from '../../utils/ApiAddresses';
import getUrl from '../../utils/ApiUtils';
import { useAuth } from '../../contexts/AuthContext';
import Seedlot from '../../types/Seedlot';

const ExistingSeedlot = () => {
  const { token } = useAuth();

  const [seedlotsData, setSeedlotsData] = useState<Seedlot[]>();

  const getAxiosConfig = () => {
    const axiosConfig = {};
    if (token) {
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      Object.assign(axiosConfig, headers);
    }
    return axiosConfig;
  };

  const getSeedlotsData = () => {
    axios.get(getUrl(ApiAddresses.SeedlotRetrieveAll), getAxiosConfig())
      .then((response) => {
        setSeedlotsData(response.data.seedlotData);
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error(`Error: ${error}`);
      });
  };

  getSeedlotsData();


  const listItems = seedlotsData;

  const tableHeaders: string[] = [
    'Seedlot number',
    'Lot class',
    'Lot species',
    'Form step',
    'Status',
    'Participants',
    'Created at',
    'Last modified',
    'Approved at'
  ];

  return (
    <Row className="existing-seedlot">
      <Column sm={4} className="existing-seedlot-title">
        <h2>Existing seedlot</h2>
        <Subtitle text="Check a summary of your recent seedlots" className="existing-seedlot-subtitle" />
      </Column>
      <Column sm={4} className="existing-seedlot-table">
        {listItems &&
        <SeedlotTable
          elements={listItems}
          headers={tableHeaders}
        />
        }
        {(listItems?.length === 0) && (
        <div className="empty-existing-seedlot">
          <EmptySection
            icon="Application"
            title="There is no seedlot to show yet!"
            description="Your recent seedlots will appear here once you generate one"
          />
        </div>
        )}
      </Column>
    </Row>
  );
};

export default ExistingSeedlot;
