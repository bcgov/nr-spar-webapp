/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  Button
} from '@carbon/react';
import { Add } from '@carbon/icons-react';

import TitleAccordion from '../../TitleAccordion';
import SingleOwnerInfo from './SingleOwnerInfo';

import { insertOwnerForm, getAgencyName, ComboBoxEvent } from './utils';

import './styles.scss';

interface OwnershipStepProps {
  defaultAgency: string,
  defaultCode: string,
  agencyOptions: Array<string>
}
/*
  component
*/
const OwnershipStep = ({ defaultAgency, defaultCode, agencyOptions }: OwnershipStepProps) => {
  const [ownershipArray, setOwnershipArray] = useState(
    [
      {
        id: 0,
        ownerAgency: defaultAgency,
        ownerPortion: 100,
        ownerCode: defaultCode,
        reservedPerc: 100,
        surplusPerc: 0,
        fundingSource: '',
        methodOfPayment: ''
      }
    ]
  );

  const updateForm = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const updatedForm = [...ownershipArray];
    updatedForm[index] = {
      ...updatedForm[index],
      [name]: value
    };
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

        <Button
          kind="tertiary"
          size="md"
          className="btn-add-owner"
          renderIcon={Add}
          onClick={addAnOwner}
        >
          Add owner
        </Button>
      </div>

      <div className="ownership-form-container">
        <Accordion className="steps-accordion">
          {
            ownershipArray.map((singleOwnerInfo) => (
              <AccordionItem
                key={`${singleOwnerInfo.id}`}
                title={(
                  <TitleAccordion
                    title={getAgencyName(singleOwnerInfo.ownerAgency)}
                    description={`${singleOwnerInfo.ownerPortion}% owner portion`}
                  />
                )}
              >
                <SingleOwnerInfo
                  ownerInfo={singleOwnerInfo}
                  handleChange={
                    (e: React.ChangeEvent<HTMLInputElement>) => updateForm(e, singleOwnerInfo.id)
                  }
                  handleComboBoxChange={
                    (e: ComboBoxEvent, field: string) => {
                      handleComboBoxChange(e, singleOwnerInfo.id, field);
                    }
                  }
                  agencyOptions={agencyOptions}
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
