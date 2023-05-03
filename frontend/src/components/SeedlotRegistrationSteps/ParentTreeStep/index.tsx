import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel
} from '@carbon/react';

import ConeAndPollenTab from './Tabs/ConeAndPollenTab';
import SMPSuccessTab from './Tabs/SMPSuccessTab';

import ApiConfig from '../../../api-service/ApiConfig';
import api from '../../../api-service/api';

import { pageTexts, getTestParentTrees } from './constants';

import './styles.scss';
import CalculationSMPTab from './Tabs/CalculationSMPTab';

interface ParentTreeStepProps {
  orchardID: string[];
}

const ParentTreeStep = ({ orchardID }: ParentTreeStepProps) => {
  const { seedlot } = useParams();
  const [seedlotSpecie, setSeedlotSpecie] = useState<string>('');

  const testParentTrees = getTestParentTrees(orchardID);

  const getSeedlotData = () => {
    if (seedlot) {
      const url = `${ApiConfig.seedlot}/${seedlot}`;
      api.get(url)
        .then((response) => {
          if (response.data.seedlotApplicantInfo) {
            setSeedlotSpecie(response.data.seedlotApplicantInfo.species.code);
          }
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(`Error: ${error}`);
        });
    }
  };

  useEffect(() => {
    getSeedlotData();
  }, []);

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
            <ConeAndPollenTab
              parentTrees={testParentTrees}
              species={seedlotSpecie}
              orchards={orchardID}
            />
          </TabPanel>
          <TabPanel>
            <SMPSuccessTab
              parentTrees={testParentTrees}
              species={seedlotSpecie}
              orchards={orchardID}
            />
          </TabPanel>
          <TabPanel>
            <CalculationSMPTab species={seedlotSpecie} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default ParentTreeStep;