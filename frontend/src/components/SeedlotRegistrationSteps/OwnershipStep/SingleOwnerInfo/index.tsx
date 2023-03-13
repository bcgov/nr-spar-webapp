/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import {
  TextInput,
  NumberInput,
  FlexGrid,
  Column,
  ComboBox,
  Row
} from '@carbon/react';

import { SingleOwnerForm, ComboBoxEvent } from '../utils';
import { FilterObj, filterInput } from '../../../../utils/filterUtils';

import './styles.scss';

interface SingleOwnerInfoProps {
  ownerInfo: SingleOwnerForm,
  handleChange: Function,
  handleAgencyChange: Function,
  agencyOptions: Array<string>
}

const SingleOwnerInfo = ({
  ownerInfo, agencyOptions, handleChange, handleAgencyChange
}: SingleOwnerInfoProps) => (
  <div className="single-owner-info-container">
    <FlexGrid fullWidth>
      <Row>
        <Column sm={16} md={16} lg={8}>
          <ComboBox
            className="single-owner-combobox"
            id={`owner-agency-${ownerInfo.id}`}
            name="ownerAgency"
            items={agencyOptions}
            initialSelectedItem={agencyOptions[0]}
            shouldFilterItem={
              ({ item, inputValue }: FilterObj) => filterInput({ item, inputValue })
            }
            placeholder="Enter or choose your agency"
            titleText="Owner agency"
            helperText="You can enter the agency number, name or acronym"
            onChange={(e: ComboBoxEvent) => handleAgencyChange(e)}
          />
        </Column>
        <Column sm={16} md={16} lg={8}>
          <NumberInput
            id={`single-owner-code-${ownerInfo.id}`}
            placeholder="Example: 00"
            name="ownerCode"
            label="Owner location code"
            helperText="2-digit code that identifies the address of operated office or division"
            value="number"
            hideSteppers
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
          />
        </Column>
      </Row>
    </FlexGrid>

  </div>
);

export default SingleOwnerInfo;
