import React from 'react';

import { Tooltip, Row, Column } from '@carbon/react';
import { Information } from '@carbon/icons-react';
import Card from '../Card';

import './styles.css';

import FavoriteActivitiesCardItems from '../../mock-data/FavoriteActivitiesCardItems';

const cards = FavoriteActivitiesCardItems;

const FavoriteActivities = () => (
  <React.Fragment>
    <Row className="main-content">
      <Column lg={4}>
        <h3>My favorite activities</h3>
        <h4>
          Quick access to your favorite activities.
          <Tooltip label="Info">
            <Information />
          </Tooltip>
        </h4>
      </Column>
      <Column lg={12}>
        <Row>
          {cards.map((card) => (
            <Card
              icon={card.icon}
              header={card.header}
              description={card.description}
            />
          ))}
        </Row>
      </Column>
    </Row>
  </React.Fragment>
);

export default FavoriteActivities;
