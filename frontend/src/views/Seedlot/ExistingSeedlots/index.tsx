import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Row,
} from '@carbon/react';
import './styles.scss';
import SeedlotDataTable from './SeedlotDataTable';

import ExistingSeedlotItems from '../../../mock-api/fixtures/ExistingSeedlotItems';

import './styles.scss';
import SeedlotTable from '../../../components/SeedlotTable';
import PageTitle from '../../../components/PageTitle';


const ExistingSeedlots = () => {

  return (
    <Row>
    <PageTitle 
      title='My Seedlots' 
      subtitle='Check and manage existing seedlots'
      favourite
    />
      <SeedlotDataTable />
    </Row>

  );
};

export default ExistingSeedlots;
