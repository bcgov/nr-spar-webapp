import React from 'react';
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel
} from '@carbon/react';

import ConeAndPollenTab from './Tabs/ConeAndPollenTab';
import SMPSuccessTab from './Tabs/SMPSuccessTab';

import { pageTexts } from './constants';

import './styles.scss';

const ParentTreeStep = () => {
  console.log('test');
  return (
    <div className="seedlot-parent-tree-step">
      <Tabs>
        <TabList aria-label="List of tabs">
          <Tab>{pageTexts.tabTitles.coneTab}</Tab>
          <Tab>{pageTexts.tabTitles.smpTab}</Tab>
          <Tab>{pageTexts.tabTitles.mixTab}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ConeAndPollenTab />
          </TabPanel>
          <TabPanel>
            <SMPSuccessTab />
          </TabPanel>
          <TabPanel>Tab 3</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default ParentTreeStep;
