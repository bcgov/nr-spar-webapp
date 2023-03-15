import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  ProgressIndicator,
  ProgressStep
} from '@carbon/react';
import { DocumentBlank } from '@carbon/icons-react';

import Subtitle from '../Subtitle';

import './styles.scss';

interface FormProgressProps {
  seedlotNumber: number;
}

const FormProgress = ({ seedlotNumber }: FormProgressProps) => {
  const navigate = useNavigate();
  return (
    <div className="form-progress">
      <div className="form-progress-title-section">
        <p className="form-progress-title">
          Form progress
        </p>
        <Subtitle text="Where you are in the registration process" />
      </div>
      <div className="steps-box">
        <ProgressIndicator
          currentIndex={5}
          spaceEquall
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
      </div>
      <div>
        <Button
          kind="tertiary"
          size="md"
          className="btn-fp"
          renderIcon={DocumentBlank}
          onClick={() => navigate(`/seedlot/registration/${seedlotNumber}`)}
        >
          Complete registration
        </Button>
      </div>
    </div>
  );
};

export default FormProgress;
