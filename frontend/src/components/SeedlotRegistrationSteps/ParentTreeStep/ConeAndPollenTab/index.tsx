import React from 'react';
import {
  FlexGrid,
  Row,
  Column,
  InlineNotification,
  TextInput
} from '@carbon/react';

import Subtitle from '../../../Subtitle';

import { pageTexts } from '../constants';

import './styles.scss';

const ConeAndPollenTab = () => {
  console.log('test');
  return (
    <FlexGrid className="cone-pollen-tab">
      <Row className="cone-pollen-title-row">
        <Column sm={4} md={5} lg={9}>
          <h2>{pageTexts.tabTitles.coneTab}</h2>
          <Subtitle text={pageTexts.coneAndPollen.subtitle} />
        </Column>
      </Row>
      <Row className="cone-pollen-notification-row">
        <InlineNotification
          lowContrast
          kind="info"
          actionButtonLabel={pageTexts.coneAndPollen.notification.actionButtonLabel}
          aria-label={pageTexts.coneAndPollen.notification.actionButtonLabel}
          subtitle={pageTexts.coneAndPollen.notification.subtitle}
          title={pageTexts.coneAndPollen.notification.title}
        />
      </Row>
      <Row className="cone-pollen-title-row">
        <Column sm={4} md={5} lg={9}>
          <h2>{pageTexts.coneAndPollen.summary.title}</h2>
          <Subtitle text={pageTexts.coneAndPollen.summary.subtitle} />
        </Column>
      </Row>
      <Row className="cone-pollen-summary-row">
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="totalParentTrees"
            labelText={pageTexts.coneAndPollen.summary.fieldLabels.totalParentTrees}
            readOnly
          />
        </Column>
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="totalConeCount"
            labelText={pageTexts.coneAndPollen.summary.fieldLabels.totalConeCount}
            readOnly
          />
        </Column>
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="totalPollenCount"
            labelText={pageTexts.coneAndPollen.summary.fieldLabels.totalPollenCount}
            readOnly
          />
        </Column>
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="averageSMP"
            labelText={pageTexts.coneAndPollen.summary.fieldLabels.averageSMP}
            readOnly
          />
        </Column>
      </Row>
      <Row className="cone-pollen-title-row">
        <Column sm={4} md={5} lg={9}>
          <h2>{pageTexts.coneAndPollen.geneticWorth.title}</h2>
          <Subtitle text={pageTexts.coneAndPollen.geneticWorth.subtitle} />
        </Column>
      </Row>
      <Row className="cone-pollen-genetic-row">
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="populationSize"
            labelText={pageTexts.coneAndPollen.geneticWorth.fieldLabels.populationSize}
            readOnly
          />
        </Column>
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="testedParentTree"
            labelText={pageTexts.coneAndPollen.geneticWorth.fieldLabels.testedParentTree}
            readOnly
          />
        </Column>
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="coancestry"
            labelText={pageTexts.coneAndPollen.geneticWorth.fieldLabels.coancestry}
            readOnly
          />
        </Column>
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="smpParents"
            labelText={pageTexts.coneAndPollen.geneticWorth.fieldLabels.smpParents}
            readOnly
          />
        </Column>
      </Row>
      <Row className="cone-pollen-traits-row">
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="populationSize"
            labelText={pageTexts.coneAndPollen.geneticWorth.fieldLabels.populationSize}
            readOnly
          />
        </Column>
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="testedParentTree"
            labelText={pageTexts.coneAndPollen.geneticWorth.fieldLabels.testedParentTree}
            readOnly
          />
        </Column>
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="coancestry"
            labelText={pageTexts.coneAndPollen.geneticWorth.fieldLabels.coancestry}
            readOnly
          />
        </Column>
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="smpParents"
            labelText={pageTexts.coneAndPollen.geneticWorth.fieldLabels.smpParents}
            readOnly
          />
        </Column>
      </Row>

    </FlexGrid>
  );
};

export default ConeAndPollenTab;
