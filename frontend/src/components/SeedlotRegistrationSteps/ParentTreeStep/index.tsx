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
import { ParentTreesIdType } from './definitions';

import './styles.scss';

interface ParentTreeStepProps {
  orchardID: number;
}

const ParentTreeStep = ({ orchardID }: ParentTreeStepProps) => {
  // Use orchard id to get parent trees ids
  console.log(orchardID);
  // This needs to be an array of object to work properly on react table
  const testParentTrees:Array<ParentTreesIdType> = [
    {
      id: '1'
    },
    {
      id: '2'
    },
    {
      id: '3'
    },
    {
      id: '4'
    },
    {
      id: '5'
    },
    {
      id: '6'
    },
    {
      id: '7'
    },
    {
      id: '8'
    },
    {
      id: '9'
    },
    {
      id: '10'
    },
    {
      id: '11'
    }
  ];

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
            <ConeAndPollenTab parentTrees={testParentTrees} />
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
