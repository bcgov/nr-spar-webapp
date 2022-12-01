import React from 'react';

import { Tooltip, Row, Column } from '@carbon/react';
import { Information } from '@carbon/icons-react';
import Card from '../Card';

const FavoriteActivities = () => (
  <React.Fragment>

    <Row>
      <Column lg={4}>
        <h3>My favorite activities</h3>
        <p>Quick access to your favorite activities.
  
        <Tooltip label="Close">
         <Information />

        </Tooltip></p>
      </Column>
      <Column lg={12}>
        <Card icon={''} header={"Test 1"} description={"This is a test 1"} />
        <Card icon={''} header={"Test 2"} description={"This is a test 2"} />
        <Card icon={''} header={"Test 3"} description={"This is a test 3"} />
      </Column>
    </Row>
  </React.Fragment>
);

export default FavoriteActivities;
