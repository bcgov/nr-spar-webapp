/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import {
  TextInput
} from '@carbon/react';

import { SingleOwnerForm } from '../utils';

import './styles.scss';

interface SingleOwnerInfoProps {
  ownerInfo: SingleOwnerForm,
  handleChange: Function,
  agencyOptions: Array<string>
}

const SingleOwnerInfo = ({ ownerInfo, handleChange, agencyOptions }: SingleOwnerInfoProps) => (
  <div className="single-owner-info-container">
    <p>
      {
        ownerInfo.ownerAgency
      }
    </p>
    <TextInput
      id="agency-name-input"
      name="ownerAgency"
      type="text"
      labelText="Applicant agency name"
      enableCounter
      maxCount={8}
      invalidText="Please enter a valid name"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
    />
  </div>
);

export default SingleOwnerInfo;
