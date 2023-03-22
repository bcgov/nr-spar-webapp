import React, { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  Button,
  Checkbox,
  Column,
  ComboBox,
  DatePicker,
  DatePickerInput,
  NumberInput,
  RadioButton,
  RadioButtonGroup,
  Row,
  TextInput
} from '@carbon/react';

import { ArrowRight } from '@carbon/icons-react';
import { FilterObj, filterInput } from '../../../utils/filterUtils';
import Subtitle from '../../Subtitle';
import InterimStorageRegistration from '../../../types/InterimStorageRegistration';
import getUrl from '../../../utils/ApiUtils';
import ApiAddresses from '../../../utils/ApiAddresses';
import { useAuth } from '../../../contexts/AuthContext';
import './styles.scss';

interface InterimStorageStepProps {
  setStep: Function
}

const InterimStorage = ({ setStep }: InterimStorageStepProps) => {
  const { token } = useAuth();
  // const navigate = useNavigate();

  const mockAgencyOptions: Array<string> = [
    '0032 - Strong Seeds Orchard - SSO',
    '0035 - Weak Seeds Orchard - WSO',
    '0038 - Okay Seeds Orchard - OSO'
  ];

  const getAxiosConfig = () => {
    const axiosConfig = {};
    if (token) {
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      Object.assign(axiosConfig, headers);
    }
    return axiosConfig;
  };

  const interimStorageData: InterimStorageRegistration = {
    seedlotNumber: 0,
    applicant: {
      name: mockAgencyOptions[0],
      number: '0'
    },
    storageInformation: {
      startDate: '',
      endDate: '',
      location: ''
    },
    facilityType: 'outside'
  };

  const nameInputRef = useRef<HTMLInputElement>(null);
  const numberInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const [responseBody, setResponseBody] = useState<InterimStorageRegistration>(interimStorageData);
  const [invalidName] = useState<boolean>(false);
  const [invalidNumber, setInvalidNumber] = useState<boolean>(false);

  const inputChangeHandlerCheckboxes = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setResponseBody({
      ...responseBody,
      [name]: checked
    });
  };

  const inputChangeHandlerStorage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setResponseBody({
      ...responseBody,
      applicant: {
        ...responseBody.applicant,
        [name]: value
      }
    });
  };

  const inputChangeHandlerLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line no-debugger
    debugger;
    const { name, value } = event.target;
    setResponseBody({
      ...responseBody,
      storageInformation: {
        ...responseBody.storageInformation,
        [name]: value
      }
    });
  };

  const inputChangeHandlerRadio = (event: string) => {
    const value = event;
    setResponseBody({
      ...responseBody,
      facilityType: value
    });
  };

  const validateInterimAgencyLocationNumber = () => {
    const intNumber = +responseBody.applicant.number;
    if (intNumber <= 0 || intNumber >= 99) {
      setInvalidNumber(true);
    } else {
      setInvalidNumber(false);
    }
  };

  const validateAndSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (invalidName) {
      nameInputRef.current?.focus();
    } else if (invalidNumber) {
      numberInputRef.current?.focus();
    } else {
      axios.post(getUrl(ApiAddresses.InterimStoragePost), responseBody, getAxiosConfig())
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(`Error: ${error}`);
        });
    }
  };

  const logForm = () => {
    setStep(1);
  };

  const goBack = () => {
    setStep(-1);
  };

  return (
    <div className="interim-agency-storage-form">
      <form onSubmit={validateAndSubmit}>
        <Row className="interim-agency-title">
          <Column lg={8}>
            <h2>Interim agency</h2>
            <Subtitle text="Enter the interim agency information" />
          </Column>
        </Row>
        <Row className="collector-agency-checkbox-row">
          <Column sm={4} md={8} lg={16}>
            <Checkbox
              id="collector-agency-checkbox"
              name="collector-agency"
              labelText="Use applicant agency as collector agency"
              defaultChecked
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputChangeHandlerCheckboxes(e)}
            />
          </Column>
        </Row>
        <Row className="agency-information">
          <Column sm={4} md={2} lg={4}>
            <ComboBox
              id="agency-name-combobox"
              ref={nameInputRef}
              name="name"
              initialSelectedItem={mockAgencyOptions[0]}
              shouldFilterItem={
                ({ item, inputValue }: FilterObj) => filterInput({ item, inputValue })
              }
              titleText="Interim agency name"
              placeholder="Select Interim agency name"
              selectedId="1"
              disabled={0}
              // eslint-disable-next-line quotes
              items={mockAgencyOptions}
            />
          </Column>
          <Column sm={4} md={2} lg={4}>
            <NumberInput
              id="agency-number-input"
              name="number"
              ref={numberInputRef}
              min={0}
              max={99}
              disableWheel
              hideSteppers
              type="text"
              label="Interim agency location code"
              helperText="2-digit code that identifies the address of operated office or division"
              invalid={invalidNumber}
              invalidText="Please enter a valid value"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputChangeHandlerStorage(e)}
              onBlur={() => validateInterimAgencyLocationNumber()}
            />
          </Column>
        </Row>
        <Row className="storage-information-title">
          <Column lg={8}>
            <h2>Storage information</h2>
            <Subtitle text="Enter the interim storage information for this lot" />
          </Column>
        </Row>
        <Row className="storage-date-row">
          <Column className="start-date-col" sm={4} md={2} lg={4}>
            <DatePicker
              datePickerType="single"
              name="startDate"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputChangeHandlerLocation(e)}
            >
              <DatePickerInput
                labelText="Collection start date"
                helperText="year/month/day"
                placeholder="yyyy/mm/dd"
              />
            </DatePicker>
          </Column>
          <Column className="end-date-col" sm={4} md={2} lg={4}>
            <DatePicker
              datePickerType="single"
              name="endDate"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputChangeHandlerLocation(e)}
            >
              <DatePickerInput
                labelText="Collection end date"
                helperText="year/month/day"
                placeholder="yyyy/mm/dd"
              />
            </DatePicker>
          </Column>
        </Row>
        <Row className="storage-location-row">
          <Column sm={4} md={4} lg={8}>
            <TextInput
              id="appliccant-email-input"
              name="location"
              ref={emailInputRef}
              type="text"
              labelText="Storage location"
              placeholder="Enter the location were the cones were stored"
              helperText="Enter a short name or description of the location where the cones are being temporarily stored"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputChangeHandlerLocation(e)}
            />
          </Column>
        </Row>
        <Row className="class-source-radio">
          <Column sm={4} md={8} lg={16}>
            <RadioButtonGroup
              legendText="Storage facility type"
              name="class-source-radiogroup"
              orientation="vertical"
              defaultSelected="outside"
              onChange={(e: string) => inputChangeHandlerRadio(e)}
            >
              <RadioButton
                id="outside-radio"
                labelText="Outside covered - OCV"
                value="outside"
              />
              <RadioButton
                id="ventilated-radio"
                labelText="Ventilated room - VRM"
                value="ventilated"
              />
              <RadioButton
                id="reefer-radio"
                labelText="Reefer - RFR"
                value="reefer"
              />
              <RadioButton
                id="other-radio"
                labelText="Other - OTH"
                value="other"
              />
            </RadioButtonGroup>
          </Column>
        </Row>
        <Row className="collection-form-buttons">
          <Button
            kind="secondary"
            onClick={goBack}
            size="lg"
            className="btn-collection-form"
          >
            Back
          </Button>
          <Button
            type="submit"
            kind="primary"
            onClick={logForm}
            size="lg"
            className="btn-collection-form"
            renderIcon={ArrowRight}
          >
            Next
          </Button>
        </Row>
      </form>
    </div>
  );
};

export default InterimStorage;
