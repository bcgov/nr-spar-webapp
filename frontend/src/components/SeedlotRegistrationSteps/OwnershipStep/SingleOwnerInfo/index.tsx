/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef } from 'react';
import {
  TextInput,
  NumberInput,
  FlexGrid,
  Column,
  ComboBox,
  Row,
  Button,
  Checkbox
} from '@carbon/react';
import { Add, TrashCan } from '@carbon/icons-react';

import {
  SingleOwnerForm,
  ComboBoxEvent,
  CheckBoxValue,
  NumStepperVal
} from '../utils';
import { FilterObj, filterInput } from '../../../../utils/filterUtils';

import './styles.scss';

interface SingleOwnerInfoProps {
  ownerInfo: SingleOwnerForm,
  disableInputs: boolean,
  handleInputChange: Function,
  addAnOwner: Function,
  deleteAnOwner: Function,
  setDefaultAgencyNCode: Function,
  agencyOptions: Array<string>,
  fundingSources: Array<string>,
  methodsOfPayment: Array<string>
}

const SingleOwnerInfo = ({
  ownerInfo, agencyOptions, fundingSources, methodsOfPayment, disableInputs,
  handleInputChange, addAnOwner, deleteAnOwner, setDefaultAgencyNCode
}: SingleOwnerInfoProps) => {
  const reservedInputRef = useRef<HTMLInputElement>(null);
  const surplusInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="single-owner-info-container">
      <FlexGrid fullWidth>
        {
          ownerInfo.id === 0 && (
            <Row>
              <Column className="single-owner-info-col" xs={16} sm={16} md={16} lg={16}>
                <Checkbox
                  labelText="Use applicant agency as owner agency"
                  id="default-agency-code-checkbox"
                  defaultChecked
                  onChange={
                    (_event: React.ChangeEvent<HTMLInputElement>, { checked }: CheckBoxValue) => {
                      setDefaultAgencyNCode(checked);
                    }
                  }
                />
              </Column>
            </Row>
          )
        }
        <Row>
          <Column className="single-owner-info-col" xs={16} sm={16} md={16} lg={8}>
            <ComboBox
              className="single-owner-combobox"
              id={`owner-agency-${ownerInfo.id}`}
              disabled={ownerInfo.id === 0 ? disableInputs : false}
              name="ownerAgency"
              items={agencyOptions}
              selectedItem={ownerInfo.ownerAgency}
              shouldFilterItem={
                ({ item, inputValue }: FilterObj) => filterInput({ item, inputValue })
              }
              placeholder="Enter or choose your agency"
              titleText="Owner agency"
              helperText="You can enter the agency number, name or acronym"
              onChange={(e: ComboBoxEvent) => handleInputChange('ownerAgency', e.selectedItem)}
              invalid={ownerInfo.isAgencyInvalid}
            />
          </Column>
          <Column className="single-owner-info-col" xs={16} sm={16} md={16} lg={8}>
            <TextInput
              name="ownerCode"
              id={`single-owner-code-${ownerInfo.id}`}
              disabled={ownerInfo.id === 0 ? disableInputs : false}
              placeholder="Example: 00"
              maxCount={2}
              value={ownerInfo.ownerCode}
              labelText="Owner location code"
              helperText="2-digit code that identifies the address of operated office or division"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleInputChange(e.target.name, e.target.value);
              }}
              invalid={ownerInfo.isOwnerCodeInvalid}
            />
          </Column>
        </Row>
        <Row>
          <Column className="single-owner-info-col" xs={16} sm={16} md={16} lg={8}>
            <NumberInput
              id={`single-owner-portion-${ownerInfo.id}`}
              name="ownerPortion"
              label="Owner portion (%)"
              defaultValue={ownerInfo.ownerPortion}
              step={10}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleInputChange(e.target.name, e.target.value);
              }}
              invalid={ownerInfo.isPortionInvalid}
            />
          </Column>
          <Column className="single-owner-info-col" xs={16} sm={16} md={16} lg={8}>
            <div className="reserved-perc-container">
              <div className="reserved-surplus-input">
                <NumberInput
                  id={`single-owner-reserved-${ownerInfo.id}`}
                  ref={reservedInputRef}
                  name="reservedPerc"
                  label="Reserved (%)"
                  value={ownerInfo.reservedPerc}
                  step={10}
                  max={100}
                  min={0}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleInputChange(e.target.name, e.target.value);
                  }}
                  invalid={ownerInfo.isReservedInvalid}
                  onClick={
                    (
                      _e: React.MouseEvent<HTMLButtonElement>,
                      target: NumStepperVal | undefined
                    ) => {
                      // A guard is needed here because any click on the input will emit a
                      //   click event, not necessarily the + - buttons
                      if (target && target.value) {
                        handleInputChange('reservedPerc', String(target.value));
                      }
                    }
                  }
                />
              </div>
              <div className="reserved-surplus-input">
                <NumberInput
                  id={`single-owner-surplus-${ownerInfo.id}`}
                  ref={surplusInputRef}
                  name="surplusPerc"
                  label="Surplus (%)"
                  value={ownerInfo.surplusPerc}
                  step={10}
                  max={100}
                  min={0}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleInputChange(e.target.name, e.target.value);
                  }}
                  invalid={ownerInfo.isSurplusInvalid}
                  onClick={
                    (
                      _e: React.MouseEvent<HTMLButtonElement>,
                      target: NumStepperVal | undefined
                    ) => {
                      // A guard is needed here because any click on the input will emit a
                      //   click event, not necessarily the + - buttons
                      if (target && target.value) {
                        handleInputChange('surplusPerc', String(target.value));
                      }
                    }
                  }
                />
              </div>
            </div>
          </Column>
        </Row>
        <Row>
          <Column className="single-owner-info-col" xs={16} sm={16} md={16} lg={8}>
            <ComboBox
              className="single-owner-combobox"
              id={`owner-funding-source-${ownerInfo.id}`}
              name="fundingSource"
              items={fundingSources}
              shouldFilterItem={
                ({ item, inputValue }: FilterObj) => filterInput({ item, inputValue })
              }
              placeholder="Choose a funding source option"
              titleText="Funding source"
              direction="top"
              onChange={(e: ComboBoxEvent) => handleInputChange('fundingSource', e.selectedItem)}
              invalid={ownerInfo.isSourceInvalid}
            />
          </Column>
          <Column className="single-owner-info-col" xs={16} sm={16} md={16} lg={8}>
            <ComboBox
              className="single-owner-combobox"
              id={`owner-method-of-payment-${ownerInfo.id}`}
              name="methodOfPayment"
              items={methodsOfPayment}
              initialSelectedItem={methodsOfPayment[0]}
              shouldFilterItem={
                ({ item, inputValue }: FilterObj) => filterInput({ item, inputValue })
              }
              placeholder="Choose a method of payment"
              titleText="Method of payment"
              direction="top"
              onChange={(e: ComboBoxEvent) => handleInputChange('methodOfPayment', e.selectedItem)}
              invalid={ownerInfo.isPaymentInvalid}
            />
          </Column>
        </Row>
        <Row>
          {
            ownerInfo.id === 0
              ? (
                <Button
                  kind="tertiary"
                  size="md"
                  className="owner-mod-btn"
                  renderIcon={Add}
                  onClick={addAnOwner}
                >
                  Add owner
                </Button>
              )
              : (
                <Button
                  kind="danger--tertiary"
                  size="md"
                  className="owner-mod-btn"
                  renderIcon={TrashCan}
                  onClick={() => deleteAnOwner(ownerInfo.id)}
                >
                  Delete owner
                </Button>
              )
          }
        </Row>
      </FlexGrid>

    </div>
  );
};

export default SingleOwnerInfo;
