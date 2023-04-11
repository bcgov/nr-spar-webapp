/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment';

import {
  Row,
  Column,
  FlexGrid,
  NumberInput,
  Dropdown,
  Checkbox,
  DatePickerInput,
  DatePicker,
  TextArea
} from '@carbon/react';

import Subtitle from '../../Subtitle';

import { DATE_FORMAT, fieldsConfig } from './constants';
import { filterInput, FilterObj } from '../../../utils/filterUtils';
import {
  CollectionStepProps,
  CollectionForm,
  FormValidation,
  ComboBoxEvent
} from './utils';

import './styles.scss';

const CollectionStep = (
  {
    state,
    setStepData,
    defaultAgency,
    defaultCode,
    agencyOptions
  }: CollectionStepProps
) => {
  const initialValidationObj: FormValidation = {
    isNameInvalid: false,
    isLocationCodeInvalid: false,
    isStartDateInvalid: false,
    isEndDateInvalid: false,
    isNumberOfContainersInvalid: false,
    isVolumePerContainersInvalid: false,
    isVolumeOfConesInvalid: false,
    isCollectionMethodsInvalid: false
  };

  const [validationObj, setValidationObj] = useState<FormValidation>(initialValidationObj);

  const validateInput = (name: string, value: string) => {
    const newValidObj = { ...validationObj };
    let isInvalid = false;
    if (name === fieldsConfig.code.name) {
      if (value.length !== 2) {
        isInvalid = true;
      }
      newValidObj.isLocationCodeInvalid = isInvalid;
    }
    if (name === fieldsConfig.startDate.name || name === fieldsConfig.endDate.name) {
      // Have both start and end dates
      if (state.startDate !== '' && state.endDate !== '') {
        isInvalid = moment(state.endDate, 'YYYY/MM/DD')
          .isBefore(moment(state.startDate, 'YYYY/MM/DD'));
      }
      newValidObj.isStartDateInvalid = isInvalid;
      newValidObj.isEndDateInvalid = isInvalid;
    }
    if (name === fieldsConfig.numberOfContainers.name) {
      if (+state.numberOfContainers < 0) {
        isInvalid = true;
      }
      newValidObj.isNumberOfContainersInvalid = isInvalid;
    }
    if (name === fieldsConfig.volumePerContainers.name) {
      if (+state.volumePerContainers < 0) {
        isInvalid = true;
      }
      newValidObj.isVolumePerContainersInvalid = isInvalid;
    }
    if (name === fieldsConfig.volumeOfCones.name) {
      if (+state.volumeOfCones < 0) {
        isInvalid = true;
      }
      newValidObj.isVolumeOfConesInvalid = isInvalid;
    }

    setValidationObj(newValidObj);
  };

  const handleFormInput = (
    name: keyof CollectionForm,
    value: string,
    optName?: keyof CollectionForm,
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

  const collectorNameInputRef = useRef<HTMLInputElement>(null);
  const locationCodeInputRef = useRef<HTMLInputElement>(null);
  const numberOfContainersInputRef = useRef<HTMLInputElement>(null);
  const volumePerContainersInputRef = useRef<HTMLInputElement>(null);
  const volumeOfConesInputRef = useRef<HTMLInputElement>(null);
  const commentsInputRef = useRef<HTMLInputElement>(null);

  const [isChecked, setIsChecked] = useState<boolean>(true);

  const collectorAgencyisChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setIsChecked(checked);
    if (checked) {
      handleFormInput('collectorAgency', defaultAgency, 'locationCode', defaultCode);
    }
  };

  return (
    <div className="seedlot-collection-form">
      <FlexGrid fullWidth>
        <Row className="collector-agency-title">
          <Column lg={12}>
            <h2>Collector agency</h2>
            <Subtitle text="Enter the collector agency information" />
          </Column>
        </Row>
        <Row className="collector-agency-checkbox">
          <Column lg={12}>
            <Checkbox
              id="collection-form-applicant"
              name={fieldsConfig.checkbox.name}
              labelText={fieldsConfig.checkbox.labelText}
              defaultChecked
              onChange={
                (event: React.ChangeEvent<HTMLInputElement>) => collectorAgencyisChecked(event)
              }
            />
          </Column>
        </Row>
        <Row>
          <Column sm={12} md={4} lg={6}>
            <Dropdown
              name={fieldsConfig.collector.name}
              ref={collectorNameInputRef}
              placeholder={fieldsConfig.collector.placeholder}
              titleText={fieldsConfig.collector.titleText}
              helperText={fieldsConfig.collector.helperText}
              invalidText={fieldsConfig.collector.invalidText}
              readOnly={isChecked}
              items={agencyOptions}
              selectedItem={state.collectorAgency}
              onChange={(e: ComboBoxEvent) => { handleFormInput('collectorAgency', e.selectedItem); }}
              invalid={validationObj.isNameInvalid}
              shouldFilterItem={
                ({ item, inputValue }: FilterObj) => filterInput({ item, inputValue })
              }
              size="md"
            />
          </Column>
          <Column sm={12} md={4} lg={6}>
            <NumberInput
              name={fieldsConfig.code.name}
              ref={locationCodeInputRef}
              value={state.locationCode}
              placeholder={fieldsConfig.code.placeholder}
              label={fieldsConfig.code.label}
              helperText={fieldsConfig.code.helperText}
              invalidText={fieldsConfig.code.invalidText}
              readOnly={isChecked}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleFormInput('locationCode', e.target.value);
              }}
              hideSteppers
              disableWheel
            />
          </Column>
        </Row>
        <Row className="collector-information-title">
          <Column lg={12}>
            <h2>Collection information</h2>
            <Subtitle text="Enter the collection information about this seedlot" />
          </Column>
        </Row>
        <Row className="collector-information-dates">
          <Column sm={12} md={4} lg={6}>
            <DatePicker
              datePickerType="single"
              dateFormat={DATE_FORMAT}
              value={state.startDate}
              onChange={(_e: Array<Date>, selectedDate: string) => {
                handleFormInput('startDate', selectedDate);
              }}
            >
              <DatePickerInput
                name={fieldsConfig.startDate.name}
                placeholder={fieldsConfig.startDate.placeholder}
                labelText={fieldsConfig.startDate.labelText}
                helperText={fieldsConfig.startDate.helperText}
                invalid={validationObj.isStartDateInvalid}
                invalidText={fieldsConfig.startDate.invalidText}
                size="md"
              />
            </DatePicker>
          </Column>
          <Column sm={12} md={4} lg={6}>
            <DatePicker
              datePickerType="single"
              dateFormat={DATE_FORMAT}
              minDate={state.startDate}
              value={state.endDate}
              onChange={(_e: Array<Date>, selectedDate: string) => {
                handleFormInput('endDate', selectedDate);
              }}
            >
              <DatePickerInput
                name={fieldsConfig.endDate.name}
                placeholder={fieldsConfig.endDate.placeholder}
                labelText={fieldsConfig.endDate.labelText}
                helperText={fieldsConfig.endDate.helperText}
                invalid={validationObj.isEndDateInvalid}
                invalidText={fieldsConfig.endDate.invalidText}
                size="md"
              />
            </DatePicker>
          </Column>
        </Row>
        <Row>
          <Column sm={12} md={4} lg={6}>
            <NumberInput
              name={fieldsConfig.numberOfContainers.name}
              ref={numberOfContainersInputRef}
              value={state.numberOfContainers}
              label={fieldsConfig.numberOfContainers.labelText}
              invalidText={fieldsConfig.numberOfContainers.invalidText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleFormInput('numberOfContainers', e.target.value);
              }}
              hideSteppers
              disableWheel
            />
          </Column>
          <Column sm={12} md={4} lg={6}>
            <NumberInput
              name={fieldsConfig.volumePerContainers.name}
              ref={volumePerContainersInputRef}
              value={state.volumePerContainers}
              label={fieldsConfig.volumePerContainers.labelText}
              invalidText={fieldsConfig.volumePerContainers.invalidText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleFormInput('volumePerContainers', e.target.value);
              }}
              hideSteppers
              disableWheel
            />
          </Column>
        </Row>
        <Row>
          <Column sm={12} md={12} lg={12}>
            <NumberInput
              name={fieldsConfig.volumeOfCones.name}
              ref={volumeOfConesInputRef}
              value={state.volumeOfCones}
              label={fieldsConfig.volumeOfCones.labelText}
              invalidText={fieldsConfig.volumeOfCones.invalidText}
              helperText={fieldsConfig.volumeOfCones.helperText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleFormInput('volumeOfCones', e.target.value);
              }}
              hideSteppers
              disableWheel
            />
          </Column>
        </Row>
        <Row className="collection-methods">
          <Column sm={12} md={12} lg={12}>
            <fieldset>
              <Subtitle text="Collection methods (Select at least one method used to collect the cones)" />
              <Checkbox labelText="Aerial raking" />
              <Checkbox labelText="Aerial clipping or topping" />
              <Checkbox labelText="Felled trees" />
              <Checkbox labelText="Climbing" />
              <Checkbox labelText="Squirrel cache" />
              <Checkbox labelText="Ground, Ladder and or Hydraulic lift" />
              <Checkbox labelText="Squirrel harvesting or dropping" />
              <Checkbox labelText="Other" />
            </fieldset>
          </Column>
        </Row>
        <Row>
          <Column sm={12} md={12} lg={12}>
            <TextArea
              name={fieldsConfig.comments.name}
              ref={commentsInputRef}
              value={state.comments}
              labelText={fieldsConfig.comments.labelText}
              placeholder={fieldsConfig.comments.placeholder}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleFormInput('comments', e.target.value);
              }}
              rows={5}
              maxCount={400}
              enableCounter
            />
          </Column>
        </Row>
      </FlexGrid>
    </div>
  );
};

export default CollectionStep;
