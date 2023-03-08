import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Row,
  Breadcrumb,
  BreadcrumbItem,
  FlexGrid,
  Button
} from '@carbon/react';
import './styles.scss';
import SeedlotDataTable from './SeedlotDataTable';

import './styles.scss';
import PageTitle from '../../../components/PageTitle';


const ExistingSeedlots = () => {
  const navigate = useNavigate();

  return (
  <FlexGrid className="existing-seedlot-page">
    <Row className="existing-seedlot-breadcrumb">
      <Breadcrumb>
        <BreadcrumbItem onClick={() => navigate('/seedlot')} >Seedlots</BreadcrumbItem>
      </Breadcrumb>
    </Row>
    <Row className="existing-seedlot-title">
      <PageTitle 
        title='My Seedlots' 
        subtitle='Check and manage existing seedlots'
        favourite
      />
        <Button
          kind="primary"
          onClick={() => { console.log('teste') }}
          size="md"
          className="btn-existing-seedlot"
        >
          Register a new seedlot
        </Button>
    </Row>
    <Row className="existing-seedlot-data-table">
      <SeedlotDataTable />
    </Row>
  </FlexGrid>      
  );
};

export default ExistingSeedlots;
