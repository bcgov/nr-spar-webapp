/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  Button
} from '@carbon/react';

import TitleAccordion from '../../TitleAccordion';
import SingleOwnerInfo from './SingleOwnerInfo';

import {
  insertOwnerForm,
  deleteOwnerForm,
  getAgencyName,
  StateReturnObj,
  formatPortionPerc,
  calcResvOrSurp
} from './utils';

import './styles.scss';

// Mock data
const mockDefaultCode = '16';
const mockAgencyOptions = [
  '0032 - Strong Seeds Orchard - SSO',
  '0035 - Weak Seeds Orchard - WSO',
  '0038 - Okay Seeds Orchard - OSO'
];
const mockDefaultAgency = mockAgencyOptions[0];
const mockFundingSources = [
  'BCT - BC Timber Sales',
  'FES - Forest Enhancement Society',
  'FIP - Forest Investment Program',
  'FRP - FRPA - Application For Relief - Ministry Administered',
  'FTL - Forests for Tomorrow - Licensee Administered',
  'FTM - Forests for Tomorrow - Ministry Administered',
  'GA - Other Agencies or Voluntary Work',
  'GFS - Forest Stand Management Fund',
  'LFP - Licensee Funded Program',
  'TSC - Tree Seed Centre'
];
const mockMethodsOfPayment = [
  // Index 0 should be the default method of payment
  'ITC - Invoice to client address',
  'NC - Non-chargeable',
  'JV - Journal voucher'
];
/*
  component
  TODO:
    Form validation
    Back & Next buttons
*/
const OwnershipStep = () => {
  const [ownershipArray, setOwnershipArray] = useState(
    [
      {
        id: 0,
        ownerAgency: mockDefaultAgency,
        ownerPortion: '100.00',
        ownerCode: mockDefaultCode,
        reservedPerc: '100.00',
        surplusPerc: '0.00',
        fundingSource: '',
        methodOfPayment: ''
      }
    ]
  );

  const [validationArray, setValidationArray] = useState(
    [
      {
        id: 0,
        isAgencyInvalid: false,
        isPortionInvalid: false,
        isOwnerCodeInvalid: false,
        isReservedInvalid: false,
        isSurplusInvalid: false,
        isSourceInvalid: false,
        isPaymentInvalid: false
      }
    ]
  );

  const [disableInputs, setDisableInputs] = useState(true);

  const setValidation = (index: number, name: string, isInvalid: boolean) => {
    const updatedArray = [...validationArray];
    updatedArray[index] = {
      ...updatedArray[index],
      [name]: isInvalid
    };
    setValidationArray(updatedArray);
  };

  const validateInput = (index: number, name: string, value: string) => {
    if (name === 'ownerCode') {
      const twoDigitRegex = /^[0-9]{2}$/;
      if (!twoDigitRegex.test(value)) {
        setValidation(index, 'isOwnerCodeInvalid', true);
      } else {
        setValidation(index, 'isOwnerCodeInvalid', false);
      }
    }
  };

  // Optional name and value can be passed in to set two values at once
  const handleInputChange = (
    index: number,
    name: string,
    value: string,
    optionalName?: string,
    optionalValue?: string
  ) => {
    let updatedArray = [...ownershipArray];

    if (name === 'ownerCode' && value.length > 2) return;

    if (optionalName) {
      updatedArray[index] = {
        ...updatedArray[index],
        [name]: value,
        [optionalName]: optionalValue
      };
    } else {
      updatedArray[index] = {
        ...updatedArray[index],
        [name]: value
      };
    }
    // Auto calc either reserved or surplus
    if (name === 'reservedPerc' || name === 'surplusPerc') {
      updatedArray = calcResvOrSurp(index, name, value, updatedArray);
    }
    setOwnershipArray(updatedArray);

    // Validate inputs that need to be validated right away
    if (name === 'ownerCode') {
      validateInput(index, name, value);
    }
  };

  const addAnOwner = () => {
    // Maximum of 10 ownership can be set
    if (ownershipArray.length > 10) {
      return;
    }
    const {
      newOwnerArr,
      newValidArr
    }: StateReturnObj = insertOwnerForm(ownershipArray, validationArray);
    setOwnershipArray(newOwnerArr);
    setValidationArray(newValidArr);
  };

  const deleteAnOwner = (id: number) => {
    const {
      newOwnerArr,
      newValidArr
    }: StateReturnObj = deleteOwnerForm(id, ownershipArray, validationArray);
    setOwnershipArray(newOwnerArr);
    setValidationArray(newValidArr);
  };

  const setDefaultAgencyNCode = (checked: boolean) => {
    if (checked) {
      handleInputChange(0, 'ownerCode', mockDefaultCode, 'ownerAgency', mockDefaultAgency);
      setDisableInputs(true);
    } else {
      handleInputChange(0, 'ownerCode', '', 'ownerAgency', '');
      setDisableInputs(false);
    }
  };

  const logForm = () => {
    // eslint-disable-next-line no-console
    console.log(ownershipArray, validationArray);
  };

  return (
    <div>
      <div className="ownership-header">
        <div className="ownership-step-title-box">
          <h3>
            Ownership
          </h3>
          <p>
            Enter the seedlot&apos;s ownership information, the agencies listed as
            owners are the ones who are charged for cone and seed processing fees
          </p>
        </div>
      </div>

      <div className="ownership-form-container">
        <Accordion className="steps-accordion">
          {
            ownershipArray.map((singleOwnerInfo) => (
              <AccordionItem
                className="single-accordion-item"
                key={`${singleOwnerInfo.id}`}
                open
                title={(
                  <TitleAccordion
                    title={singleOwnerInfo.ownerAgency === ''
                      ? 'Owner agency name'
                      : getAgencyName(singleOwnerInfo.ownerAgency)}
                    description={`${formatPortionPerc(singleOwnerInfo.ownerPortion)}% owner portion`}
                  />
                )}
              >
                <SingleOwnerInfo
                  ownerInfo={singleOwnerInfo}
                  agencyOptions={mockAgencyOptions}
                  fundingSources={mockFundingSources}
                  methodsOfPayment={mockMethodsOfPayment}
                  disableInputs={disableInputs}
                  validationProp={validationArray[singleOwnerInfo.id]}
                  handleInputChange={
                    (name: string, value: string) => {
                      handleInputChange(singleOwnerInfo.id, name, value);
                    }
                  }
                  setDefaultAgencyNCode={
                    (checked: boolean) => setDefaultAgencyNCode(checked)
                  }
                  addAnOwner={addAnOwner}
                  deleteAnOwner={(id: number) => deleteAnOwner(id)}
                />
              </AccordionItem>
            ))
          }
        </Accordion>
      </div>

      <Button
        kind="primary"
        size="md"
        className="btn-test"
        onClick={logForm}
      >
        Test
      </Button>
    </div>
  );
};

export default OwnershipStep;
