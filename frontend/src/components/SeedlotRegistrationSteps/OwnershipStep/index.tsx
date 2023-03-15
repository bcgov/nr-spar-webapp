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
  ComboBoxEvent,
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
    Default checkbox behavior
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
        methodOfPayment: '',
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

  const handleInputChange = (index: number, name: string, value: string) => {
    let updatedForm = [...ownershipArray];
    updatedForm[index] = {
      ...updatedForm[index],
      [name]: value
    };
    if (name === 'reservedPerc' || name === 'surplusPerc') {
      updatedForm = calcResvOrSurp(index, name, value, updatedForm);
    }
    setOwnershipArray(updatedForm);
  };

  const handleComboBoxChange = (event: ComboBoxEvent, index: number, field: string) => {
    const { selectedItem } = event;
    const updatedForm = [...ownershipArray];
    updatedForm[index] = {
      ...updatedForm[index],
      [field]: selectedItem
    };
    setOwnershipArray(updatedForm);
  };

  const addAnOwner = () => {
    const added = insertOwnerForm(ownershipArray);
    setOwnershipArray(added);
  };

  const deleteAnOwner = (id: number) => {
    const deleted = deleteOwnerForm(id, ownershipArray);
    setOwnershipArray(deleted);
  };

  const logForm = () => {
    // eslint-disable-next-line no-console
    console.log(ownershipArray);
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
                  handleInputChange={
                    (name: string, value: string) => {
                      handleInputChange(singleOwnerInfo.id, name, value);
                    }
                  }
                  handleComboBoxChange={
                    (e: ComboBoxEvent, field: string) => {
                      handleComboBoxChange(e, singleOwnerInfo.id, field);
                    }
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
