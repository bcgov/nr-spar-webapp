/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  Row,
  Column,
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
import SeedlotCollector from '../../types/SeedlotCollector';

const CollectionForm = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  // const getAxiosConfig = () => {
  //   const axiosConfig = {};
  //   if (token) {
  //     const headers = {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     };
  //     Object.assign(axiosConfig, headers);
  //   }
  //   return axiosConfig;
  // };

  const agencyItems: string[] = [
    'teste',
    'teste2'
  ];

  const seedlotCollectorData: SeedlotCollector = {
    seedlotNumber: 0,
    applicant: {
      name: '',
      number: '',
      email: ''
    },
    startDate: '',
    endDate: '',
    containerNumbers: 0,
    volumeContainer: 0,
    volumeCones: 0,
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
    <div className="collection-form">
      <form onSubmit={validateAndSubmit}>
        <Row className="collector-agency-title">
          <Column lg={8}>
            <h2>Collector agency</h2>
            <Subtitle text="Enter the collector agency information" />
          </Column>
        </Row>
        <Row className="collector-agency-checkbox">
          <Checkbox
            id="collection-form-applicant"
            name="applicant"
            labelText="Use applicant agency as collector agency"
            defaultChecked
            onChange={() => {}}
          />
        </Row>
        <Row>
          <Dropdown
            titleText="Cone collector agency"
            helperText="You can enter your agency number, name or acronym"
            items={agencyItems}
            size="md"
          />
          <NumberInput
            min={0}
            max={99}
            value={50}
            label="Cone collector location code"
            helperText="2-digit code that identifies the address of operated office or division"
            invalidText="Number is not valid"
            hideSteppers
          />
        </Row>
        <Row className="collector-information-title">
          <Column lg={8}>
            <h2>Collection information</h2>
            <Subtitle text="Enter the collection information about this seedlot" />
          </Column>
        </Row>
        <Row className="collector-information-dates">
          <DatePicker datePickerType="single">
            <DatePickerInput
              placeholder="yyyy/mm/dd"
              labelText="Collection start date"
              size="md"
              helperText="year/month/day"
            />
          </DatePicker>
          <DatePicker datePickerType="single">
            <DatePickerInput
              placeholder="yyyy/mm/dd"
              labelText="Collection end date"
              size="md"
              helperText="year/month/day"
            />
          </DatePicker>
        </Row>
        <Row>
          <NumberInput
            min={0}
            max={99}
            value={1}
            label="Number of containers "
            invalidText="Number is not valid"
            hideSteppers
          />
          <NumberInput
            min={0}
            max={99}
            value={1}
            label="Volume per container (HI)"
            invalidText="Number is not valid"
            hideSteppers
          />
        </Row>
        <Row>
          <NumberInput
            min={0}
            max={99}
            value={50}
            label="Cone collector location code"
            helperText='This value should be the "Volume per container" X "Number of containers".'
            invalidText="Number is not valid"
            hideSteppers
          />
        </Row>
        <Row className="collection-methods">
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
        </Row>
        <Row>
          <TextArea
            labelText="Comments (optional)"
            placeholder="Additional comments about the seedlot"
            rows={5}
            id="text-area-1"
            maxCount={400}
            enableCounter
          />
        </Row>
        <Row className="collection-form-buttons">
          <Button
            kind="secondary"
            onClick={() => { }}
            size="lg"
            className="btn-collection-form"
          >
            Cancel
          </Button>
          <Button
            kind="primary"
            onClick={() => { }}
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

export default CollectionForm;
