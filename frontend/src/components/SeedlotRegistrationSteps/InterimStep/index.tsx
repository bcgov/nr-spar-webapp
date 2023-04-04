import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import {
  Button,
  Checkbox,
  Column,
  ComboBox,
  DatePicker,
  DatePickerInput,
  RadioButton,
  RadioButtonGroup,
  Row,
  TextInput,
  FlexGrid
} from '@carbon/react';

import { ArrowRight } from '@carbon/icons-react';
import Subtitle from '../../Subtitle';
import InterimStorageRegistration from '../../../types/InterimStorageRegistration';
import { FilterObj, filterInput } from '../../../utils/filterUtils';
import InterimForm from './definitions';
import ApiAddresses from '../../../utils/ApiAddresses';
import getUrl from '../../../utils/ApiUtils';
import { useAuth } from '../../../contexts/AuthContext';
import './styles.scss';

const DATE_FORMAT = 'Y/m/d';
interface InterimStorageStepProps {
  state: InterimForm,
  setStep: Function,
  setStepData: Function,
  defaultAgency: string,
  defaultCode: string,
  agencyOptions: Array<string>
}

interface ComboBoxEvent {
  selectedItem: string;
}

const InterimStorage = (
  {
    state,
    setStep,
    setStepData,
    defaultAgency,
    defaultCode,
    agencyOptions
  }: InterimStorageStepProps
) => {
  const { token } = useAuth();
  const { seedlot } = useParams();

  type FormValidation = {
    isNameInvalid: boolean,
    isCodeInvalid: boolean,
    isStartDateInvalid: boolean,
    isEndDateInvalid: boolean,
    isStorageInvalid: boolean,
    isFacilityInvalid: boolean,
  }

  const initialValidationObj: FormValidation = {
    isNameInvalid: false,
    isCodeInvalid: false,
    isStartDateInvalid: false,
    isEndDateInvalid: false,
    isStorageInvalid: false,
    isFacilityInvalid: false
  };

  const [validationObj, setValidationObj] = useState<FormValidation>(initialValidationObj);

  const [otherRadioChecked, setOtherChecked] = useState(false);

  const interimStorageData: InterimStorageRegistration = {
    seedlotNumber: (seedlot ? +seedlot : 0),
    applicant: {
      name: state.agencyName,
      number: state.locationCode
    },
    storageInformation: {
      startDate: state.startDate,
      endDate: state.endDate,
      location: state.storageLocation
    },
    facilityType: state.facilityType
  };

  const validateInput = (name: string, value: string) => {
    const newValidObj = { ...validationObj };
    let isInvalid = false;
    if (name === 'locationCode') {
      if (value.length !== 2) {
        isInvalid = true;
      }
      newValidObj.isCodeInvalid = isInvalid;
    }
    if (name === 'startDate' || name === 'endDate') {
      // Have both start and end dates
      if (state.startDate !== '' && state.endDate !== '') {
        isInvalid = moment(state.endDate, 'YYYY/MM/DD')
          .isBefore(moment(state.startDate, 'YYYY/MM/DD'));
      }
      newValidObj.isStartDateInvalid = isInvalid;
      newValidObj.isEndDateInvalid = isInvalid;
    }
    if (name === 'storageLocation') {
      if (state.storageLocation.length >= 55) {
        isInvalid = true;
      }
      newValidObj.isStorageInvalid = isInvalid;
    }
    if (name === 'facilityType') {
      if (state.facilityType.length >= 50) {
        isInvalid = true;
      }
      newValidObj.isFacilityInvalid = isInvalid;
    }

    setValidationObj(newValidObj);
  };

  const getMinDate = () => {
    let minDate = '';
    if ((state.startDate !== '' && state.endDate === '')
      || (state.startDate !== '' && state.endDate !== '')) {
      minDate = state.startDate;
    } else if ((state.startDate === '' && state.endDate === '')
      || (state.startDate === '' && state.endDate !== '')) {
      return minDate;
    }
    return minDate;
  };

  const getTodayDate = () => moment().format('Y/M/D');

  const getMaxDate = () => {
    let maxDate = '';
    if ((state.startDate === '' && state.endDate === '')
      || (state.startDate !== '' && state.endDate === '')) {
      maxDate = getTodayDate();
    } else if ((state.startDate === '' && state.endDate !== '')
      || (state.startDate !== '' && state.endDate !== '')) {
      maxDate = state.endDate;
    }
    return maxDate;
  };

  const handleFormInput = (
    name: keyof InterimForm,
    value: string,
    optName?: keyof InterimForm,
    optValue?: string
  ) => {
    const newForm = { ...state };
    newForm[name] = value;
    if (optName && optValue && optName !== name) {
      newForm[optName] = optValue;
    }
    setStepData(newForm);
    validateInput(name, value);
    if (optName && optValue) {
      validateInput(optName, optValue);
    }
  };

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

  const nameInputRef = useRef<HTMLInputElement>(null);
  const numberInputRef = useRef<HTMLInputElement>(null);
  const storageLocationInputRef = useRef<HTMLInputElement>(null);
  const storageFacilityTypeInputRef = useRef<HTMLInputElement>(null);

  const [isChecked, setIsChecked] = useState<boolean>(true);

  const logForm = () => {
    setStep(1);
  };

  const goBack = () => {
    setStep(-1);
  };

  const validateAndSubmit = () => {
    let sendForm = true;

    if (validationObj.isNameInvalid) {
      nameInputRef.current?.focus();
      sendForm = false;
    } else if (validationObj.isCodeInvalid) {
      numberInputRef.current?.focus();
      sendForm = false;
    } else if (validationObj.isStartDateInvalid) {
      sendForm = false;
    } else if (validationObj.isEndDateInvalid) {
      sendForm = false;
    } else if (validationObj.isStorageInvalid) {
      storageLocationInputRef.current?.focus();
      sendForm = false;
    } else if (validationObj.isFacilityInvalid) {
      storageFacilityTypeInputRef.current?.focus();
      sendForm = false;
    }
    if (sendForm) {
      axios.post(getUrl(ApiAddresses.InterimStoragePost), interimStorageData, getAxiosConfig())
        .then(() => {
          logForm();
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(`Error: ${error}`);
        });
    }
  };

  const collectorAgencyisChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setIsChecked(checked);
    if (checked) {
      handleFormInput('agencyName', defaultAgency, 'locationCode', defaultCode);
    }
  };

  const inputChangeHandlerRadio = (selected: string) => {
    if (selected === 'OTH') {
      setOtherChecked(true);
      handleFormInput('facilityType', 'OTH');
    } else {
      setOtherChecked(false);
      handleFormInput('facilityType', selected);
    }
  };

  return (
    <div className="interim-agency-storage-form">
      <FlexGrid fullWidth>
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => collectorAgencyisChecked(e)}
            />
          </Column>
        </Row>
        <Row className="agency-information">
          <Column sm={4} md={2} lg={4}>
            <ComboBox
              id="agency-name-combobox"
              ref={nameInputRef}
              name="name"
              helperText="You can enter your agency number, name or acronym"
              onChange={(e: ComboBoxEvent) => { handleFormInput('agencyName', e.selectedItem); }}
              selectedItem={state.agencyName}
              shouldFilterItem={
                ({ item, inputValue }: FilterObj) => filterInput({ item, inputValue })
              }
              titleText="Interim agency name"
              placeholder="Select Interim agency name"
              readOnly={isChecked}
              items={agencyOptions}
              invalid={validationObj.isNameInvalid}
            />
          </Column>
          <Column sm={4} md={2} lg={4}>
            <TextInput
              id="agency-number-input"
              name="locationCode"
              ref={numberInputRef}
              value={state.locationCode}
              type="number"
              labelText="Interim agency location code"
              helperText="2-digit code that identifies the address of operated office or division"
              invalid={validationObj.isCodeInvalid}
              invalidText="Please enter a valid value"
              readOnly={isChecked}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleFormInput('locationCode', e.target.value);
              }}
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
              dateFormat={DATE_FORMAT}
              maxDate={getMaxDate()}
              minDate=""
              value={state.startDate}
              onChange={(_e: Array<Date>, selectedDate: string) => {
                handleFormInput('startDate', selectedDate);
              }}
            >
              <DatePickerInput
                id="start-date-input"
                labelText="Storage start date"
                helperText="year/month/day"
                placeholder="yyyy/mm/dd"
                invalid={validationObj.isStartDateInvalid}
                invalidText="Please, enter a valid date"
              />
            </DatePicker>
          </Column>
          <Column className="end-date-col" sm={4} md={2} lg={4}>
            <DatePicker
              datePickerType="single"
              name="endDate"
              dateFormat={DATE_FORMAT}
              maxDate={getTodayDate()}
              minDate={getMinDate()}
              value={state.endDate}
              onChange={(_e: Array<Date>, selectedDate: string) => {
                handleFormInput('endDate', selectedDate);
              }}
            >
              <DatePickerInput
                id="end-date-input"
                labelText="Storage end date"
                helperText="year/month/day"
                placeholder="yyyy/mm/dd"
                invalid={validationObj.isEndDateInvalid}
                invalidText="Please, enter a valid date"
              />
            </DatePicker>
          </Column>
        </Row>
        <Row className="storage-location-row">
          <Column sm={4} md={4} lg={8}>
            <TextInput
              id="storage-location-input"
              name="location"
              ref={storageLocationInputRef}
              type="text"
              value={state.storageLocation}
              labelText="Storage location"
              placeholder="Enter the location were the cones were stored"
              helperText="Enter a short name or description of the location where the cones are being temporarily stored"
              invalid={validationObj.isStorageInvalid}
              invalidText="Storage location lenght should be <= 55"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleFormInput('storageLocation', e.target.value);
              }}
            />
          </Column>
        </Row>
        <Row className="storage-type-radio">
          <Column sm={4} md={8} lg={16}>
            <RadioButtonGroup
              legendText="Storage facility type"
              name="storage-type-radiogroup"
              orientation="vertical"
              defaultSelected="OCV"
              onChange={(e: string) => inputChangeHandlerRadio(e)}
            >
              <RadioButton
                id="outside-radio"
                labelText="Outside covered - OCV"
                value="OCV"
              />
              <RadioButton
                id="ventilated-radio"
                labelText="Ventilated room - VRM"
                value="VRM"
              />
              <RadioButton
                id="reefer-radio"
                labelText="Reefer - RFR"
                value="RFR"
              />
              <RadioButton
                id="other-radio"
                labelText="Other - OTH"
                value="OTH"
              />
            </RadioButtonGroup>
          </Column>
        </Row>
        {
          otherRadioChecked && (
            <Row className="storage-facility-type">
              <Column sm={4} md={4} lg={8}>
                <TextInput
                  id="storage-facility-type-input"
                  name="storage-facility"
                  type="text"
                  ref={storageFacilityTypeInputRef}
                  labelText="Storage facility type"
                  placeholder="Enter the storage facility type"
                  helperText="Describe the new storage facility used"
                  invalid={validationObj.isFacilityInvalid}
                  invalidText="Storage facility type lenght should be <= 50"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormInput('facilityType', e.target.value)}
                />
              </Column>
            </Row>
          )
        }

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
            size="lg"
            className="btn-collection-form"
            renderIcon={ArrowRight}
            onClick={validateAndSubmit}
          >
            Next
          </Button>
        </Row>
      </FlexGrid>
    </div>
  );
};

export default InterimStorage;
