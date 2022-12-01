import React from 'react';

import './styles.css';

import { Tile, Link, Column } from '@carbon/react';
import * as Icons from '@carbon/icons-react';

interface CardProps {
  icon: string,
  header: string,
  description: string
}

const Card = ({icon, header, description}: CardProps) => (
  <Tile className="card-main" id="tile-1">
    {/* {Icons['TrafficFlow']} */}
    {header}
    {description}
  </Tile>
);

export default Card;
