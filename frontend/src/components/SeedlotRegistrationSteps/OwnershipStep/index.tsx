import React, { useState, useRef } from 'react';
import {
  Accordion,
  AccordionItem,
  Button,
  FlexGrid,
  Column,
  Row
} from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';

import TitleAccordion from '../../TitleAccordion';
import SingleOwnerInfo from './SingleOwnerInfo';

import {
  insertOwnerForm,
  deleteOwnerForm,
  getAgencyName,
  StateReturnObj,
  formatPortionPerc,
  calcResvOrSurp,
  skipForInvalidLength,
  getValidKey,
  isInputInvalid,
  ValidationProp,
  arePortionsValid,
  getInvalidIdAndKey
} from './utils';
import {
  DEFAULT_INDEX,
  DEFAULT_PAYMENT_INDEX,
  MAX_OWNERS,
  inputText,
  ownerTemplate,
  validTemplate
} from './config';

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
// Index 0 should be the default method of payment
const mockMethodsOfPayment = [
  'ITC - Invoice to client address',
  'NC - Non-chargeable',
  'JV - Journal voucher'
];

interface OwnershipStepProps {
  setStep: Function
}

/*
  Component
*/
const OwnershipStep = ({ setStep }: OwnershipStepProps) => {
  // Set initial owner state
  const initialOwnerState = { ...ownerTemplate };
  initialOwnerState.id = DEFAULT_INDEX;
  initialOwnerState.ownerAgency = mockDefaultAgency;
  initialOwnerState.ownerCode = mockDefaultCode;
  initialOwnerState.ownerPortion = '100';
  initialOwnerState.methodOfPayment = mockMethodsOfPayment[DEFAULT_PAYMENT_INDEX];
  const [ownershipArray, setOwnershipArray] = useState([initialOwnerState]);
  // Set initial validation state
  const initialValidState = { ...validTemplate };
  initialValidState.id = DEFAULT_INDEX;
  const [validationArray, setValidationArray] = useState([initialValidState]);

  const [disableInputs, setDisableInputs] = useState(true);

  const refControl = useRef<any>({});

  const setPortionsValid = (isInvalid: boolean) => {
    const updatedArray = [...validationArray];
    const len = updatedArray.length;
    for (let i = 0; i < len; i += 1) {
      updatedArray[i].portion = {
        isInvalid,
        invalidText: inputText.portion.invalidText
      };
    }
    setValidationArray(updatedArray);
  };

  const setValidation = (
    index: number,
    name: string | keyof ValidationProp,
    isInvalid: boolean,
    invalidText: string,
    optName?: string | keyof ValidationProp,
    optIsInvalid?: boolean,
    optInvalidText?: string
  ) => {
    const updatedArray = [...validationArray];
    if (optName) {
      updatedArray[index] = {
        ...updatedArray[index],
        [name]: {
          isInvalid,
          invalidText
        },
        [optName]: {
          isInvalid: optIsInvalid,
          invalidText: optInvalidText
        }
      };
    } else {
      updatedArray[index] = {
        ...updatedArray[index],
        [name]: {
          isInvalid,
          invalidText
        }
      };
    }
    setValidationArray(updatedArray);
  };

  const validateInput = (
    index: number,
    name: string,
    value: string,
    optName?: string,
    optIsInvalid?: boolean,
    optInvalidText?: string
  ) => {
    const { isInvalid, invalidText } = isInputInvalid(name, value);
    const validKey = getValidKey(name);
    if (optName) {
      setValidation(index, validKey, isInvalid, invalidText, optName, optIsInvalid, optInvalidText);
    } else {
      setValidation(index, validKey, isInvalid, invalidText);
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
    const updatedArray = [...ownershipArray];
    /*
      If the input is invalid, don't update state values (no more typing)
          e.g. if a user types 133 in owner code we should only display 13 instead
               of showing the input is invalid
       Currently this does not work for decimal enforcement, the state can be forced
       to have 2 decimal places but the carbon input will still show user's input
          e.g. input: 0.1222 state: 0.12, on_screen:  0.1222
       Not sure why this is happening since the input value is linked to state
     */
    if (skipForInvalidLength(name, value)) return;
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
    // Auto calc either reserved or surplus and validate the other one
    if (name === 'reservedPerc' || name === 'surplusPerc') {
      const {
        newArr,
        isInvalid,
        invalidText,
        validKey
      } = calcResvOrSurp(index, name, value, updatedArray);
      setOwnershipArray(newArr);
      validateInput(index, name, value, validKey, isInvalid, invalidText);
    } else if (name === 'ownerCode' && optionalName === 'ownerAgency') {
      // This if block is needed due to the checkbox, if unchecked, set both input to invalid
      setOwnershipArray(updatedArray);
      const agencyKey = getValidKey(optionalName);
      const isInvalid = optionalValue === '';
      const { invalidText } = inputText.owner;
      validateInput(index, name, value, agencyKey, isInvalid, invalidText);
    } else if (name === 'ownerPortion') {
      setOwnershipArray(updatedArray);
      // Prioritize single input validation
      const { isInvalid, invalidText } = isInputInvalid(name, value);
      if (isInvalid) {
        const validKey = getValidKey(name);
        setValidation(index, validKey, isInvalid, invalidText);
      } else {
        // If the single number is ok then we check the sum
        const portionsInvalid = !arePortionsValid(updatedArray);
        setPortionsValid(portionsInvalid);
      }
    } else {
      setOwnershipArray(updatedArray);
      validateInput(index, name, value);
    }
  };

  const addAnOwner = () => {
    // Maximum # of ownership can be set
    if (ownershipArray.length >= MAX_OWNERS) {
      return;
    }
    const defaultPayment = mockMethodsOfPayment[DEFAULT_PAYMENT_INDEX];
    const {
      newValidArr,
      newOwnerArr
    }: StateReturnObj = insertOwnerForm(ownershipArray, validationArray, defaultPayment);
    setOwnershipArray(newOwnerArr);
    setValidationArray(newValidArr);
  };

  const deleteAnOwner = (id: number) => {
    const {
      newOwnerArr,
      newValidArr
    }: StateReturnObj = deleteOwnerForm(id, ownershipArray, validationArray);
    delete refControl.current[id];
    setOwnershipArray(newOwnerArr);
    setValidationArray(newValidArr);
  };

  const setDefaultAgencyNCode = (checked: boolean) => {
    if (checked) {
      handleInputChange(DEFAULT_INDEX, 'ownerCode', mockDefaultCode, 'ownerAgency', mockDefaultAgency);
      setDisableInputs(true);
    } else {
      handleInputChange(DEFAULT_INDEX, 'ownerCode', '', 'ownerAgency', '');
      setDisableInputs(false);
    }
  };

  const addRefs = (element: HTMLInputElement, id: number, name: string) => {
    if (element !== null) {
      refControl.current[id] = {
        ...refControl.current[id],
        [name]: element
      };
    }
  };

  const areAllInputsValid = (): boolean => {
    const {
      allValid,
      invalidId,
      invalidField,
      invalidValue,
      ownerOk
    } = getInvalidIdAndKey(ownershipArray, validationArray);
    if (!allValid) {
      if (!ownerOk) {
        validateInput(invalidId, invalidField, invalidValue);
      }
      refControl.current[invalidId][invalidField].focus();
      return false;
    }
    return true;
  };

  const logForm = () => {
    if (areAllInputsValid()) {
      // eslint-disable-next-line no-console
      console.log(ownershipArray);
      setStep(1);
    }
  };

  const goBack = () => {
    setStep(-1);
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
                  addRefs={(element: HTMLInputElement, name: string) => {
                    addRefs(element, singleOwnerInfo.id, name);
                  }}
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
      <div className="btns-container">
        <FlexGrid fullWidth>
          <Row>
            <Column xs={16} sm={8} md={3} lg={2} xl={2}>
              <Button
                kind="secondary"
                size="lg"
                className="back-next-btn"
                onClick={goBack}
              >
                Back
              </Button>
            </Column>
            <Column xs={16} sm={8} md={3} lg={2} xl={2}>
              <Button
                kind="primary"
                size="lg"
                className="back-next-btn"
                onClick={logForm}
                renderIcon={ArrowRight}
              >
                Next
              </Button>
            </Column>
          </Row>
        </FlexGrid>
      </div>
    </div>
  );
};

export default OwnershipStep;
