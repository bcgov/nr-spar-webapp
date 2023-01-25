import React from 'react';

import { Row, Column } from '@carbon/react';

import SeedlotTable from '../SeedlotTable';
import EmptySection from '../EmptySection';

import ExistingSeedlotItems from '../../mock-data/ExistingSeedlotItems';

import './styles.scss';

const ExistingSeedlot = () => {
  const listItems = ExistingSeedlotItems;

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
    <Row className="main-content existing-seedlot">
      <Column sm={4} className="existing-seedlot-title">
        <h4>Existing seedlot</h4>
        <h4 className="existing-seedlot-subtitle">Check a summary of your recent seedlots</h4>
      </Column>
      <Column sm={4} className="existing-seedlot-table">
        <SeedlotTable
          elements={listItems}
          headers={tableHeaders}
        />
        {(listItems.length === 0) && (
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
