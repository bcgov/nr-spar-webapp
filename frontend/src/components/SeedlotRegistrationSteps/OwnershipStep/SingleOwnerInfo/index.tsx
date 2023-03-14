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
  handleComboBoxChange: Function,
  agencyOptions: Array<string>
}

const SingleOwnerInfo = ({
  ownerInfo, agencyOptions, handleChange, handleComboBoxChange
}: SingleOwnerInfoProps) => (
  <div className="single-owner-info-container">
    <FlexGrid fullWidth>
      <Row>
        <Column className="single-owner-info-col" sm={16} md={16} lg={8}>
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
            onChange={(e: ComboBoxEvent) => handleComboBoxChange(e, 'ownerAgency')}
          />
        </Column>
        <Column className="single-owner-info-col" sm={16} md={16} lg={8}>
          <NumberInput
            id={`single-owner-code-${ownerInfo.id}`}
            placeholder="Example: 00"
            name="ownerCode"
            defaultValue={ownerInfo.ownerCode}
            label="Owner location code"
            helperText="2-digit code that identifies the address of operated office or division"
            hideSteppers
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
          />
        </Column>
      </Row>
      <Row>
        <Column className="single-owner-info-col" sm={16} md={16} lg={8}>
          <NumberInput
            id={`single-owner-portion-${ownerInfo.id}`}
            name="ownerPortion"
            label="Owner portion (%)"
            defaultValue={ownerInfo.ownerPortion}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
          />
        </Column>
        <Column className="single-owner-info-col" sm={16} md={16} lg={8}>
          <div className="reserved-perc-container">
            <div className="reserved-surplus-input">
              <NumberInput
                id={`single-owner-reserved-${ownerInfo.id}`}
                name="reservedPerc"
                label="Reserved (%)"
                defaultValue={ownerInfo.reservedPerc}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
              />
            </div>
            <div className="reserved-surplus-input">
              <NumberInput
                id={`single-owner-surplus-${ownerInfo.id}`}
                name="surplusPerc"
                label="Surplus (%)"
                defaultValue={ownerInfo.surplusPerc}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
              />
            </div>
          </div>
        </Column>
      </Row>
    </FlexGrid>

  </div>
);

export default SingleOwnerInfo;
