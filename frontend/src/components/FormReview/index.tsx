import React, { useState } from 'react';

import {
  Accordion,
  AccordionItem,
  Button
} from '@carbon/react';
import { Edit } from '@carbon/icons-react';

import Subtitle from '../Subtitle';
import TitleAccordion from '../TitleAccordion';
import EmptySection from '../EmptySection';

import { AllStepData } from '../../views/Seedlot/SeedlotRegistrationForm/definitions';

import './styles.scss';
import OrchardStep from '../SeedlotRegistrationSteps/OrchardStep';
import InterimStorage from '../SeedlotRegistrationSteps/InterimStep';
import OwnershipStep from '../SeedlotRegistrationSteps/OwnershipStep';

// this is for testing only
// TODO: remove this once the PR is approved
// eslint-disable-next-line
const emptyMockFormData = [];

const mockFormData = [
  {
    id: 0,
    title: 'Collection',
    description: 'Review collection information'
  },
  {
    id: 1,
    title: 'Ownership',
    description: 'Review ownership information'
  },
  {
    id: 2,
    title: 'Interim storage',
    description: 'Review interim storage information'
  },
  {
    id: 3,
    title: 'Orchard',
    description: 'Review orchard information'
  },
  {
    id: 4,
    title: 'Parent tree and SMP',
    description: 'Review parent tree and SPM information'
  },
  {
    id: 5,
    title: 'Extraction and storage',
    description: 'Review extraction and storage information'
  }
];

const defaultCode = '16';
const defaultAgency = '0032 - Strong Seeds Orchard - SSO';
const agencyOptions = [
  '0032 - Strong Seeds Orchard - SSO',
  '0035 - Weak Seeds Orchard - WSO',
  '0038 - Okay Seeds Orchard - OSO',
  '0041 - Great Seeds Orchard - GSO',
  '0043 - Bad Seeds Orchard - BSO'
];

const orchardMock = {
  orchardId: '123',
  orchardName: 'Strong seeds orchard',
  femaleGametic: 'F1 - Visual estimate',
  maleGametic: 'M2',
  controlledCross: true,
  biotechProcess: true,
  noPollenContamination: true,
  additionalId: '4',
  additionalName: 'teste',
  breedingPercentage: '100',
  pollenMethodology: false
};

const interimStorageMock = {
  agencyName: 'Strong Seeds Orchard - SSO',
  locationCode: '32',
  startDate: '2023/01/04',
  endDate: '2023/01/26',
  storageLocation: 'Strong Seeds Seed Orchard Company',
  facilityType: 'VRM'
};

const ownershipMock = {
  id: 0,
  ownerAgency: '0032 - Strong Seeds Orchard - SSO',
  ownerCode: '32',
  ownerPortion: '100',
  reservedPerc: '100',
  surplusPerc: '0',
  fundingSource: 'LFP - Licensee Funded Program',
  methodOfPayment: 'ITC - Invoice to client address',
  applicantAgency: true
};

const FormReview = () => {
  const [allStepData] = useState<AllStepData>({
    interimStep: interimStorageMock,
    ownershipStep: [ownershipMock],
    orchardStep: orchardMock
  });

  return (
    <div className="form-review">
      <div className="form-review-title-section">
        <p className="form-review-title">
          Form review
        </p>
        <Subtitle text="Review data filled in the form (view-only)" />
      </div>
      <div>
        {
        mockFormData.length
          ? (
            <Accordion className="steps-accordion">
              <AccordionItem
                title={(
                  <TitleAccordion
                    title="Collection"
                    description="Review collection information"
                  />
                    )}
              />
              <AccordionItem
                title={(
                  <TitleAccordion
                    title="Ownership"
                    description="Review ownership information"
                  />
                    )}
              >
                <div className="form-item">
                  <OwnershipStep
                    state={allStepData.ownershipStep}
                    defaultAgency={defaultAgency}
                    defaultCode={defaultCode}
                    agencyOptions={agencyOptions}
                    setStepData={() => {}}
                    readOnly
                  />
                  <Button
                    kind="tertiary"
                    size="md"
                    className="btn-edit-step"
                    renderIcon={Edit}
                  >
                    Edit step
                  </Button>
                </div>
              </AccordionItem>
              <AccordionItem
                title={(
                  <TitleAccordion
                    title="Interim storage"
                    description="Review interim storage information"
                  />
                    )}
              >
                <div className="form-item">
                  <InterimStorage
                    state={allStepData.interimStep}
                    defaultAgency={defaultAgency}
                    defaultCode={defaultCode}
                    agencyOptions={agencyOptions}
                    setStepData={() => {}}
                    readOnly
                  />
                  <Button
                    kind="tertiary"
                    size="md"
                    className="btn-edit-step"
                    renderIcon={Edit}
                  >
                    Edit step
                  </Button>
                </div>
              </AccordionItem>
              <AccordionItem
                title={(
                  <TitleAccordion
                    title="Orchard"
                    description="Review orchard information"
                  />
                    )}
              >
                <div className="form-item">
                  <OrchardStep
                    state={allStepData.orchardStep}
                    setStepData={() => {}}
                    readOnly
                  />
                  <Button
                    kind="tertiary"
                    size="md"
                    className="btn-edit-step"
                    renderIcon={Edit}
                  >
                    Edit step
                  </Button>
                </div>
              </AccordionItem>
              <AccordionItem
                title={(
                  <TitleAccordion
                    title="Parent tree and SMP"
                    description="Review parent tree and SPM information"
                  />
                    )}
              />
              <AccordionItem
                title={(
                  <TitleAccordion
                    title="Extraction and storage"
                    description="Review extraction and storage information"
                  />
                    )}
              />
            </Accordion>
          )
          : (
            <div className="form-review-empty-section">
              <EmptySection pictogram="Magnify" title="You haven't completed the form yet!" description="The form data will appear here once you complete one step" />
            </div>
          )
      }
      </div>
    </div>
  );
};

export default FormReview;
