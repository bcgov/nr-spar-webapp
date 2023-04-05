/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  Row,
  Column,
  FlexGrid,
  TextInput,
  NumberInput,
  Dropdown,
  Checkbox,
  Button,
  DatePickerInput,
  DatePicker,
  TextArea
} from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';

import Subtitle from '../Subtitle';

import getUrl from '../../utils/ApiUtils';
import ApiAddresses from '../../utils/ApiAddresses';
import { useAuth } from '../../contexts/AuthContext';

import './styles.scss';
import CollectionInformation from '../../types/CollectionInformation';

import fieldsConfig from './constants';

interface CollectionFormProps {
  setStep: Function
}

const CollectionForm = ({ setStep }: CollectionFormProps) => {
  const { token } = useAuth();
  const navigate = useNavigate();

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

  const agencyItems: string[] = [
    'teste',
    'teste2'
  ];

  const seedlotCollectorData: CollectionInformation = {
    seedlotNumber: 0,
    applicant: {
      name: '',
      locationCode: ''
    },
    startDate: '',
    endDate: '',
    numberOfContainers: 0,
    volumePerContainer: 0,
    volumeOfCones: 0,
    collectionMethods: {
      aerialRaking: false,
      aerialClippingTopping: false,
      felledTrees: false,
      climbing: false,
      squirrelCache: false,
      ground: false,
      squirrelHarvesting: false,
      other: false
    },
    comments: ''
  };

  const agencyNameInputRef = useRef<HTMLInputElement>(null);
  const agencyNumberInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const validateAndSubmit = (event: React.FormEvent<HTMLFormElement>) => {

  };

  return (
    <div className="seedlot-collection-form">
      <FlexGrid fullWidth>
        <form onSubmit={validateAndSubmit}>
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
                onChange={() => {}}
              />
            </Column>
          </Row>
          <Row>
            <Column sm={12} md={4} lg={6}>
              <Dropdown
                name={fieldsConfig.collector.name}
                placeholder={fieldsConfig.collector.placeholder}
                titleText={fieldsConfig.collector.titleText}
                helperText={fieldsConfig.collector.helperText}
                invalidText={fieldsConfig.collector.invalidText}
                items={agencyItems}
                size="md"
              />
            </Column>
            <Column sm={12} md={4} lg={6}>
              <NumberInput
                name={fieldsConfig.code.name}
                placeholder={fieldsConfig.code.placeholder}
                label={fieldsConfig.code.label}
                helperText={fieldsConfig.code.helperText}
                invalidText={fieldsConfig.code.invalidText}
                min={0}
                max={99}
                value={50}
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
              <DatePicker datePickerType="single">
                <DatePickerInput
                  name={fieldsConfig.startDate.name}
                  placeholder={fieldsConfig.startDate.placeholder}
                  labelText={fieldsConfig.startDate.labelText}
                  helperText={fieldsConfig.startDate.helperText}
                  size="md"
                />
              </DatePicker>
            </Column>
            <Column sm={12} md={4} lg={6}>
              <DatePicker datePickerType="single">
                <DatePickerInput
                  name={fieldsConfig.endDate.name}
                  placeholder={fieldsConfig.endDate.placeholder}
                  labelText={fieldsConfig.endDate.labelText}
                  helperText={fieldsConfig.endDate.helperText}
                  size="md"
                />
              </DatePicker>
            </Column>
          </Row>
          <Row>
            <Column sm={12} md={4} lg={6}>
              <NumberInput
                name={fieldsConfig.numberContainers.name}
                label={fieldsConfig.numberContainers.labelText}
                invalidText={fieldsConfig.numberContainers.invalidText}
                min={0}
                max={99}
                value={1}
                hideSteppers
                disableWheel
              />
            </Column>
            <Column sm={12} md={4} lg={6}>
              <NumberInput
                name={fieldsConfig.volumeContainers.name}
                label={fieldsConfig.volumeContainers.labelText}
                invalidText={fieldsConfig.volumeContainers.invalidText}
                min={0}
                max={99}
                value={1}
                hideSteppers
                disableWheel
              />
            </Column>
          </Row>
          <Row>
            <Column sm={12} md={12} lg={12}>
              <NumberInput
                name={fieldsConfig.volumeCones.name}
                label={fieldsConfig.volumeCones.labelText}
                invalidText={fieldsConfig.volumeCones.invalidText}
                helperText={fieldsConfig.volumeCones.helperText}
                min={0}
                max={99}
                value={50}
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
                labelText={fieldsConfig.comments.labelText}
                placeholder={fieldsConfig.comments.placeholder}
                rows={5}
                maxCount={400}
                enableCounter
              />
            </Column>
          </Row>
          <Row className="collection-form-buttons">
            <Column sm={12} md={12} lg={12}>
              <Button
                kind="secondary"
                onClick={() => { }}
                size="lg"
              >
                Cancel
              </Button>
              <Button
                kind="primary"
                onClick={() => { }}
                size="lg"
                renderIcon={ArrowRight}
              >
                Next
              </Button>
            </Column>
          </Row>
        </form>
      </FlexGrid>
    </div>
  );
};

export default CollectionForm;
