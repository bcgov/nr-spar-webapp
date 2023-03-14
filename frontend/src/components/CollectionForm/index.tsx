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
  Button
} from '@carbon/react';

import Subtitle from '../Subtitle';

import getUrl from '../../utils/ApiUtils';
import ApiAddresses from '../../utils/ApiAddresses';
import { useAuth } from '../../contexts/AuthContext';

import './styles.scss';
import SeedlotCollector from '../../types/SeedlotCollector';

const CollectionForm = () => {
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
        <Row className="collector-agency-information">
          <Column sm={4} md={2} lg={5}>
            <Dropdown
              id="collector-agency-name-input"
              ref={agencyNameInputRef}
              name="name"
            />
          </Column>
          <Column sm={4} md={2} lg={5}>
            <Dropdown
              id="collector-agency-number-input"
            />
          </Column>
        </Row>
      </form>
    </div>
  );
};

export default CollectionForm;
