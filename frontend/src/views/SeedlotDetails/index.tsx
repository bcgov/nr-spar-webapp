import React from 'react';
import {
  FlexGrid,
  Row,
  Column,
  Stack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel
} from '@carbon/react';

import PageTitle from '../../components/PageTitle';

import './styles.scss';

const SeedlotDetails = () => (
  <FlexGrid className="seedlot-details-page">
    <Stack gap={7}>
      <Row>
        <PageTitle
          title="Seedlot 636465"
          subtitle="Check and manage this seedlot"
          favourite
        />
      </Row>
      <section title="Seedlot Summary">
        <Row className="seedlot-summary-content">
          <Column sm={4}>
            <span>
              Seedlot Summary Placeholder
            </span>
          </Column>
        </Row>
      </section>
      <section title="Seedlot Details">
        <Row className="seedlot-details-content">
          <Column sm={4}>
            <Tabs>
              <TabList aria-label="List of tabs">
                <Tab>Seedlot Details</Tab>
                <Tab>Activity history</Tab>
              </TabList>
              <TabPanels>
                <TabPanel fullHeight>Seedlot details' Tab Content Placeholder</TabPanel>
                <TabPanel>Activity history's Tab Content Placebolder</TabPanel>
              </TabPanels>
            </Tabs>
          </Column>
        </Row>
      </section>
    </Stack>
  </FlexGrid>
);

export default SeedlotDetails;