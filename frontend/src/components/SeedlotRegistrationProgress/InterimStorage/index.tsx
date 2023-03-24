import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
import Subtitle from '../../Subtitle';
import InterimStorageRegistration from '../../../types/InterimStorageRegistration';
import ApplicantInfo from '../../../types/ApplicantInfo';
import { FilterObj, filterInput } from '../../../utils/filterUtils';
import ApiAddresses from '../../../utils/ApiAddresses';
import getUrl from '../../../utils/ApiUtils';
import { useAuth } from '../../../contexts/AuthContext';
import './styles.scss';

interface InterimStorageStepProps {
  setStep: Function
}

const InterimStorage = ({ setStep }: InterimStorageStepProps) => {
  const { token } = useAuth();
  const { seedlot } = useParams();

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

  const nameInputRef = useRef<HTMLInputElement>(null);
  const numberInputRef = useRef<HTMLInputElement>(null);
  const storageLocationInputRef = useRef<HTMLInputElement>(null);

  const [facilityTypeValue, setFacilityTypeValue] = useState('');
  const [otherRadioChecked, setOtherRadioChecked] = useState<boolean>(false);
  const [invalidNumber, setInvalidNumber] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [agencyInfo, setAgencyInfo] = useState<ApplicantInfo>();
  const [storageLocationEmpty, setStorageLocationEmpty] = useState<boolean>(false);

  const getSeedlotData = () => {
    if (seedlot) {
      axios.get(getUrl(ApiAddresses.SeedlotRetrieveOne).replace(':seedlotnumber', seedlot), getAxiosConfig())
        .then((response) => {
          if (response.data.seedlotApplicantInfo.applicant) {
            setAgencyInfo(response.data.seedlotApplicantInfo.applicant);
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(`Error: ${error}`);
        });
    }
  };

  const interimStorageData: InterimStorageRegistration = {
    seedlotNumber: (seedlot ? +seedlot : 0),
    applicant: {
      name: (agencyInfo ? agencyInfo.name : mockAgencyOptions[0]),
      number: (agencyInfo ? agencyInfo.number : '0')
    },
    storageInformation: {
      startDate: '',
      endDate: '',
      location: ''
    },
    facilityType: 'outside',
    facilityTypeDescription: ''
  };

  const [responseBody, setResponseBody] = useState<InterimStorageRegistration>(interimStorageData);

  useEffect(() => {
    getSeedlotData();
  });

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
    const { name, value } = event.target;
    setResponseBody({
      ...responseBody,
      storageInformation: {
        ...responseBody.storageInformation,
        [name]: value
      }
    });
  };

  const inputChangeHandlerDate = (event: string[], dateType: string) => {
    const value = event[0];
    setResponseBody({
      ...responseBody,
      storageInformation: {
        ...responseBody.storageInformation,
        [dateType]: value
      }
    });
  };

  const inputChangeHandlerRadio = (event: string) => {
    const value = event;
    setResponseBody({
      ...responseBody,
      facilityType: value
    });
    if (value === 'other') {
      setOtherRadioChecked(true);
    } else {
      setFacilityTypeValue('');
      setResponseBody({
        ...responseBody,
        facilityTypeDescription: ''
      });
      setOtherRadioChecked(false);
    }
  };

  const inputChangeHandlerFacilityType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFacilityTypeValue(event.target.value);
    setResponseBody({
      ...responseBody,
      facilityTypeDescription: event.target.value
    });
  };

  const validateStorageLocation = () => {
    const storageLocationInfo = responseBody.storageInformation.location;
    if (storageLocationInfo.trim().length === 0) {
      setStorageLocationEmpty(true);
    } else {
      setStorageLocationEmpty(false);
    }
  };

  const validateInterimAgencyLocationNumber = () => {
    const intNumber = +responseBody.applicant.number;
    if (intNumber <= 0 || intNumber >= 99) {
      setInvalidNumber(true);
    } else {
      setInvalidNumber(false);
    }
  };

  const logForm = () => {
    setStep(1);
  };

  const goBack = () => {
    setStep(-1);
  };

  const getData = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    const stringDate = `${mm}/${dd}/${yyyy}`;
    return stringDate;
  };

  const validateAndSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (invalidNumber) {
      numberInputRef.current?.focus();
    } else if (storageLocationEmpty) {
      storageLocationInputRef.current?.focus();
    } else {
      axios.post(getUrl(ApiAddresses.InterimStoragePost), responseBody, getAxiosConfig())
        .then(() => {
          logForm();
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(`Error: ${error}`);
        });
    }
  };

  const useCollectorAgencyisChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setIsChecked(checked);
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => useCollectorAgencyisChecked(e)}
            />
          </Column>
        </Row>
        <Row className="agency-information">
          <Column sm={4} md={2} lg={4}>
            <ComboBox
              id="agency-name-combobox"
              ref={nameInputRef}
              name="name"
              onChange={() => {}}
              selectedItem={mockAgencyOptions.find((x) => x === agencyInfo?.name)}
              shouldFilterItem={
                ({ item, inputValue }: FilterObj) => filterInput({ item, inputValue })
              }
              titleText="Interim agency name"
              placeholder="Select Interim agency name"
              readOnly={isChecked}
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
              value={agencyInfo?.number}
              disableWheel
              hideSteppers
              type="text"
              label="Interim agency location code"
              helperText="2-digit code that identifies the address of operated office or division"
              invalid={invalidNumber}
              invalidText="Please enter a valid value"
              readOnly={isChecked}
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
              maxDate={getData()}
              minDate=""
              onChange={(e: any) => inputChangeHandlerDate(e, 'startDate')}
            >
              <DatePickerInput
                id="start-date-input"
                labelText="Collection start date"
                helperText="year/month/day"
                placeholder="yyyy/mm/dd"
                required
              />
            </DatePicker>
          </Column>
          <Column className="end-date-col" sm={4} md={2} lg={4}>
            <DatePicker
              datePickerType="single"
              name="endDate"
              maxDate={getData()}
              minDate=""
              onChange={(e: any) => inputChangeHandlerDate(e, 'endDate')}
            >
              <DatePickerInput
                id="end-date-input"
                labelText="Collection end date"
                helperText="year/month/day"
                placeholder="yyyy/mm/dd"
                required
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
              labelText="Storage location"
              placeholder="Enter the location were the cones were stored"
              helperText="Enter a short name or description of the location where the cones are being temporarily stored"
              invalid={storageLocationEmpty}
              invalidText="Please enter a valid value"
              required
              onBlur={() => validateStorageLocation()}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputChangeHandlerLocation(e)}
            />
          </Column>
        </Row>
        <Row className="storage-type-radio">
          <Column sm={4} md={8} lg={16}>
            <RadioButtonGroup
              legendText="Storage facility type"
              name="storage-type-radiogroup"
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
        <Row className={otherRadioChecked ? 'storage-facility-type' : 'hidden'}>
          <Column sm={4} md={4} lg={8}>
            <TextInput
              id="storage-facility-type-input"
              name="storage-facility"
              type="text"
              labelText="Storage facility type"
              placeholder="Enter the storage facility type"
              helperText="Describe the new storage facility used"
              invalidText="Please enter a valid value"
              required={otherRadioChecked}
              value={facilityTypeValue}
              // eslint-disable-next-line max-len
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputChangeHandlerFacilityType(e)}
            />
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
