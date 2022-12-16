import React from 'react';

import './styles.css';

import { Tile, OverflowMenu, OverflowMenuItem } from '@carbon/react';
import * as Icons from '@carbon/icons-react';

interface CardProps {
  icon: string;
  header: string;
  description: string;
  highlighted: boolean;
  highlightFunction?: any;
}

const Card = ({
  icon, header, description, highlighted, highlightFunction
}: CardProps) => {
  const Icon = Icons[icon];
  return (
    <Tile className={highlighted ? 'card-main-highlighted' : 'card-main'}>
      <span className="card-header">
        <Icon className="card-icon" />
        <OverflowMenu className="card-overflow" ariaLabel="overflow-menu">
          {highlighted ? (<OverflowMenuItem itemText="Unhighlight item" />) : <OverflowMenuItem itemText="Highlight item" onClick={highlightFunction} />}
          <OverflowMenuItem itemText="Item 2" />
          <OverflowMenuItem itemText="Item 3" />
        </OverflowMenu>
      </span>
      <div className="card-content">
        <h5>{header}</h5>
        <p>{description}</p>
      </div>
    </Tile>
  );
};

export default Card;
