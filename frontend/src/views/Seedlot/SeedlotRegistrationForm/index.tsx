import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FlexGrid,
  Row,
  Breadcrumb,
  BreadcrumbItem
} from '@carbon/react';

import PageTitle from '../../../components/PageTitle';
import SeedlotRegistrationProgress from '../../../components/SeedlotRegistrationProgress';
import OrchardStep from '../../../components/SeedlotRegistrationSteps/OrchardStep';
import InterimStorage from '../../../components/SeedlotRegistrationProgress/InterimStorage';
import OwnershipStep from '../../../components/SeedlotRegistrationSteps/OwnershipStep';
import { AllStepData } from './definitions';
import {
  initInterimState,
  initOwnershipState
} from './utils';
import { SingleOwnerForm } from '../../../components/SeedlotRegistrationSteps/OwnershipStep/definitions';
import './styles.scss';

const defaultCode = '16';
const defaultAgency = '0032 - Strong Seeds Orchard - SSO';
const defaultPayment = 'ITC - Invoice to client address';

const SeedlotRegistrationForm = () => {
  const navigate = useNavigate();
  const seedlotNumber = useParams().seedlot;

  const [formStep, setFormStep] = useState<number>(0);

  const setStep = (delta: number) => {
    const newStep = formStep + delta;
    setFormStep(newStep);
  };

  const [allStepData, setAllStepData] = useState<AllStepData>({
    interimStep: initInterimState(defaultAgency, defaultCode),
    ownershipStep: [initOwnershipState(defaultAgency, defaultCode, defaultPayment)]
  });

  // Can't find a good way to specify the type of stepData
  const setStepData = (stepName: keyof AllStepData, stepData: any) => {
    const newData = { ...allStepData };
    newData[stepName] = stepData;
    setAllStepData(newData);
  };

  const renderStep = () => {
    switch (formStep) {
      case 0:
        return null;
      case 1:
        return (
          <OwnershipStep
            state={allStepData.ownershipStep}
            setStep={(delta: number) => setStep(delta)}
            setStepData={(data: Array<SingleOwnerForm>) => setStepData('ownershipStep', data)}
          />
        );
      case 2:
        return (
          <InterimStorage setStep={(delta: number) => setStep(delta)} />
        );
      case 3:
        return (
          <OrchardStep setStep={(delta: number) => setStep(delta)} />
        );
      case 4:
        return null;
      case 5:
        return null;
      default:
        return null;
    }
  };

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
          <SeedlotRegistrationProgress
            currentIndex={formStep}
            className="seedlot-registration-steps"
            interactFunction={(e: number) => {
              setFormStep(e);
            }}
          />
        </Row>
        <Row className="seedlot-registration-forms">
          <div className="seedlot-current-form">
            {renderStep()}
          </div>
        </Row>
      </div>
    </FlexGrid>
  );
};

export default SeedlotRegistrationForm;
