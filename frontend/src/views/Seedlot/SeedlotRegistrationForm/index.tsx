import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FlexGrid,
  Row,
  Breadcrumb,
  BreadcrumbItem,
  ProgressIndicator,
  ProgressStep
} from '@carbon/react';

import PageTitle from '../../../components/PageTitle';

import './styles.scss';

const SeedlotRegistrationForm = () => {
  const navigate = useNavigate();
  const seedlotNumber = useParams().seedlot;

  const [formStep, setFormStep] = useState<number>(0);

  return (
    <FlexGrid className="seedlot-registration-page">
      <div className="seedlot-registration-title-section">
        <Row className="seedlot-registration-breadcrumb">
          <Breadcrumb>
            <BreadcrumbItem onClick={() => navigate('/seedlot')}>Seedlots</BreadcrumbItem>
            <BreadcrumbItem onClick={() => navigate('/seedlot/my-seedlots')}>My seedlots</BreadcrumbItem>
            <BreadcrumbItem onClick={() => navigate(`/seedlot/details/${seedlotNumber}`)}>{`Seedlot ${seedlotNumber}`}</BreadcrumbItem>
          </Breadcrumb>
        </Row>
        <Row>
          <PageTitle
            title="Seedlot Registration"
            subtitle={`Seedlot ${seedlotNumber}`}
          />
        </Row>
        <Row className="seedlot-registration-progress">
          <ProgressIndicator
            spaceEqually
            className="seedlot-registration-steps"
            currentIndex={formStep}
            onChange={(e: number) => {
              setFormStep(e);
            }}
          >
            <ProgressStep
              label="Collection"
              secondaryLabel="Step 1"
            />
            <ProgressStep
              label="Ownership"
              secondaryLabel="Step 2"
            />
            <ProgressStep
              label="Interim storage"
              secondaryLabel="Step 3"
            />
            <ProgressStep
              label="Orchard"
              secondaryLabel="Step 4"
            />
            <ProgressStep
              label="Parent tree and SMP"
              secondaryLabel="Step 5"
            />
            <ProgressStep
              label="Extraction and storage"
              secondaryLabel="Step 6"
            />
          </ProgressIndicator>
        </Row>
        <Row className="seedlot-registration-forms">
          <div className={formStep === 0 ? 'seedlot-current-form' : 'seedlot-form-not-selected'}>
            <p>Collection placeholder</p>
          </div>
          <div className={formStep === 1 ? 'seedlot-current-form' : 'seedlot-form-not-selected'}>
            <p>Ownership placeholder</p>
          </div>
          <div className={formStep === 2 ? 'seedlot-current-form' : 'seedlot-form-not-selected'}>
            <p>Interim storage placeholder</p>
          </div>
          <div className={formStep === 3 ? 'seedlot-current-form' : 'seedlot-form-not-selected'}>
            <p>Orchard placeholder</p>
          </div>
          <div className={formStep === 4 ? 'seedlot-current-form' : 'seedlot-form-not-selected'}>
            <p>Parent tree and SMP placeholder</p>
          </div>
          <div className={formStep === 5 ? 'seedlot-current-form' : 'seedlot-form-not-selected'}>
            <p>Extraction and storage placeholder</p>
          </div>
        </Row>
      </div>
    </FlexGrid>
  );
};

export default SeedlotRegistrationForm;
